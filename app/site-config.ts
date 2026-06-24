// Single source of truth for brand identity, used by metadata, JSON-LD
// schema, sitemap, and robots so "Fellwind" + URLs stay consistent.
//
// ⚠️ BEFORE LAUNCH:
//   1. Set SITE_URL to your real production domain (must contain "fellwind").
//   2. Replace the SOCIALS URLs with your actual profile links - these become
//      the schema `sameAs` array that tells Google your brand identity.

export const SITE_URL = "https://fellwind.com"; // TODO: set to your real domain
export const SITE_NAME = "Fellwind";

export const SITE_TAGLINE = "Brand & Launch Studio for Product Companies";

export const SITE_DESCRIPTION =
  "Fellwind is a brand and launch studio building identity systems and launch campaigns for product companies.";

// TODO: replace with your real profile URLs before launch.
export const SOCIALS = {
  facebook: "https://www.facebook.com/fellwind",
  x: "https://x.com/fellwind",
  instagram: "https://www.instagram.com/fellwind",
  linkedin: "https://www.linkedin.com/company/fellwind",
};

export const SAME_AS = Object.values(SOCIALS);
