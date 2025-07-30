import { PlansRow, SubscriptionPlan } from "types";
import { env } from "@/env.mjs";

export const pricingData: SubscriptionPlan[] = [
  {
    title: "Starter",
    description: "For small teams or solo builders",
    benefits: [
      "Up to 1,000 chatbot messages/month",
      "Basic analytics",
      "Upload 1 Document",
      "Embed on 1 website",
    ],
    limitations: [
      "No custom branding",
      "No document uploads",
      "No agent handoff",
    ],
    prices: {
      monthly: 9,
      yearly: 99,
    },
    stripeIds: {
      monthly: null,
      yearly: null,
    },
  },
  {
    title: "Pro",
    description: "For growing teams",
    benefits: [
      "Up to 5,000 chatbot messages/month",
      "Advanced analytics",
      "Custom branding",
      "Upload up to 5 documents",
      "Agent handoff",
    ],
    limitations: [
      "Embed on 1 website",
      "Limited team roles",
    ],
    prices: {
      monthly: 19,
      yearly: 199,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    },
  },
  {
    title: "Business",
    description: "For businesses & agencies",
    benefits: [
      "Unlimited chatbot messages",
      "Full analytics suite",
      "Unlimited document uploads",
      "Unlimited branding and customizations",
      "Team management & roles",
      "Priority support",
    ],
    limitations: [],
    prices: {
      monthly: 99,
      yearly: 999,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
    },
  },
];

export const plansColumns = [
  "starter",
  "pro",
  "business",
  "enterprise",
] as const;

export const comparePlans: PlansRow[] = [
  {
    feature: "Monthly Message Limit",
    starter: "1,000",
    pro: "5,000",
    business: "Unlimited",
    enterprise: "Custom",
  },
  {
    feature: "Analytics Dashboard",
    starter: true,
    pro: true,
    business: true,
    enterprise: true,
  },
  {
    feature: "Document Uploads",
    starter: null,
    pro: "5 Docs",
    business: "Unlimited",
    enterprise: "Unlimited",
  },
  {
    feature: "Custom Branding",
    starter: null,
    pro: true,
    business: true,
    enterprise: true,
  },
  {
    feature: "Embed on Multiple Sites",
    starter: "1 site",
    pro: "3 site",
    business: "Unlimited",
    enterprise: "Unlimited",
  },
  {
    feature: "AI + Human Handoff",
    starter: null,
    pro: true,
    business: true,
    enterprise: true,
  },
  {
    feature: "Team Members & Roles",
    starter: null,
    pro: "Basic",
    business: "Advanced",
    enterprise: "Custom",
  },
  {
    feature: "Priority Support",
    starter: null,
    pro: "Email",
    business: "Email & Chat",
    enterprise: "24/7",
  },
  {
    feature: "API Access",
    starter: null,
    pro: "Standard",
    business: "Full",
    enterprise: "Full",
  },
  {
    feature: "Onboarding & Setup",
    starter: "Self-service",
    pro: "Self-service",
    business: "Assisted",
    enterprise: "Full Service",
  },
];
