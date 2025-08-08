export const seoConfig = {
  default: {
    title: "Rolto - Transform Your Website into an Intelligent Conversational Platform",
    description: "Rolto is an embeddable AI assistant that transforms any website into an intelligent conversational platform. Capture leads, provide instant support, and engage visitors with AI that understands your business.",
    keywords: "AI assistant, chatbot, conversational AI, lead generation, customer support, website widget, RAG, retrieval augmented generation, customer engagement, conversion optimization",
    canonical: "https://rolto.io",
    ogImage: "https://rolto.io/og.jpg",
  },
  pages: {
    home: {
      title: "Rolto - Transform Your Website into an Intelligent Conversational Platform",
      description: "Transform any website into an intelligent conversational platform with Rolto's embeddable AI assistant. Capture leads, provide instant support, and engage visitors with AI that understands your business.",
      keywords: "AI assistant, chatbot, conversational AI, lead generation, customer support, website widget, RAG, retrieval augmented generation",
      canonical: "https://rolto.io",
    },
    pricing: {
      title: "Pricing – Rolto",
      description: "Simple, transparent pricing for Rolto's AI-powered conversational platform. Start with a 14-day free trial, then choose from Starter, Pro, Vertical Pro, or Enterprise plans.",
      keywords: "Rolto pricing, AI chatbot pricing, conversational AI pricing, chatbot cost, AI assistant pricing",
      canonical: "https://rolto.io/pricing",
    },
    blog: {
      title: "Blog – Rolto",
      description: "Latest insights on AI chatbots, conversational AI, lead generation, and customer support automation. Learn how to transform your website with intelligent AI assistants.",
      keywords: "AI chatbot blog, conversational AI, lead generation, customer support, AI automation, chatbot tips",
      canonical: "https://rolto.io/blog",
    },
    docs: {
      title: "Documentation – Rolto",
      description: "Complete documentation for Rolto's AI conversational platform. Learn how to integrate, configure, and optimize your AI assistant for maximum engagement.",
      keywords: "Rolto documentation, AI chatbot setup, conversational AI integration, chatbot configuration",
      canonical: "https://rolto.io/docs",
    },
  },
};

export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rolto",
    url: "https://rolto.io",
    logo: "https://rolto.io/_static/og.jpg",
    description: "AI-powered conversational platform that transforms websites into intelligent helpdesks",
    sameAs: [
      "https://twitter.com/rolto_ai",
      "https://linkedin.com/company/rolto",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contact@rolto.io",
    },
  },
  softwareApplication: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Rolto",
    description: "An embeddable AI assistant that transforms any website into an intelligent conversational platform",
    url: "https://rolto.io",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "14-day free trial with premium plans starting at $15/month",
    },
    provider: {
      "@type": "Organization",
      name: "Rolto",
      url: "https://rolto.io",
    },
    featureList: [
      "AI-powered customer support",
      "Instant responses",
      "Lead qualification",
      "One-line integration",
      "Context-aware answers",
      "Custom branding",
      "Analytics dashboard",
      "Workflow automation",
      "Agent handoff",
      "External integrations",
    ],
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rolto",
    url: "https://rolto.io",
    description: "AI-powered conversational platform for websites",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://rolto.io/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  breadcrumbList: (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
  article: (article: {
    title: string;
    description: string;
    author: string;
    publishedDate: string;
    modifiedDate: string;
    image: string;
    url: string;
  }) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Rolto",
      logo: {
        "@type": "ImageObject",
        url: "https://rolto.io/_static/og.jpg",
      },
    },
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate,
    image: article.image,
    url: article.url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  }),
  faqPage: (faqs: Array<{ question: string; answer: string }>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }),
};

export const aiOptimization = {
  contentTypes: [
    "conversational-ai-platform",
    "ai-chatbot-software",
    "customer-support-automation",
    "lead-generation-tool",
  ],
  categories: [
    "conversational-ai-software",
    "customer-support-software",
    "lead-generation-software",
    "website-optimization-tool",
  ],
  features: [
    "chatbot",
    "ai-assistant",
    "lead-generation",
    "customer-support",
    "website-widget",
    "conversational-ai",
    "customer-engagement",
    "rag",
    "retrieval-augmented-generation",
    "workflow-automation",
    "agent-handoff",
    "analytics",
  ],
  useCases: [
    "lead-generation",
    "customer-service",
    "website-engagement",
    "conversion-optimization",
    "customer-support",
    "ai-chatbot",
    "conversational-commerce",
    "24-7-support",
    "instant-responses",
  ],
  industries: [
    "saas",
    "technology",
    "ai",
    "conversational-ai",
    "ecommerce",
    "healthcare",
    "finance",
    "education",
    "real-estate",
  ],
  targetAudience: [
    "businesses",
    "startups",
    "enterprises",
    "website-owners",
    "marketing-teams",
    "customer-support-teams",
    "developers",
    "product-managers",
  ],
}; 