import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NOT_SURE_TITLE, services } from "@/data/services";
import { selectService } from "@/lib/select-service";
import { InquiryForm } from "./InquiryForm";

// The network is the boundary: stub fetch, and make the "time on form" check pass.
const fetchMock = vi.fn();
let now = 0;

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/full name/i), "Test Client");
  await user.type(screen.getByLabelText(/instagram username/i), "@test.client");
  await user.type(screen.getByLabelText(/email address/i), "test@example.com");
  await user.click(screen.getByRole("radio", { name: services[2].title }));
  await user.type(screen.getByLabelText(/project details/i), "A new brand");
}

describe("InquiryForm", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    now = 0;
    vi.spyOn(performance, "now").mockImplementation(() => now);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("labels every field and offers every configured service as a choice", () => {
    render(<InquiryForm />);

    expect(screen.getByLabelText(/full name/i)).toHaveAttribute("aria-required", "true");
    expect(screen.getByLabelText(/instagram username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute("type", "email");
    expect(screen.getByLabelText(/project details/i)).toBeInTheDocument();
    expect(screen.getByRole("group", { name: /service interested in/i })).toBeInTheDocument();
    const choices = screen.getAllByRole("radio").map((r) => r.closest("label")?.textContent?.trim());
    expect(choices).toEqual([...services.map((s) => s.title), NOT_SURE_TITLE]);
  });

  it("shows an error for every missing required field and focuses the first one", async () => {
    const user = userEvent.setup();
    render(<InquiryForm />);

    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(screen.getByText("Please enter your full name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your Instagram username.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email address.")).toBeInTheDocument();
    expect(screen.getByText("Please choose a service.")).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveFocus();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("links each error message to its field for screen readers", async () => {
    const user = userEvent.setup();
    render(<InquiryForm />);

    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    const name = screen.getByLabelText(/full name/i);
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription("Please enter your full name.");
  });

  it("flags an invalid email when the user leaves the field", async () => {
    const user = userEvent.setup();
    render(<InquiryForm />);

    await user.type(screen.getByLabelText(/email address/i), "not-an-email");
    await user.tab();

    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
  });

  it("submits the inquiry, shows the success message and clears the form", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue(jsonResponse({ ok: true }));
    render(<InquiryForm />);
    await fillValidForm(user);
    now = 9000;

    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(await screen.findByRole("heading", { name: /your inquiry is on its way/i })).toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/inquiry");
    expect(JSON.parse(init.body)).toMatchObject({
      fullName: "Test Client",
      instagram: "test.client",
      email: "test@example.com",
      service: services[2].id,
      message: "A new brand",
      fillMs: 9000,
    });

    await user.click(screen.getByRole("button", { name: /send another inquiry/i }));
    expect(screen.getByLabelText(/full name/i)).toHaveValue("");
  });

  it("shows a loading state and sends only once when clicked repeatedly", async () => {
    const user = userEvent.setup();
    let resolve!: (r: Response) => void;
    fetchMock.mockReturnValue(new Promise<Response>((r) => (resolve = r)));
    render(<InquiryForm />);
    await fillValidForm(user);

    const button = screen.getByRole("button", { name: /send inquiry/i });
    await user.click(button);
    await user.click(button);

    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await act(async () => resolve(jsonResponse({ ok: true })));
    expect(await screen.findByRole("heading", { name: /your inquiry is on its way/i })).toBeInTheDocument();
  });

  it("shows the server's error message and keeps what the user typed", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue(
      jsonResponse({ ok: false, error: "Email service is not configured yet. Please reach out on Instagram." }, 500),
    );
    render(<InquiryForm />);
    await fillValidForm(user);

    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/email service is not configured yet/i);
    expect(screen.getByLabelText(/full name/i)).toHaveValue("Test Client");
    expect(screen.queryByRole("heading", { name: /on its way/i })).not.toBeInTheDocument();
  });

  it("shows field errors returned by the server", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue(
      jsonResponse(
        { ok: false, error: "Please check the highlighted fields.", fieldErrors: { email: "That email bounced." } },
        400,
      ),
    );
    render(<InquiryForm />);
    await fillValidForm(user);

    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(await screen.findByText("That email bounced.")).toBeInTheDocument();
  });

  it("shows a connection error when the request fails", async () => {
    const user = userEvent.setup();
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    render(<InquiryForm />);
    await fillValidForm(user);

    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn.t reach the server/i);
    expect(screen.getByRole("button", { name: /send inquiry/i })).toBeEnabled();
  });

  it("shows a generic error when the server returns something that isn't JSON", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue(new Response("<html>Bad gateway</html>", { status: 502 }));
    render(<InquiryForm />);
    await fillValidForm(user);

    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/something went wrong while sending/i);
  });

  it("preselects a service when an Inquire button elsewhere on the page is used", async () => {
    render(<InquiryForm />);

    act(() => selectService(services[3].id));

    await waitFor(() => expect(screen.getByRole("radio", { name: services[3].title })).toBeChecked());
  });

  it("ignores an Inquire event for a service that doesn't exist", () => {
    render(<InquiryForm />);

    act(() => selectService("not-a-service"));

    for (const radio of screen.getAllByRole("radio")) expect(radio).not.toBeChecked();
  });
});
