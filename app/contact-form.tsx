"use client";

import { useId, useRef, useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "submitting" | "success" | "error";

function validate(values: { name: string; email: string; message: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10) errors.message = "Tell us a little about your launch (10+ characters).";
  return errors;
}

export default function ContactForm() {
  const baseId = useId();
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const fieldId = (name: string) => `${baseId}-${name}`;
  const errId = (name: string) => `${baseId}-${name}-err`;

  function update(name: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) {
      setErrors(validate({ ...values, [name]: value }));
    }
  }

  function handleBlur(name: keyof typeof values) {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first invalid field for keyboard/SR users.
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(fieldId(firstKey))?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.errors) {
          setErrors(data.errors);
          setStatus("idle");
          return;
        }
        throw new Error("Request failed");
      }
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
      setTouched({});
    } catch {
      setStatus("error");
      setFormError("Something went wrong sending your message. Please try again, or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <p className="form-success-mark" aria-hidden="true">✓</p>
        <h3 className="form-success-title">Thanks — we&apos;ve got it.</h3>
        <p className="form-success-copy">
          We reply within 24 hours with a couple of times for your free 30-minute call.
        </p>
        <button type="button" className="text-link" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      {formError && (
        <div className="form-banner" role="alert" ref={errorSummaryRef}>
          {formError}
        </div>
      )}

      <div className="field">
        <label htmlFor={fieldId("name")}>Name</label>
        <input
          id={fieldId("name")}
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? errId("name") : undefined}
          required
        />
        {errors.name && (
          <p className="field-error" id={errId("name")}>
            {errors.name}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor={fieldId("email")}>Email</label>
        <input
          id={fieldId("email")}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? errId("email") : undefined}
          required
        />
        {errors.email && (
          <p className="field-error" id={errId("email")}>
            {errors.email}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor={fieldId("message")}>What are you launching?</label>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={4}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? errId("message") : undefined}
          required
        />
        {errors.message && (
          <p className="field-error" id={errId("message")}>
            {errors.message}
          </p>
        )}
      </div>

      <p className="booking-outcome">We&apos;ll reply with two available times.</p>
      <button type="submit" className="btn btn-primary booking-submit" disabled={status === "submitting"}>
        <span>{status === "submitting" ? "Sending…" : "Book my free call"}</span>
        {status !== "submitting" && (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <p className="reassure">Free 30-min call · No commitment · We reply within 24 hours</p>
    </form>
  );
}
