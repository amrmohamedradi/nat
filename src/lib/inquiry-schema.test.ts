import { describe, expect, it } from "vitest";
import { NOT_SURE_ID, services } from "@/data/services";
import { inquirySchema } from "./inquiry-schema";

const valid = {
  fullName: "Test Client",
  instagram: "test.client",
  email: "test@example.com",
  services: [services[0].id],
  message: "",
};

function errorFor(input: Record<string, unknown>, field: string) {
  const result = inquirySchema.safeParse(input);
  if (result.success) return undefined;
  return result.error.issues.find((i) => i.path[0] === field)?.message;
}

describe("inquirySchema", () => {
  it.each(["", "   ", undefined])("accepts an omitted or blank Instagram handle: %s", (instagram) => {
    expect(inquirySchema.parse({ ...valid, instagram }).instagram).toBe("");
  });

  it("accepts a complete inquiry", () => {
    expect(inquirySchema.safeParse(valid).success).toBe(true);
  });

  it("treats the message as optional and defaults it to an empty string", () => {
    const result = inquirySchema.parse({ ...valid, message: undefined });
    expect(result.message).toBe("");
  });

  it("trims whitespace around every text field", () => {
    const result = inquirySchema.parse({ ...valid, fullName: "  Test Client  ", email: " test@example.com " });
    expect(result.fullName).toBe("Test Client");
    expect(result.email).toBe("test@example.com");
  });

  it("strips leading @ signs from the Instagram username", () => {
    expect(inquirySchema.parse({ ...valid, instagram: "@@test.client" }).instagram).toBe("test.client");
  });

  it.each([
    "instagram.com/test.client",
    "https://www.instagram.com/test.client/",
    "https://instagram.com/test.client?igsh=abc123",
    "http://m.instagram.com/@test.client",
  ])("extracts the username from a pasted profile link: %s", (pasted) => {
    expect(inquirySchema.parse({ ...valid, instagram: pasted }).instagram).toBe("test.client");
  });

  it.each([
    ["fullName", "", "Please enter your full name."],
    ["fullName", "A", "Please enter your full name."],
    ["instagram", "has space", "Use letters, numbers, periods or underscores (max 30)."],
    ["instagram", "a".repeat(31), "Use letters, numbers, periods or underscores (max 30)."],
    ["email", "", "Please enter your email address."],
    ["email", "not-an-email", "Please enter a valid email address."],
    ["services", [], "Please choose at least one service."],
    ["services", ["made-up-service"], "Please choose from the listed services."],
  ])("rejects %s = %j with a clear message", (field, value, message) => {
    expect(errorFor({ ...valid, [field]: value }, field)).toBe(message);
  });

  it("rejects a message longer than 3000 characters", () => {
    expect(errorFor({ ...valid, message: "x".repeat(3001) }, "message")).toBe(
      "Please keep it under 3000 characters.",
    );
  });

  it("accepts every configured service id", () => {
    for (const s of services) {
      expect(inquirySchema.safeParse({ ...valid, services: [s.id] }).success).toBe(true);
    }
  });

  it('accepts "not sure yet" as a service choice', () => {
    expect(inquirySchema.safeParse({ ...valid, services: [NOT_SURE_ID] }).success).toBe(true);
  });

  it("accepts several services and collapses duplicates", () => {
    const picked = [services[0].id, services[2].id, services[0].id];
    expect(inquirySchema.parse({ ...valid, services: picked }).services).toEqual([services[0].id, services[2].id]);
  });
});
