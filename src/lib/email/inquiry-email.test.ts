import { describe, expect, it } from "vitest";
import { buildInquiryEmail } from "./inquiry-email";

const inquiry = {
  fullName: "Test Client",
  instagram: "test.client",
  email: "test@example.com",
  service: "branding-packaging" as const,
  message: "Hello\nsecond line",
};
const submittedAt = new Date("2026-11-04T12:30:00Z");

describe("buildInquiryEmail", () => {
  it("includes every required field in the plain text version", () => {
    const { text } = buildInquiryEmail(inquiry, submittedAt);

    expect(text).toContain("Full name: Test Client");
    expect(text).toContain("Instagram: @test.client");
    expect(text).toContain("Email: test@example.com");
    expect(text).toContain("Service: Branding & Packaging Design");
    expect(text).toContain("Hello\nsecond line");
  });

  it("shows the submission time in Cairo time and in UTC", () => {
    const { text } = buildInquiryEmail(inquiry, submittedAt);

    expect(text).toContain("14:30 (Cairo)");
    expect(text).toContain("2026-11-04T12:30:00.000Z UTC");
  });

  it("links the Instagram handle and the email address in the HTML version", () => {
    const { html } = buildInquiryEmail(inquiry, submittedAt);

    expect(html).toMatch(/href="https:\/\/(www\.)?instagram\.com\/test\.client"/);
    expect(html).toContain('href="mailto:test@example.com"');
  });

  it("escapes HTML in every user supplied value", () => {
    const { html } = buildInquiryEmail(
      { ...inquiry, fullName: 'Eve <img src=x onerror="alert(1)">', message: "<script>steal()</script>" },
      submittedAt,
    );

    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img src=x");
    expect(html).toContain("&lt;script&gt;");
  });

  it("shows a placeholder when no project details were given", () => {
    const { text } = buildInquiryEmail({ ...inquiry, message: "" }, submittedAt);

    expect(text).toContain("—");
  });
});
