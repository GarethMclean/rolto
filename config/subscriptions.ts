import { PlansRow, SubscriptionPlan } from "types";
import { env } from "@/env.mjs";

export const pricingData: SubscriptionPlan[] = [
  {
    title: "Free",
    description: "Perfect for getting started",
    benefits: [
      "Up to 100 AI conversations/month",
      "Basic analytics dashboard",
      "Upload 1 document (up to 10MB)",
      "Embed on 1 website",
      "Standard support",
      "Basic chat widget",
    ],
    limitations: [
      "No custom branding",
      "No human handoff",
      "No API access",
      "Limited to 1 team member",
    ],
    prices: {
      monthly: 0,
      yearly: 0,
    },
    stripeIds: {
      monthly: null,
      yearly: null,
    },
  },
  {
    title: "Starter",
    description: "For growing businesses",
    benefits: [
      "Up to 1,000 AI conversations/month",
      "Advanced analytics & insights",
      "Custom branding & styling",
      "Upload up to 10 documents",
      "Human handoff capability",
      "Email support",
      "Up to 3 team members",
      "Custom chat workflows",
    ],
    limitations: [
      "Embed on 1 website",
      "Basic team roles",
      "No API access",
    ],
    prices: {
      monthly: 29,
      yearly: 278,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    },
  },
  {
    title: "Professional",
    description: "For established teams",
    benefits: [
      "Up to 10,000 AI conversations/month",
      "Full analytics suite with exports",
      "Unlimited document uploads",
      "Multi-website deployment",
      "Advanced team management",
      "Priority support",
      "API access",
      "Unlimited team members",
      "Advanced workflows",
      "Custom integrations",
    ],
    limitations: [],
    prices: {
      monthly: 99,
      yearly: 950,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
    },
  },
];

export const plansColumns = [
  "free",
  "starter",
  "professional",
  "enterprise",
] as const;

export const comparePlans: PlansRow[] = [
  {
    feature: "Monthly AI Conversations",
    free: "100",
    starter: "1,000",
    professional: "10,000",
    enterprise: "Custom",
  },
  {
    feature: "Analytics Dashboard",
    free: "Basic",
    starter: "Advanced",
    professional: "Full Suite",
    enterprise: "Custom",
  },
  {
    feature: "Document Uploads",
    free: "1 doc (10MB)",
    starter: "10 docs",
    professional: "Unlimited",
    enterprise: "Unlimited",
  },
  {
    feature: "Custom Branding",
    free: null,
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    feature: "Multi-Website Deployment",
    free: "1 site",
    starter: "1 site",
    professional: "Unlimited",
    enterprise: "Unlimited",
  },
  {
    feature: "Human Handoff",
    free: null,
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    feature: "Team Members",
    free: "1 user",
    starter: "Up to 3",
    professional: "Unlimited",
    enterprise: "Custom",
  },
  {
    feature: "API Access",
    free: null,
    starter: null,
    professional: true,
    enterprise: true,
  },
  {
    feature: "Support",
    free: "Community",
    starter: "Email",
    professional: "Priority",
    enterprise: "24/7",
  },
  {
    feature: "Custom Workflows",
    free: null,
    starter: "Basic",
    professional: "Advanced",
    enterprise: "Custom",
  },
  {
    feature: "Custom Integrations",
    free: null,
    starter: null,
    professional: true,
    enterprise: true,
  },
];
