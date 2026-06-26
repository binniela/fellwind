import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Booking / contact endpoint.
 *
 * Delivers submissions by email via Resend. Configure with env vars:
 *   - RESEND_API_KEY     (required) — from https://resend.com/api-keys
 *   - CONTACT_TO_EMAIL   (optional) — where requests are delivered
 *   - CONTACT_FROM_EMAIL (optional) — verified sender, e.g. "Fellwind <hello@fellwind.com>"
 * Never commit secrets — set these in .env.local and in your Vercel project.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "vincentlc0805@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Fellwind <hello@fellwind.com>";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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

  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not set — cannot deliver booking request.");
    return NextResponse.json(
      { ok: false, error: "Email delivery is not configured." },
      { status: 500 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New booking request — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nWhat are you launching?\n${message}`,
      html: `
        <h2 style="margin:0 0 16px;font-family:Georgia,serif;">New booking request</h2>
        <p style="margin:0 0 6px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 6px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p style="margin:16px 0 6px;"><strong>What are you launching?</strong></p>
        <p style="margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not send your message. Please try again." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] Unexpected error sending email:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
