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
    question: "What is the cost of the free plan?",
    answer:
      "Our free plan is completely free, with no monthly or annual charges. It's a great way to get started and explore our basic AI customer support features.",
  },
  {
    id: "item-2",
    question: "How much does the Starter plan cost?",
    answer:
      "The Starter plan is priced at $29 per month or $290 per year (save 17%). It provides access to advanced features including custom branding, human handoff, and up to 1,000 AI conversations per month.",
  },
  {
    id: "item-3",
    question: "What is the price of the Professional plan?",
    answer:
      "The Professional plan is available for $99 per month or $990 per year (save 17%). It offers unlimited document uploads, multi-website deployment, API access, and up to 10,000 AI conversations per month.",
  },
  {
    id: "item-4",
    question: "Do you offer any annual subscription plans?",
    answer:
      "Yes, we offer annual subscription plans with significant savings. The Starter Annual plan is $290 per year (save $58), and the Professional Annual plan is $990 per year (save $198).",
  },
  {
    id: "item-5",
    question: "Is there a trial period for the paid plans?",
    answer:
      "We offer a 14-day free trial for both the Starter and Professional plans. It's a great way to experience all the features before committing to a paid subscription.",
  },
  {
    id: "item-6",
    question: "What happens if I exceed my monthly AI conversation limit?",
    answer:
      "If you exceed your monthly limit, you can upgrade to the next tier or contact us at contact@rolto.io to discuss custom pricing for higher usage.",
  },
  {
    id: "item-7",
    question: "Can I change my plan at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.",
  },
  {
    id: "item-8",
    question: "What kind of support do you offer?",
    answer:
      "Free plan users get community support, Starter plan users get email support, and Professional plan users get priority support. Enterprise customers get 24/7 dedicated support.",
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
