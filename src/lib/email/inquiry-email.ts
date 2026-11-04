import { getServiceTitle } from "@/data/services";
import type { Inquiry } from "@/lib/inquiry-schema";

// Builds the notification email Nat receives for each inquiry.
// Table layout + inline styles so it renders consistently in email clients.

const ink = "#063444";
const inkSoft = "#2f5563";
const pink = "#eb5988";
const pinkDeep = "#c13a68";
const cream = "#fffbf5";
const paper = "#f7f0e6";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatCairo(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

export function buildInquiryEmail(inquiry: Inquiry, submittedAt: Date) {
  const serviceTitles = inquiry.services.map((id) => getServiceTitle(id) ?? id);
  const message = inquiry.message.trim();
  const handle = inquiry.instagram;
  const instagramUrl = `https://instagram.com/${encodeURIComponent(handle)}`;
  const cairo = `${formatCairo(submittedAt)} (Cairo)`;
  const iso = submittedAt.toISOString();

  const rows: { label: string; html: string }[] = [
    { label: "Full name", html: escapeHtml(inquiry.fullName) },
    {
      label: "Instagram",
      html: `<a href="${escapeHtml(instagramUrl)}" style="color:${pinkDeep};text-decoration:none;font-weight:600;">@${escapeHtml(handle)}</a>`,
    },
    {
      label: "Email",
      html: `<a href="mailto:${escapeHtml(inquiry.email)}" style="color:${pinkDeep};text-decoration:none;font-weight:600;">${escapeHtml(inquiry.email)}</a>`,
    },
    {
      label: serviceTitles.length > 1 ? "Services" : "Service",
      html: serviceTitles.map(escapeHtml).join("<br>"),
    },
    {
      label: "Submitted",
      html: `${escapeHtml(cairo)}<br><span style="color:${inkSoft};font-size:13px;">${escapeHtml(iso)} UTC</span>`,
    },
  ];

  const rowHtml = rows
    .map(
      (r) => `
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid ${paper};width:120px;vertical-align:top;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${inkSoft};">${r.label}</td>
            <td style="padding:12px 0;border-bottom:1px solid ${paper};vertical-align:top;font-size:15px;line-height:1.5;color:${ink};">${r.html}</td>
          </tr>`,
    )
    .join("");

  const messageHtml = message
    ? escapeHtml(message).replace(/\r?\n/g, "<br>")
    : `<span style="color:${inkSoft};">—</span>`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>New Client Inquiry — Nat.</title>
</head>
<body style="margin:0;padding:0;background:${paper};font-family:Helvetica,Arial,sans-serif;color:${ink};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${paper};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:${cream};border-radius:16px;border:1px solid #eadfce;">
          <tr>
            <td style="padding:28px 32px 20px;border-bottom:3px solid ${pink};">
              <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${pinkDeep};font-weight:600;">New client inquiry</p>
              <h1 style="margin:0;font-size:24px;line-height:1.25;color:${ink};font-weight:600;">${escapeHtml(inquiry.fullName)} wants to work with you</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rowHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 8px;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${inkSoft};">Project details</p>
              <div style="background:${paper};border-radius:12px;padding:16px 18px;font-size:15px;line-height:1.6;color:${ink};">${messageHtml}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;font-size:13px;line-height:1.5;color:${inkSoft};">
              Reply to this email to respond to ${escapeHtml(inquiry.fullName)} directly.
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-size:12px;color:${inkSoft};">Sent from the Nat. website inquiry form</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    "New Client Inquiry — Nat.",
    "",
    `Full name: ${inquiry.fullName}`,
    `Instagram: @${handle} (${instagramUrl})`,
    `Email: ${inquiry.email}`,
    `${serviceTitles.length > 1 ? "Services" : "Service"}: ${serviceTitles.join(", ")}`,
    `Submitted: ${cairo}`,
    `           ${iso} UTC`,
    "",
    "Project details:",
    message || "—",
    "",
    "Reply to this email to respond directly.",
  ].join("\n");

  return { html, text };
}
