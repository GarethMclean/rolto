import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/dashboard/",
          "/auth/",
          "/protected/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/dashboard/",
          "/auth/",
          "/protected/",
        ],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/dashboard/",
          "/auth/",
          "/protected/",
        ],
      },
    ],
    sitemap: "https://rolto.io/sitemap.xml",
    host: "https://rolto.io",
  };
}
