import { FeatureLdg, InfoLdg, TestimonialType } from "types";

export const infos: InfoLdg[] = [
  {
    title: "AI-Powered Answers from Your Content",
    description:
      "Rolto scans and indexes your documentation, blog posts, FAQs, and PDFs to deliver precise, context-aware responses. No more generic answers—every response is drawn directly from your knowledge base.",
    image: "/_static/illustrations/work-from-home.jpg",
    list: [
      {
        title: "Retrieval-Augmented Generation",
        description: "Advanced vector search maps questions to your most relevant content.",
        icon: "search",
      },
      {
        title: "Multi-Source Learning",
        description: "Upload PDFs, connect docs, or paste content—Rolto learns from everything.",
        icon: "copy",
      },
      {
        title: "Context-Aware Responses",
        description: "Understands intent and delivers answers that feel human and helpful.",
        icon: "laptop",
      },
    ],
  },
  {
    title: "Seamless Integration, Instant Setup",
    description:
      "Add Rolto to your website with a single line of JavaScript or an iframe snippet. Customize the look, feel, and behavior to match your brand—no complex integrations or months of setup required.",
    image: "/_static/illustrations/work-from-home.jpg",
    list: [
      {
        title: "One-Line Installation",
        description: "Embed with a single script tag and customize instantly.",
        icon: "laptop",
      },
      {
        title: "Brand-Consistent Design",
        description: "Choose colors, avatar, name, and welcome message to match your brand.",
        icon: "settings",
      },
      {
        title: "Smart Escalation",
        description: "Hand off to human agents when AI confidence is low or you prefer oversight.",
        icon: "user",
      },
    ],
  },
];

export const features: FeatureLdg[] = [
  {
    title: "Embeddable AI Widget",
    description: "A fully branded, intelligent chatbot that integrates seamlessly with any website.",
    link: "/docs/installation",
    icon: "bot",
  },
  {
    title: "Content Indexing & Search",
    description: "Upload documents, connect knowledge bases, and let AI learn from your content.",
    link: "/docs/knowledge-base",
    icon: "search",
  },
  {
    title: "Human Handoff System",
    description: "Seamlessly escalate conversations to your support team when needed.",
    link: "/docs/handoff",
    icon: "user",
  },
  {
    title: "Real-Time Analytics",
    description: "Track top questions, satisfaction ratings, handoff rates, and content gaps.",
    link: "/docs/analytics",
    icon: "analytics",
  },
  {
    title: "Customizable Workflows",
    description: "Set conversation flows, pre-chat forms, and business rules without coding.",
    link: "/docs/workflows",
    icon: "settings",
  },
  {
    title: "Multi-Platform Support",
    description: "Works with your existing helpdesk, chat platforms, and CRM systems.",
    link: "/docs/integrations",
    icon: "laptop",
  },
];

export const testimonials: TestimonialType[] = [
  {
    name: "Michael Chen",
    job: "Head of Customer Success",
    image: "/_static/avatars/alexander-hipp-iEEBWgY_6lA-unsplash.jpg",
    review:
      "Rolto has transformed our support operations. We've reduced ticket volume by 40% while improving customer satisfaction. The AI handles routine questions perfectly, letting our team focus on complex issues.",
  },
  {
    name: "Aisha Johnson",
    job: "Product Manager",
    image: "/_static/avatars/christina-wocintechchat-com-SJvDxw0azqw-unsplash.jpg",
    review:
      "Setup took literally 5 minutes. Rolto indexed our entire knowledge base and started answering questions immediately. The retrieval accuracy is impressive—customers get relevant answers every time.",
  },
  {
    name: "James Rodriguez",
    job: "Marketing Director",
    image: "/_static/avatars/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.jpg",
    review:
      "Rolto's analytics helped us identify content gaps we never knew existed. We've improved our documentation based on what visitors actually ask, and conversion rates have increased by 25%.",
  },
  {
    name: "Sarah Williams",
    job: "Startup Founder",
    image: "/_static/avatars/christina-wocintechchat-com-lFntEHwQvi4-unsplash.jpg",
    review:
      "As a small team, we couldn't afford 24/7 support. Rolto gives us that capability without the overhead. The human handoff feature ensures complex issues still get personal attention.",
  },
  {
    name: "Marcus Davis",
    job: "E-commerce Manager",
    image: "/_static/avatars/clay-elliot-HfMCgqOLTyM-unsplash.jpg",
    review:
      "Rolto's brand customization is fantastic. It feels like a natural extension of our website. Customers don't even realize they're talking to AI until they get instant, accurate answers.",
  },
  {
    name: "Priya Patel",
    job: "Technical Lead",
    image: "/_static/avatars/zoran-borojevic-4BG2yKyCaWg-unsplash.jpg",
    review:
      "The API integration was straightforward, and the documentation is excellent. We've connected Rolto to our existing systems without any disruption to our workflow.",
  },
  {
    name: "David Kim",
    job: "Customer Experience Lead",
    image: "/_static/avatars/ryan-hoffman-Ft4p5E9HjTQ-unsplash.jpg",
    review:
      "What sets Rolto apart is the balance of power and simplicity. It's enterprise-grade AI that doesn't require a data science team or months of setup. Just works.",
  },
];