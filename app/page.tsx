/* eslint-disable @next/next/no-img-element */
// Editorial agency homepage — recreation of the reference layout.
// Diagonal accent lines + the concentric sphere are inline SVG.

import RevealEffects from "./reveal-effects";
import type { CSSProperties } from "react";

type RevealStyle = CSSProperties & { "--reveal-delay"?: string };

const HERO_IMAGE_SRC = "/assets/img/hero-cutout.png";
const LATEST_PROJECTS_IMAGE_SRC = "/assets/img/latest-projects.jpg";
const TESTIMONIAL_IMAGE_SRC = "/assets/img/testimonial.jpg";

// One primary action for the whole page: booking a call.
// TODO: swap for your real scheduler (e.g. https://cal.com/fellwind or a Calendly link).
const BOOKING_HREF = "#contact";
const REASSURANCE = "Free 30-min call · No commitment · We reply within 24 hours";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CtaButton({
  children,
  className = "",
  href = BOOKING_HREF,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <a className={`btn btn-primary ${className}`.trim()} href={href}>
      <span>{children}</span>
      <ArrowIcon />
    </a>
  );
}

function ConcentricSphere({ size = 210 }: { size?: number }) {
  const arcs = [
    { y: 156, rx: 83, ry: 83 },
    { y: 162, rx: 74, ry: 74 },
    { y: 168, rx: 65, ry: 65 },
    { y: 174, rx: 56, ry: 56 },
    { y: 180, rx: 47, ry: 47 },
    { y: 186, rx: 38, ry: 38 },
    { y: 192, rx: 29, ry: 29 },
    { y: 198, rx: 20, ry: 20 },
    { y: 204, rx: 11, ry: 11 },
  ];

  return (
    <svg
      className="sphere"
      width={size}
      height={size}
      viewBox="0 0 220 220"
      role="img"
      aria-label="Concentric sphere graphic"
    >
      <circle cx="110" cy="110" r="96" fill="currentColor" />
      <g fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round">
        {arcs.map((arc) => (
          <path
            key={`${arc.y}-${arc.rx}`}
            d={`M ${110 - arc.rx} ${arc.y} A ${arc.rx} ${arc.ry} 0 0 1 ${110 + arc.rx} ${arc.y}`}
          />
        ))}
      </g>
      <circle cx="110" cy="206" r="3.5" fill="#fff" />
    </svg>
  );
}

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <RevealEffects />
      {/* ================= NAV ================= */}
      <header className="site-nav">
        <div className="container nav-inner">
          <a className="wordmark" href="#top" data-reveal style={{ "--reveal-delay": "0ms" } as RevealStyle}>Fellwind</a>
          <div className="nav-right">
            <nav className="nav-links" aria-label="Primary" data-reveal style={{ "--reveal-delay": "80ms" } as RevealStyle}>
              <a href="#work">About</a>
              <a href="#work">Work</a>
              <a href="#contact">Contact</a>
            </nav>
            {/* Persistent primary CTA — visible at the top on every scroll position */}
            <a className="btn btn-primary nav-cta" href={BOOKING_HREF} data-reveal style={{ "--reveal-delay": "120ms" } as RevealStyle}>Book a call</a>
            <button className="nav-burger" aria-label="Open menu" data-reveal style={{ "--reveal-delay": "160ms" } as RevealStyle}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ================= HERO ================= */}
        <section className="hero">
          <div className="container hero-grid">
            {/* Long thin line: starts right of the headline (near the image's
                left edge) and runs down to the hero's bottom-left corner. */}
            <svg className="hero-diagonal" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" data-reveal style={{ "--reveal-delay": "260ms" } as RevealStyle}>
              <line x1="61" y1="17" x2="0" y2="132" stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>

            <h1 className="hero-title" data-reveal style={{ "--reveal-delay": "110ms" } as RevealStyle}>
              <span className="hero-kicker">For sharp products with forgettable launches</span>
              <span className="line">Launches</span>
              <span className="line">the market</span>
              <span className="line">can&apos;t</span>
              <span className="line">ignore</span>
            </h1>

            <div className="hero-right">
              <div className="image-slot hero-photo" data-reveal style={{ "--reveal-delay": "190ms" } as RevealStyle}>
                <img
                  src={HERO_IMAGE_SRC}
                  alt=""
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="hero-foot" data-reveal style={{ "--reveal-delay": "310ms" } as RevealStyle}>
                <p className="copy">
                  We build identity systems and launch worlds that turn sharp
                  products into the thing everyone&apos;s talking about — in weeks,
                  not quarters.
                </p>
                <div className="cta-group">
                  <CtaButton>Book a free call</CtaButton>
                  <p className="reassure">{REASSURANCE}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROOF / TRUST ================= */}
        <section className="proof" aria-label="Results and trusted clients">
          <div className="container">
            <ul className="metrics" data-reveal>
              <li className="metric">
                <span className="metric-num">120+</span>
                <span className="metric-label">launches shipped</span>
              </li>
              <li className="metric">
                <span className="metric-num">4.9/5</span>
                <span className="metric-label">average client rating</span>
              </li>
              <li className="metric">
                <span className="metric-num">2.4×</span>
                <span className="metric-label">avg. launch-week traffic lift</span>
              </li>
              <li className="metric">
                <span className="metric-num">14 days</span>
                <span className="metric-label">from kickoff to launch</span>
              </li>
            </ul>
            <div className="logos" data-reveal>
              <span className="logos-label">Trusted by teams at</span>
              <ul>
                <li>Northbeam</li>
                <li>Lumen</li>
                <li>Kestrel</li>
                <li>Halonyx</li>
                <li>Verda</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= LATEST PROJECTS ================= */}
        <section className="latest" id="work">
          <div className="container">
            <h2 className="latest-head h-section" data-reveal-heading>
              Latest<br />Projects
            </h2>
          </div>
          <div className="container">
            <div className="image-slot block-wide">
              <img
                src={LATEST_PROJECTS_IMAGE_SRC}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        {/* ================= WE WERE BOTH CREATIVES ================= */}
        <section className="creatives">
          <div className="container">
            <div className="creatives-grid">
              {/* Diagonal scoped to the grid: upper-right (left of sphere) down
                  past "creatives" to the lower-left. */}
              <svg className="creatives-diagonal" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <line x1="84" y1="2" x2="14" y2="86" stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              </svg>

            <h2 className="creatives-title" data-reveal-heading>
                We were both<br />creatives
              </h2>

              <div className="creatives-art" data-reveal>
                <ConcentricSphere />
              </div>
            </div>

            <div className="creatives-foot" data-reveal>
              <p className="copy">
                We pair strategy, identity, and digital craft so every launch
                feels precise, ownable, and hard to ignore.
              </p>
              <a className="text-link" href="#work">+ View All</a>
            </div>
          </div>
        </section>

        {/* ================= WHAT WE DO ================= */}
        <section className="services">
          <div className="container">
            <h2 className="services-title" data-reveal-heading>
              What<br />We Do
            </h2>
            <p className="services-intro" data-reveal>
              Systems, sites, and launch moments with a distinct point of view.
            </p>

            <div className="services-grid" data-reveal>
              <ul>
                <li className="service-row">Web Development</li>
                <li className="service-row">Web Design</li>
                <li className="service-row">UI / UX</li>
                <li className="service-row">Strategy</li>
              </ul>
              <ul>
                <li className="service-row">Branding</li>
                <li className="service-row">Art Direction</li>
                <li className="service-row">Packaging</li>
                <li className="service-row">Illustration</li>
              </ul>
            </div>

            <div className="services-foot">
              <div className="services-cta" data-reveal>
                <CtaButton>Book a free call</CtaButton>
                <p className="reassure">{REASSURANCE}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CLIENTS ================= */}
        <section className="clients">
          <div className="container">
            <h2 className="clients-title" data-reveal-heading>
              What our<br />clients saying
            </h2>
            <p className="clients-quote" data-reveal>
              “Fellwind translated a scattered product story into a launch system
              our sales team could actually use. Launch week beat our annual
              target in five days.”
            </p>
            <p className="clients-result" data-reveal>↑ 2.4× launch-week signups in the first month</p>
            <p className="clients-attrib" data-reveal>
              <b>Claus Jansson</b><br />
              <span>CEO &amp; Founder, Northbeam</span>
            </p>
            <div className="dots" aria-hidden="true" data-reveal>
              <i className="active" /><i /><i />
            </div>
          </div>
          <div className="container">
            <div className="image-slot clients-photo">
              <img
                src={TESTIMONIAL_IMAGE_SRC}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-top">
            <div className="newsletter">
              <a className="wordmark" href="#top">Fellwind</a>
              <p className="newsletter-label">Field notes on launches, systems, and taste.</p>
              {/* Placeholder form — wire up your own submit handler */}
              <form className="email-field" action="#">
                <input type="email" placeholder="Email" aria-label="Email" />
                <button type="submit" aria-label="Subscribe">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            </div>

            <div className="footer-cta">
              <p className="footer-cta-label">For founders, studios, and teams with momentum.</p>
              <h2 className="footer-cta-title">
                Ready to<br />work with us?
              </h2>
              <div className="cta-group">
                <CtaButton>Book your free call</CtaButton>
                <p className="reassure">{REASSURANCE}</p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {year} Fellwind</p>
            <div className="socials" aria-label="Social links">
              <a href="#" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h2.5l.5-3H13v-2c0-.6.4-1 1-1z" /></svg>
              </a>
              <a href="#" aria-label="X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h2.7l-5.9 6.7L21 21h-5.4l-4.2-5.5L6.5 21H3.8l6.3-7.2L3 3h5.5l3.8 5.1L17.5 3zm-1 16h1.5L7.6 4.5H6L16.5 19z" /></svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 8.5v9h-3v-9h3zM5 4a1.8 1.8 0 110 3.6A1.8 1.8 0 015 4zm5.5 4.5h2.9v1.3c.4-.7 1.4-1.5 2.9-1.5 3.1 0 3.7 2 3.7 4.7v4.5h-3v-4c0-1-.02-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2v4.1h-3v-9z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
