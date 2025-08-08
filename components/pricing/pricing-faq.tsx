import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { HeaderSection } from "../shared/header-section";

const pricingFaqData = [
  {
    id: "item-1",
    question: "What is included in the 14-day trial?",
    answer:
      "Our 14-day trial includes 250 AI conversations, 1 website, basic chat widget, basic analytics, and standard support. No credit card is required to start your trial. After 14 days, you'll need to upgrade to a paid plan to continue using Rolto. Trial limitations include Rolto logo, no integrations, and 1 document upload.",
  },
  {
    id: "item-2",
    question: "How much does the Starter plan cost?",
    answer:
      "The Starter plan is priced at $15 per month or $144 per year (save 20%). It includes 1,000 AI conversations per month, 1 website, 1 document upload, basic customization, email transcript export, basic analytics, basic chat widget, and standard support.",
  },
  {
    id: "item-3",
    question: "What is the price of the Pro plan?",
    answer:
      "The Pro plan is available for $39 per month or $374 per year (save 20%). It offers 5,000 AI conversations per month, 3 websites, 5 document uploads, custom branding, analytics, agent handoff, external integrations, custom chat widget, workflow automation, and priority support.",
  },
  {
    id: "item-4",
    question: "What does the Vertical Pro plan include?",
    answer:
      "The Vertical Pro plan costs $79 per month or $758 per year (save 20%). It includes 20,000 AI conversations per month, unlimited websites, 20 document uploads, industry templates, advanced analytics, agent handoff, automation triggers, SMS/email follow-ups, custom chat widget, advanced workflow automation, and priority support.",
  },
  {
    id: "item-5",
    question: "Do you offer annual subscription plans?",
    answer:
      "Yes, we offer annual subscription plans with significant savings. The Starter Annual plan is $144 per year (save $36), the Pro Annual plan is $374 per year (save $94), and the Vertical Pro Annual plan is $758 per year (save $190). All annual plans include a 20% discount compared to monthly pricing.",
  },
  {
    id: "item-6",
    question: "What happens if I exceed my monthly AI conversation limit?",
    answer:
      "All plans allow overage purchases at $5 per additional 1,000 messages. You can purchase overages directly from your dashboard, or upgrade to the next tier for more included messages.",
  },
  {
    id: "item-7",
    question: "Can I change my plan at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments. You can also cancel your subscription at any time.",
  },
  {
    id: "item-8",
    question: "What kind of support do you offer?",
    answer:
      "Trial users get standard support, Starter plan users get standard support, Pro and Vertical Pro users get priority support, and Enterprise customers get 24/7 dedicated support with SLAs.",
  },
  {
    id: "item-9",
    question: "What is included in the Enterprise plan?",
    answer:
      "The Enterprise plan starts at $249 per month with custom annual pricing. It includes 75,000+ AI conversations per month, white-labeling, SLAs, API access, agent handoff, custom integrations, compliance logging, custom chat widget, and 24/7 priority support.",
  },
  {
    id: "item-10",
    question: "Do you offer industry-specific templates?",
    answer:
      "Yes, our Vertical Pro and Enterprise plans include industry templates for various sectors. We also offer paid add-on template packs for niche industries that can be purchased separately.",
  },
];

export function PricingFaq() {
  return (
    <section className="container max-w-4xl py-2">
      <HeaderSection
        label="FAQ"
        title="Frequently Asked Questions"
        subtitle="Explore our comprehensive FAQ to find quick answers to common
          inquiries. If you need further assistance, don't hesitate to
          contact us at contact@rolto.io for personalized help."
      />

      <Accordion type="single" collapsible className="my-12 w-full">
        {pricingFaqData.map((faqItem) => (
          <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{faqItem.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground sm:text-[15px]">
              {faqItem.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
