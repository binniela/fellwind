import { NextResponse } from "next/server";

/**
 * Booking / contact endpoint.
 *
 * ⚠️ BACKEND WIRING REQUIRED - this route validates input and returns success,
 * but it does NOT yet deliver the message anywhere. To make it production-live,
 * replace the `// TODO: deliver` block with one of:
 *   - an email provider (Resend, Postmark, SendGrid)
 *   - a CRM / scheduler webhook (HubSpot, Cal.com, Calendly)
 *   - a database insert
 * Add any secrets as environment variables (never commit them).
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  // Server-side validation (never trust the client).
  const errors: Errors = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Tell us a little about your launch (10+ characters).";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // TODO: deliver the booking request (email / CRM / scheduler / DB).
  // For now we just log on the server so the integration point is obvious.
  console.log("[contact] new booking request:", { name, email, message });

  return NextResponse.json({ ok: true });
}
