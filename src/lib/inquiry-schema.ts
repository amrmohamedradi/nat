import { z } from "zod";
import { serviceChoiceIds } from "@/data/services";

// Shared by the client form (instant feedback) and the API route (authoritative).

const instagramPattern = /^[A-Za-z0-9._]{1,30}$/;

/**
 * Accepts what people actually paste: "@handle", "instagram.com/handle",
 * "https://www.instagram.com/handle/?igsh=…" all become "handle".
 */
export function normalizeInstagram(value: string): string {
  const v = value.trim();
  const fromUrl = v.match(/^(?:https?:\/\/)?(?:www\.|m\.)?(?:instagram\.com|instagr\.am)\/@?([^/?#\s]+)/i);
  return (fromUrl ? fromUrl[1] : v).replace(/^@+/, "");
}

export const inquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "That name is a little long — 100 characters max."),
  instagram: z
    .string()
    .trim()
    .transform(normalizeInstagram)
    .pipe(
      z
        .string()
        .min(1, "Please enter your Instagram username.")
        .regex(instagramPattern, "Use letters, numbers, periods or underscores (max 30)."),
    ),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(254, "That email is too long.")
    .pipe(z.email("Please enter a valid email address.")),
  service: z.enum(serviceChoiceIds, { error: "Please choose a service." }),
  message: z.string().trim().max(3000, "Please keep it under 3000 characters.").optional().default(""),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;
export type InquiryField = keyof InquiryInput;

// Spam-protection fields sent alongside the form data (not part of the inquiry).
// Deliberately meaningless name so browser autofill never fills it for real visitors.
export const HONEYPOT_FIELD = "nat_hp_7f3";
// Milliseconds the visitor spent on the form (client-measured duration, so no clock-skew issues).
export const FILL_MS_FIELD = "fillMs";
export const MIN_FILL_MS = 2500;

export type InquiryResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<InquiryField, string>> };
