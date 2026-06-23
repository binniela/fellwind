import type { MetadataRoute } from "next";
import { SITE_URL } from "./site-config";

// Generates /robots.txt - allow full crawling (search + AI crawlers).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
