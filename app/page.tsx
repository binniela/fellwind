// Editorial agency homepage - recreation of the reference layout.
// Diagonal accent lines + the concentric sphere are inline SVG.

import Image from "next/image";
import RevealEffects from "./reveal-effects";
import SiteNav from "./site-nav";
import ContactForm from "./contact-form";

const HERO_IMAGE_SRC = "/assets/img/hero-cutout.png";
const LATEST_PROJECTS_IMAGE_SRC = "/assets/img/latest-projects.jpg";
const TESTIMONIAL_IMAGE_SRC = "/assets/img/testimonial.jpg";

// One primary action for the whole page: booking a call.
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

// FAQ content - concrete, buyer-intent questions. Answers double as the
// FAQPage schema below, and AI engines can quote them directly. Each answer
// weaves in an internal link between sections.
type Faq = { q: string; text: string; link?: { phrase: string; href: string } };

const FAQS: Faq[] = [
  {
    q: "Who is Fellwind?",
    text:
      "Fellwind is a brand and launch studio. We build identity systems, websites, and launch campaigns that help product companies ship launches people remember, with 120+ launches shipped at a 4.9/5 average client rating. See what we do.",
    link: { phrase: "what we do", href: "#services" },
  },
  {
    q: "What does Fellwind do?",
    text:
      "We handle branding, art direction, web design and development, UI/UX, packaging, and launch strategy, the full system behind a standout launch. Browse recent projects.",
    link: { phrase: "recent projects", href: "#work" },
  },
  {
    q: "How fast can Fellwind launch my product?",
    text:
      "Most engagements run about 14 days from kickoff to launch, depending on scope. We work in focused sprints so momentum never stalls. Here's how we work.",
    link: { phrase: "how we work", href: "#approach" },
  },
  {
    q: "Who does Fellwind work with?",
    text:
      "Founders, studios, and product teams with momentum, from pre-launch startups to established brands relaunching a product into a crowded market.",
  },
  {
    q: "How do I start working with Fellwind?",
    text:
      "Book a free 30-minute call. It's no-commitment, and we reply within 24 hours with a couple of times that work.",
    link: { phrase: "Book a free 30-minute call", href: "#contact" },
  },
];

