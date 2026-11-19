import type { MetadataRoute } from "next";

// Demo build: disallow everything. Switch to `allow: "/"` at launch.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
