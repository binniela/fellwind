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
 *         and the hero group. Whole-section reveals are avoided - they're
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
    // the bottom. rootMargin -10% means "well inside the screen" - the
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

  /**
   * Hero rope alignment.
   *
   * The figure is sized with dvh/object-fit:contain while the rope SVG box is
   * sized in vw — so any change to the viewport aspect ratio (resize, browser
   * zoom with ⌘+/-, mobile) moves them by different amounts and a hard-coded
   * line drifts off the hands. Instead we derive the line from the figure's
   * ACTUAL rendered hands every time the layout changes, so it stays locked to
   * her grip, the nav rule, and the metrics row at every size and zoom level.
   *
   * Hand positions are constants of the source PNG (975×1614): the raised right
   * fist and the lower left fist, as fractions of the image.
   */
  useEffect(() => {
    const NAT = 1376 / 1143; // source image aspect ratio (three-figure composite)
    const END_ABOVE_METRICS = 0; // px gap to leave above the metrics row

    // One rope per figure: the raised right fist and the lower left fist of
    // each lady, as fractions of the composite image (detected from the PNG).
    const FIGURES = [
      { upper: { fx: 0.35, fy: 0.451 }, lower: { fx: 0.17, fy: 0.709 } }, // left (light)
      { upper: { fx: 0.637, fy: 0.267 }, lower: { fx: 0.459, fy: 0.522 } }, // middle
      { upper: { fx: 0.898, fy: 0.101 }, lower: { fx: 0.727, fy: 0.346 } }, // right (black)
    ];

    function place() {
      const svg = document.querySelector<SVGSVGElement>(".hero-diagonal");
      const lines = document.querySelectorAll<SVGLineElement>(".hero-diagonal line");
      const slot = document.querySelector<HTMLElement>(".hero-photo");
      const nav =
        document.querySelector<HTMLElement>(".site-nav") ||
        document.querySelector<HTMLElement>("header");
      const metrics = document.querySelector<HTMLElement>(".metrics");
      if (!svg || !lines.length || !slot || !nav || !metrics) return;

      // The reveal animation briefly applies a scaleY to the SVG, which would
      // distort the box→viewBox mapping. Skip until it settles to identity; a
      // transitionend / settled pass re-runs once it's done.
      const tf = getComputedStyle(svg).transform;
      if (tf && tf !== "none" && !/^matrix\(1, 0, 0, 1, /.test(tf)) return;
      const box = svg.getBoundingClientRect();
      const w = box.width;
      const h = box.height;
      if (!w || !h) return;

      // object-fit: contain — work out the displayed image rect inside the slot
      const s = slot.getBoundingClientRect();
      let dW: number, dH: number;
      if (s.width / s.height > NAT) {
        dH = s.height;
        dW = dH * NAT;
      } else {
        dW = s.width;
        dH = dW / NAT;
      }
      const dLeft = s.left + (s.width - dW) / 2;
      const dTop = s.top + (s.height - dH) / 2;

      const navBottom = nav.getBoundingClientRect().bottom;
      const metricsTop = metrics.getBoundingClientRect().top;
      const topY = navBottom;
      const botY = metricsTop - END_ABOVE_METRICS;

      // viewport px -> the SVG's 0..100 viewBox (preserveAspectRatio="none")
      const toX = (px: number) => ((px - box.left) / w) * 100;
      const toY = (px: number) => ((px - box.top) / h) * 100;

      // draw one rope per figure through both its fists, extended up to the nav
      // rule and down to the metrics row
      lines.forEach((l, i) => {
        const fig = FIGURES[i];
        if (!fig) return;
        const upper = { x: dLeft + fig.upper.fx * dW, y: dTop + fig.upper.fy * dH };
        const lower = { x: dLeft + fig.lower.fx * dW, y: dTop + fig.lower.fy * dH };
        if (lower.y === upper.y) return;
        const slope = (lower.x - upper.x) / (lower.y - upper.y);
        const topX = upper.x + slope * (topY - upper.y);
        const botX = upper.x + slope * (botY - upper.y);
        l.setAttribute("x1", toX(topX).toFixed(2));
        l.setAttribute("y1", toY(topY).toFixed(2));
        l.setAttribute("x2", toX(botX).toFixed(2));
        l.setAttribute("y2", toY(botY).toFixed(2));
      });
    }

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(place);
    };

    schedule();
    // re-run after late layout shifts (reveal finishing, web fonts, decode)
    const t1 = window.setTimeout(schedule, 250);
    const t2 = window.setTimeout(schedule, 1500);
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(schedule).catch(() => {});
    }
    const svgEl = document.querySelector<SVGSVGElement>(".hero-diagonal");
    svgEl?.addEventListener("transitionend", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
      svgEl?.removeEventListener("transitionend", schedule);
      ro.disconnect();
    };
  }, []);

  return null;
}
