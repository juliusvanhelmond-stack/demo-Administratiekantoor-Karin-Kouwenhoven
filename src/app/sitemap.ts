import type { MetadataRoute } from "next";
import { business } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/diensten", "/over-karin", "/tarieven", "/contact", "/handige-links"].map((p) => ({
    url: `${business.url}${p}`,
  }));
}
