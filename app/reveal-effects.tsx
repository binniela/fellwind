"use client";

import { useEffect } from "react";

/**
 * Linear-style motion system.
 *
 * Hero:   single coordinated entrance, staggered via CSS transition-delay.
 *         Fires after a 60ms paint-settle delay so the hidden state is
 *         guaranteed to be rendered before the reveal begins.
 *
 * Scroll: IntersectionObserver targets section headings ([data-reveal-heading])
 *         and the hero group. Whole-section reveals are avoided — they're
 *         jarring on tall sections and feel like a template, not a product.
 *
 * All motion gated behind prefers-reduced-motion.
 */
export default function RevealEffects() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const allReveals = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-heading]")
    );

    if (prefersReduced || !("IntersectionObserver" in window)) {
      allReveals.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const heroReveals = Array.from(
      document.querySelectorAll<HTMLElement>(".hero [data-reveal]")
    );

    // 60ms delay: guarantees the browser has painted the hidden state
    // before we begin. Eliminates the flash-then-hide flicker on fast loads.
    const heroTimer = window.setTimeout(() => {
      heroReveals.forEach((el) => el.classList.add("is-visible"));
    }, 60);

    // Scroll reveals: fire when the element is 10% into the viewport from
    // the bottom. rootMargin -10% means "well inside the screen" — the
    // heading is clearly visible before the animation completes.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    allReveals.forEach((el) => {
      if (!heroReveals.includes(el)) io.observe(el);
    });

    // Smooth-scroll anchors with focus management for accessibility.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick);
    return () => {
      clearTimeout(heroTimer);
      io.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
