"use client";

import { useEffect, useRef, useState } from "react";

const BOOKING_HREF = "#contact";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Sticky nav condenses + frosts once the user leaves the very top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape; restore focus to the toggle. Move focus into the
  // panel on open so keyboard/SR users land on the menu.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Prevent body scroll while the mobile panel is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a className="wordmark" href="#top">Fellwind</a>

        <div className="nav-right">
          <nav className="nav-links" aria-label="Primary">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <a className="btn btn-primary nav-cta" href={BOOKING_HREF}>
            Book a call
          </a>

          <button
            ref={burgerRef}
            className={`nav-burger${open ? " is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile disclosure panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`mobile-menu${open ? " is-open" : ""}`}
        hidden={!open}
      >
        <nav aria-label="Mobile" className="mobile-menu-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a className="btn btn-primary" href={BOOKING_HREF} onClick={() => setOpen(false)}>
            Book a call
          </a>
        </nav>
      </div>
    </header>
  );
}
