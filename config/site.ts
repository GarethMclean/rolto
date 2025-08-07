import { SidebarNavItem, SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Rolto",
  description:
    "Transform any website into an intelligent helpdesk with Rolto's embeddable AI assistant. Get instant, context-aware answers from your content with just one line of code.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://twitter.com/rolto_ai",
  },
  mailSupport: "support@rolto.io",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      { title: "About", href: "#" },
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Features", href: "#features" },
      { title: "Pricing", href: "/pricing" },
      { title: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    items: [
      { title: "Contact", href: "mailto:contact@rolto.io" },
      { title: "Help Center", href: "#" },
    ],
  },
];
