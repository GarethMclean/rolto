import Head from "next/head";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  noIndex?: boolean;
  noFollow?: boolean;
}

export function SEOHead({
  title = "Rolto - Transform Your Website into an Intelligent Conversational Platform",
  description = "Rolto is an embeddable AI assistant that transforms any website into an intelligent conversational platform. Capture leads, provide instant support, and engage visitors with AI that understands your business.",
  keywords = "AI assistant, chatbot, conversational AI, lead generation, customer support, website widget, RAG, retrieval augmented generation, customer engagement, conversion optimization",
  canonical = "https://rolto.io",
  ogImage = "https://rolto.io/og.jpg",
  ogType = "website",
  structuredData,
  noIndex = false,
  noFollow = false,
}: SEOHeadProps) {
  const robotsContent = noIndex || noFollow 
    ? `${noIndex ? 'noindex' : 'index'},${noFollow ? 'nofollow' : 'follow'}`
    : 'index, follow';

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Rolto" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@rolto_ai" />
      <meta name="twitter:site" content="@rolto_ai" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {/* AI/LLM Optimization */}
      <meta name="ai-content-type" content="conversational-ai-platform" />
      <meta name="ai-category" content="conversational-ai-software" />
      <meta
        name="ai-features"
        content="chatbot,ai-assistant,lead-generation,customer-support,website-widget,conversational-ai,customer-engagement,rag,retrieval-augmented-generation"
      />
      <meta
        name="ai-use-cases"
        content="lead-generation,customer-service,website-engagement,conversion-optimization,customer-support,ai-chatbot,conversational-commerce"
      />
      <meta name="ai-industry" content="saas,technology,ai,conversational-ai" />
      <meta name="ai-target-audience" content="businesses,startups,enterprises,website-owners" />
    </Head>
  );
} 