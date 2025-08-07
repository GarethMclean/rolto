export const BLOG_CATEGORIES: {
  title: string;
  slug: "customer-support" | "ai-chatbots" | "lead-generation" | "industry-insights";
  description: string;
}[] = [
  {
    title: "Customer Support",
    slug: "customer-support",
    description: "Strategies and insights for improving customer support with AI.",
  },
  {
    title: "AI Chatbots",
    slug: "ai-chatbots",
    description: "Latest developments and best practices in AI-powered chatbots.",
  },
  {
    title: "Lead Generation",
    slug: "lead-generation",
    description: "How chatbots can transform your lead generation and conversion rates.",
  },
  {
    title: "Industry Insights",
    slug: "industry-insights",
    description: "Analysis and trends in the customer support and chatbot industry.",
  },
];

export const BLOG_AUTHORS = {
  gareth: {
    name: "Gareth McLean",
    image: "/_static/avatars/gareth.png", // Will use PNG when available, falls back to SVG
    twitter: "garethmclean",
    title: "Founder & CEO at Rolto",
  },
  team: {
    name: "Rolto Team",
    image: "/_static/avatars/rolto-team.svg",
    twitter: "rolto_ai",
    title: "The team behind Rolto",
  },
};
