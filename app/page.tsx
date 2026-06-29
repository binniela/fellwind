// Editorial agency homepage - recreation of the reference layout.
// Diagonal accent lines are inline SVG.

import Image from "next/image";
import RevealEffects from "./reveal-effects";
import SiteNav from "./site-nav";
import ContactForm from "./contact-form";

const ABOUT_FIGURE_SRC = "/assets/img/about-man-frame.png";
const PROJECT_NORTHBEAM_SRC = "/assets/img/project-northbeam.png";
const PROJECT_LUMEN_SRC = "/assets/img/project-lumen.png";
const PROJECT_KESTREL_SRC = "/assets/img/project-kestrel.png";
const PROJECT_HALONYX_SRC = "/assets/img/project-halonyx.png";
const PROJECT_VERDA_SRC = "/assets/img/project-verda.png";
const CLIENTS_PHOTO_SRC = "/assets/img/testimonial-listening.png";

// Services in row-major order so the auto-numbering reads 01 (left), 02 (right),
// 03 (left), … down the two columns.
const SERVICES = [
  { name: "Web Development", desc: "High-performing websites built for growth and scale." },
  { name: "Branding", desc: "Distinct identities that connect and leave a mark." },
  { name: "Web Design", desc: "Clean, conversion-focused design that elevates your brand." },
  { name: "Art Direction", desc: "Visual storytelling that brings ideas to life." },
  { name: "UI / UX", desc: "Intuitive experiences that users love to interact with." },
  { name: "Packaging", desc: "Thoughtful packaging that stands out on the shelf." },
  { name: "Strategy", desc: "Clear plans and positioning that drive real impact." },
  { name: "Illustration", desc: "Custom illustrations that add character and clarity." },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
      "Fellwind is a brand and launch studio. We build identity systems, websites, and launch campaigns that help product companies ship launches people remember. See what we do.",
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
    link: { phrase: "how we work", href: "#faq" },
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
  return (
    <>
      <RevealEffects />
      <a className="skip-link" href="#top">Skip to content</a>

      {/* ================= NAV ================= */}
      <SiteNav />

      <main id="top">
        {/* ================= HERO (About) ================= */}
        {/* Landing hero sized to one viewport: copy left, cut-out figure right,
            and a four-up metrics bar the figure appears to stand on. */}
        <section className="about-hero" id="about" aria-labelledby="about-title">
          <div className="container about-hero-inner">
            <div className="about-copy">
              <p className="about-eyebrow" data-reveal>About Fellwind</p>
              <h1 className="about-title" id="about-title" data-reveal style={{ "--reveal-delay": "90ms" } as React.CSSProperties}>
                <span className="visually-hidden">Fellwind. </span>
                <span>We build</span>
                <span>brands with</span>
                <span>point of view<span className="about-dot">.</span></span>
              </h1>
              <p className="about-lead" data-reveal style={{ "--reveal-delay": "170ms" } as React.CSSProperties}>
                Fellwind is a digital agency focused on strategy, design, and
                development. We partner with ambitious brands to create clarity,
                momentum, and meaningful impact.
              </p>
              <a className="about-link" href="#faq" data-reveal style={{ "--reveal-delay": "250ms" } as React.CSSProperties}>
                <span className="about-link-icon" aria-hidden="true"><ArrowUpRightIcon /></span>
                Learn more about our approach
              </a>
            </div>

            <div className="about-figure" data-reveal style={{ "--reveal-delay": "140ms" } as React.CSSProperties}>
              <Image
                src={ABOUT_FIGURE_SRC}
                alt="A Fellwind creative in a tailored black suit holding a framed square to their face"
                fill
                priority
                sizes="(max-width: 860px) 70vw, 46vw"
              />
            </div>
          </div>

          <ul className="about-metrics" data-reveal style={{ "--reveal-delay": "320ms" } as React.CSSProperties}>
            <li className="about-metric">
              <span className="about-metric-num">12+</span>
              <span className="about-metric-label">Years of experience</span>
            </li>
            <li className="about-metric">
              <span className="about-metric-num">80+</span>
              <span className="about-metric-label">Projects delivered</span>
            </li>
            <li className="about-metric">
              <span className="about-metric-num">30+</span>
              <span className="about-metric-label">Industry awards</span>
            </li>
            <li className="about-metric">
              <span className="about-metric-num">98%</span>
              <span className="about-metric-label">Client satisfaction</span>
            </li>
          </ul>
        </section>

        {/* ================= PROOF / TRUST ================= */}
        <section className="proof" aria-label="Trusted clients">
          <div className="container">
            <div className="logos" data-reveal>
              <span className="logos-label" id="logos-label">Trusted by teams at</span>
              <div className="logos-row" aria-labelledby="logos-label">
                <ul className="logos-track">
                  <li>
                    <a href="https://cesello.org/" target="_blank" rel="noreferrer">
                      Cesello
                    </a>
                  </li>
                  <li>
                    <a href="https://www.epoxycoatingco.com/" target="_blank" rel="noreferrer">
                      Socal Floor Coatings
                    </a>
                  </li>
                  <li>
                    <a href="https://www.praxisot.app/" target="_blank" rel="noreferrer">
                      Praxisot
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= LATEST PROJECTS ================= */}
        {/* Featured case study (01) + a four-up grid (02–05). Project names,
            scope, and taglines are client-supplied placeholders; case-study
            links stub to #work until real pages exist.
            TODO: real imagery for cards 03–05 and live case-study URLs. */}
        <section className="latest" id="work" aria-labelledby="latest-head">
          <div className="container">
            <div className="latest-top" data-reveal>
              <a className="latest-all" href="#work">
                View all projects <ArrowIcon />
              </a>
            </div>

            <div className="latest-head-row">
              <h2 className="latest-head" id="latest-head" data-reveal-heading>
                Latest<br />Projects
              </h2>
              <p className="latest-intro" data-reveal>
                Ideas we&apos;ve shaped into digital experiences.
              </p>
            </div>

            {/* Featured project */}
            <article className="feature" data-reveal>
              <div className="image-slot feature-media">
                <Image
                  src={PROJECT_NORTHBEAM_SRC}
                  alt="Northbeam — growth platform brand and launch system by Fellwind"
                  fill
                  loading="lazy"
                  sizes="(max-width: 860px) 100vw, 64vw"
                />
              </div>
              <div className="feature-meta">
                <span className="proj-num">01</span>
                <h3 className="proj-name">Northbeam</h3>
                <p className="proj-tag">Growth platform reinvented.</p>
                <hr className="proj-rule" />
                <dl className="proj-facts">
                  <div>
                    <dt>Scope</dt>
                    <dd>Strategy, Web Design, Development</dd>
                  </div>
                  <div>
                    <dt>Year</dt>
                    <dd>2024</dd>
                  </div>
                </dl>
                <a className="proj-link" href="#work">
                  View case study <ArrowIcon />
                </a>
              </div>
            </article>

            {/* 02–05 grid */}
            <ul className="proj-grid" data-reveal>
              <li className="proj-card">
                <div className="image-slot proj-card-media">
                  <Image
                    src={PROJECT_LUMEN_SRC}
                    alt="Lumen brand experience by Fellwind"
                    fill
                    loading="lazy"
                    sizes="(max-width: 860px) 50vw, 21vw"
                  />
                </div>
                <a className="proj-card-foot" href="#work">
                  <span className="proj-num">02</span>
                  <span className="proj-card-name">Lumen</span>
                  <span className="proj-card-tag">Brand experience.</span>
                  <ArrowIcon />
                </a>
              </li>
              <li className="proj-card">
                <div className="image-slot proj-card-media">
                  <Image
                    src={PROJECT_KESTREL_SRC}
                    alt="Kestrel product website by Fellwind"
                    fill
                    loading="lazy"
                    sizes="(max-width: 860px) 50vw, 21vw"
                  />
                </div>
                <a className="proj-card-foot" href="#work">
                  <span className="proj-num">03</span>
                  <span className="proj-card-name">Kestrel</span>
                  <span className="proj-card-tag">Product website.</span>
                  <ArrowIcon />
                </a>
              </li>
              <li className="proj-card">
                <div className="image-slot proj-card-media">
                  <Image
                    src={PROJECT_HALONYX_SRC}
                    alt="Halonyx digital identity website by Fellwind"
                    fill
                    loading="lazy"
                    sizes="(max-width: 860px) 50vw, 21vw"
                  />
                </div>
                <a className="proj-card-foot" href="#work">
                  <span className="proj-num">04</span>
                  <span className="proj-card-name">Halonyx</span>
                  <span className="proj-card-tag">Digital identity.</span>
                  <ArrowIcon />
                </a>
              </li>
              <li className="proj-card">
                <div className="image-slot proj-card-media">
                  <Image
                    src={PROJECT_VERDA_SRC}
                    alt="Verda web platform by Fellwind"
                    fill
                    loading="lazy"
                    sizes="(max-width: 860px) 50vw, 21vw"
                  />
                </div>
                <a className="proj-card-foot" href="#work">
                  <span className="proj-num">05</span>
                  <span className="proj-card-name">Verda</span>
                  <span className="proj-card-tag">Web platform.</span>
                  <ArrowIcon />
                </a>
              </li>
            </ul>
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

            <ul className="services-grid" data-reveal>
              {SERVICES.map((s, i) => (
                <li className="service-item" key={s.name}>
                  <a className="service-link" href="#contact">
                    <span className="service-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="service-text">
                      <span className="service-name">{s.name}</span>
                      <span className="service-desc">{s.desc}</span>
                    </span>
                    <span className="service-arrow"><ArrowIcon /></span>
                  </a>
                </li>
              ))}
            </ul>

          </div>
        </section>

        {/* ================= CLIENTS ================= */}
        {/* Split testimonial: copy on the left inset to the page gutter, photo
            bleeding full-height to the right viewport edge. */}
        <section className="clients" aria-labelledby="clients-title">
          <div className="clients-grid">
            <div className="clients-copy">
              <h2 className="clients-title" id="clients-title" data-reveal-heading>
                What our<br />customers say
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
            {/* Whole image, never cropped on his arm: rendered at natural ratio,
                anchored bottom-left and bled off the right edge so only his face
                runs off-screen while the entire arm stays in frame. */}
            <div className="clients-photo" data-reveal>
              <Image
                className="clients-cutout"
                src={CLIENTS_PHOTO_SRC}
                alt="Claus Jansson, CEO and founder of Northbeam, a Fellwind launch client, cupping a hand to his ear"
                width={1700}
                height={925}
                quality={90}
                loading="lazy"
                sizes="(max-width: 860px) 100vw, 85vw"
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
      {/* White footer stage with black lens interiors and the marble spectacle
          frame layered above the content. */}
      <footer className="footer footer--glasses">
        <div className="footer-stage">
          <div className="footer-lens-bg footer-lens-bg--left" aria-hidden="true" />
          <div className="footer-lens-bg footer-lens-bg--right" aria-hidden="true" />

          {/* Decorative frame served straight from /public as a CSS background
              (no next/image optimizer dependency, so it can't 404 in prod). */}
          <div className="footer-glasses-img" aria-hidden="true" />

          {/* LEFT lens — brand, contact, socials */}
          <div className="footer-lens footer-lens--left">
            <a className="footer-brand" href="#top" aria-label="Fellwind, back to top">
              <span className="footer-brand-slash" aria-hidden="true">/</span>
              <span className="footer-brand-name">Fellwind</span>
            </a>
            <address className="footer-contact">
              <p>Studio 4, 120 Harbour Road<br />Dublin, Ireland</p>
              <a href="mailto:info@fellwind.com">info@fellwind.com</a>
              <a href="tel:+35315550190">(+353) 1 555 0190</a>
            </address>
            <nav className="footer-socials" aria-label="Social links">
              <a href="https://instagram.com" aria-label="Fellwind on Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://x.com" aria-label="Fellwind on X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 3h2.7l-5.9 6.7L21 21h-5.4l-4.2-5.5L6.5 21H3.8l6.3-7.2L3 3h5.5l3.8 5.1L17.5 3zm-1 16h1.5L7.6 4.5H6L16.5 19z" /></svg>
              </a>
              <a href="https://youtube.com" aria-label="Fellwind on YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 4.9 12 4.9 12 4.9s-7 0-8.9.5A3 3 0 0 0 1 7.5 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.5zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" /></svg>
              </a>
            </nav>
          </div>

          {/* RIGHT lens — link columns, blurb, legal + CTA */}
          <div className="footer-lens footer-lens--right">
            <nav className="footer-links" aria-label="Footer navigation">
              <div>
                <h3>Menu</h3>
                <a href="#top">Home</a>
                <a href="#work">Work</a>
                <a href="#faq">Approach</a>
                <a href="#faq">FAQ</a>
              </div>
              <div>
                <h3>Services</h3>
                <a href="#services">Branding</a>
                <a href="#services">Web Design</a>
                <a href="#services">UI / UX</a>
                <a href="#services">Strategy</a>
              </div>
            </nav>
            <p className="footer-blurb">
              From branding to launch, our team is here to elevate your product
              and connect you with the audience it deserves.
            </p>
            <div className="footer-baseline">
              <a className="footer-legal-link" href="#faq">Terms &amp; Conditions</a>
              <a className="footer-legal-link" href="#faq">Privacy Policy</a>
              <a className="footer-start" href="#contact">Book a call</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