function FaqAnswer({ faq }: { faq: Faq }) {
  if (!faq.link) return <>{faq.text}</>;
  const [before, after] = faq.text.split(faq.link.phrase);
  return (
    <>
      {before}
      <a className="faq-link" href={faq.link.href}>
        {faq.link.phrase}
      </a>
      {after}
    </>
  );
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.text },
  })),
};

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <RevealEffects />
      <a className="skip-link" href="#top">Skip to content</a>

      {/* ================= NAV ================= */}
      <SiteNav />

      <main id="top">
        {/* ================= HERO ================= */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-grid">
            {/* Long thin line: starts right of the headline (near the image's
                left edge) and runs down to the hero's bottom-left corner. */}
            <svg className="hero-diagonal" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" data-reveal style={{ "--reveal-delay": "260ms" } as React.CSSProperties}>
              <line x1="64" y1="15" x2="0" y2="102" stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>

            <h1 className="hero-title" id="hero-title" data-reveal style={{ "--reveal-delay": "110ms" } as React.CSSProperties}>
              <span className="visually-hidden">Fellwind, </span>
              <span className="hero-kicker">For sharp products with forgettable launches</span>
              <span className="line">Launches</span>
              <span className="line">the market</span>
              <span className="line">can&apos;t</span>
              <span className="line">ignore</span>
            </h1>

            <div className="hero-right">
              <div className="image-slot hero-photo" data-reveal style={{ "--reveal-delay": "190ms" } as React.CSSProperties}>
                <Image
                  src={HERO_IMAGE_SRC}
                  alt="Fellwind brand and launch studio with a figure mid-stride in a sharp black suit"
                  fill
                  priority
                  sizes="(max-width: 860px) 45vw, 42vw"
                />
              </div>
              <div className="hero-foot" data-reveal style={{ "--reveal-delay": "310ms" } as React.CSSProperties}>
                <p className="copy">
                  We build identity systems and launch worlds that turn sharp
                  products into the thing everyone&apos;s talking about in weeks,
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
              <span className="logos-label" id="logos-label">Trusted by teams at</span>
              <div className="logos-marquee" aria-labelledby="logos-label">
                <ul className="logos-track">
                  <li>Northbeam</li>
                  <li>Lumen</li>
                  <li>Kestrel</li>
                  <li>Halonyx</li>
                  <li>Verda</li>
                  <li>
                    <a href="https://cesello.org/" target="_blank" rel="noreferrer">
                      Cesello
                    </a>
                  </li>
                </ul>
                <ul className="logos-track" aria-hidden="true">
                  <li>Northbeam</li>
                  <li>Lumen</li>
                  <li>Kestrel</li>
                  <li>Halonyx</li>
                  <li>Verda</li>
                  <li>
                    <a href="https://cesello.org/" tabIndex={-1}>
                      Cesello
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= LATEST PROJECTS ================= */}
        <section className="latest" id="work" aria-labelledby="latest-head">
          <div className="container">
            <h2 className="latest-head h-section" id="latest-head" data-reveal-heading>
              Latest<br />Projects
            </h2>
          </div>
          <div className="container">
            <div className="image-slot block-wide">
              <Image
                src={LATEST_PROJECTS_IMAGE_SRC}
                alt="Fellwind brand identity and product launch design work"
                fill
                loading="lazy"
                sizes="(max-width: 860px) 100vw, 84vw"
              />
            </div>
          </div>
        </section>

        {/* ================= WE WERE BOTH CREATIVES ================= */}
        <section className="creatives" id="approach" aria-labelledby="creatives-title">
          <div className="container">
            <div className="creatives-grid">
              {/* Diagonal scoped to the grid: upper-right (left of sphere) down
                  past "creatives" to the lower-left. */}
              <svg className="creatives-diagonal" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <line x1="84" y1="2" x2="14" y2="86" stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              </svg>

              <h2 className="creatives-title" id="creatives-title" data-reveal-heading>
                We were both<br />creatives
              </h2>

              <div className="creatives-art" aria-hidden="true" data-reveal>
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
        <section className="services" id="services" aria-labelledby="services-title">
          <div className="container">
            <h2 className="services-title" id="services-title" data-reveal-heading>
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

          </div>
        </section>

        {/* ================= CLIENTS ================= */}
        <section className="clients" aria-labelledby="clients-title">
          <div className="container">
            <h2 className="clients-title" id="clients-title" data-reveal-heading>
              What our<br />clients say
            </h2>
            <blockquote className="clients-quote" data-reveal>
              “Fellwind translated a scattered product story into a launch system
              our sales team could actually use. Launch week beat our annual
              target in five days.”
            </blockquote>
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
              <Image
                src={TESTIMONIAL_IMAGE_SRC}
                alt="Claus Jansson, CEO and founder of Northbeam, a Fellwind launch client"
                fill
                loading="lazy"
                sizes="(max-width: 860px) 100vw, 84vw"
              />
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="faq" id="faq" aria-labelledby="faq-title">
          <div className="container">
            <h2 className="faq-title" id="faq-title" data-reveal-heading>
              Common questions<br />about Fellwind
            </h2>
            <dl className="faq-list" data-reveal>
              {FAQS.map((faq) => (
                <div className="faq-item" key={faq.q}>
                  <dt className="faq-q">
                    <h3>{faq.q}</h3>
                  </dt>
                  <dd className="faq-a">
                    <FaqAnswer faq={faq} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ================= BOOKING / CONTACT ================= */}
        <section className="booking" id="contact" aria-labelledby="booking-title">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
          <div className="container booking-grid">
            <div className="booking-intro">
              <h2 className="booking-title" id="booking-title" data-reveal-heading>
                Let&apos;s build a<br />launch worth<br />watching
              </h2>
              <p className="booking-copy" data-reveal>
                Tell us what you&apos;re shipping. We&apos;ll come back within 24 hours
                with a couple of times for a free 30-minute call, no commitment,
                no hard sell.
              </p>
            </div>
            <div className="booking-card" data-reveal>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="newsletter">
              <a className="wordmark" href="#top">Fellwind</a>
              <nav className="socials footer-socials" aria-label="Social links">
                <a href="https://facebook.com" aria-label="Fellwind on Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h2.5l.5-3H13v-2c0-.6.4-1 1-1z" /></svg>
                </a>
                <a href="https://x.com" aria-label="Fellwind on X">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 3h2.7l-5.9 6.7L21 21h-5.4l-4.2-5.5L6.5 21H3.8l6.3-7.2L3 3h5.5l3.8 5.1L17.5 3zm-1 16h1.5L7.6 4.5H6L16.5 19z" /></svg>
                </a>
                <a href="https://instagram.com" aria-label="Fellwind on Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" /></svg>
                </a>
                <a href="https://www.linkedin.com/company/fellwind" aria-label="Fellwind on LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 8.5v9h-3v-9h3zM5 4a1.8 1.8 0 110 3.6A1.8 1.8 0 015 4zm5.5 4.5h2.9v1.3c.4-.7 1.4-1.5 2.9-1.5 3.1 0 3.7 2 3.7 4.7v4.5h-3v-4c0-1-.02-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2v4.1h-3v-9z" /></svg>
                </a>
              </nav>
              <p className="newsletter-label" id="newsletter-label">Field notes on launches, systems, and taste.</p>
              {/* Newsletter - wire up your own submit handler / ESP */}
              <form className="email-field" action="#" aria-labelledby="newsletter-label">
                <label className="visually-hidden" htmlFor="newsletter-email">Email address</label>
                <input id="newsletter-email" type="email" placeholder="Email" autoComplete="email" />
                <button type="submit" aria-label="Subscribe">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            </div>

            <nav className="footer-links" aria-label="Footer navigation">
              <div>
                <h3>Menu</h3>
                <a href="#top">Home</a>
                <a href="#work">Work</a>
                <a href="#approach">Approach</a>
                <a href="#faq">FAQ</a>
              </div>
              <div>
                <h3>Services</h3>
                <a href="#services">Branding</a>
                <a href="#services">Web Design</a>
                <a href="#services">UI / UX</a>
                <a href="#services">Strategy</a>
              </div>
              <div>
                <h3>Connect</h3>
                <a href="#contact">Book a Call</a>
                <a href="mailto:hello@fellwind.com">Email</a>
                <a href="https://www.linkedin.com/company/fellwind">LinkedIn</a>
              </div>
            </nav>

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
            <div className="footer-legal">
              <a href="#faq">Terms</a>
              <a href="#faq">Privacy Policy</a>
            </div>
          </div>
          <p className="footer-ghost" aria-hidden="true">Fellwind</p>
        </div>
      </footer>
    </>
  );
}
