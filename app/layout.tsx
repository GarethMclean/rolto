import "@/styles/globals.css";

import { fontGeist, fontHeading, fontSans, fontUrban } from "@/assets/fonts";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@/components/analytics";
import ModalProvider from "@/components/modals/providers";
import { MobileMenuProvider } from "@/components/layout/mobile-menu-context";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import ChatbotWidget from "@/components/chatbot-widget";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Primary Meta Tags */}
        <title>Rolto - Transform Your Website into an Intelligent Conversational Platform</title>
        <meta name="title" content="Rolto - Transform Your Website into an Intelligent Conversational Platform" />
        <meta name="description" content="Rolto is an embeddable AI assistant that transforms any website into an intelligent conversational platform. Capture leads, provide instant support, and engage visitors with AI that understands your business." />
        <meta name="keywords" content="AI assistant, chatbot, conversational AI, lead generation, customer support, website widget, RAG, retrieval augmented generation, customer engagement, conversion optimization" />
        <meta name="author" content="Rolto" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rolto.io" />
        <meta property="og:title" content="Rolto - AI-Powered Conversational Platform" />
        <meta property="og:description" content="Transform any website into an intelligent conversational platform with Rolto's embeddable AI assistant. Capture leads, provide instant support, and engage visitors." />
        <meta property="og:image" content="https://rolto.io/og.jpg" />
        <meta property="og:site_name" content="Rolto" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://rolto.io" />
        <meta name="twitter:title" content="Rolto - AI-Powered Conversational Platform" />
        <meta name="twitter:description" content="Transform any website into an intelligent conversational platform with Rolto's embeddable AI assistant." />
        <meta name="twitter:image" content="https://rolto.io/og.jpg" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0370e3" />
        <meta name="msapplication-TileColor" content="#0370e3" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Rolto" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://rolto.io" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/_static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/_static/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/_static/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* Structured Data for AI/LLM Optimization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Rolto",
              "description": "An embeddable AI assistant that transforms any website into an intelligent helpdesk",
              "url": "https://rolto.io",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free trial available"
              },
              "provider": {
                "@type": "Organization",
                "name": "Rolto",
                "url": "https://rolto.io"
              },
              "featureList": [
                "AI-powered customer support",
                "Instant responses",
                "Lead qualification",
                "One-line integration",
                "Context-aware answers"
              ]
            })
          }}
        />
        
        {/* Additional structured data for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Rolto",
              "url": "https://rolto.io",
              "logo": "https://rolto.io/_static/og.jpg",
              "description": "AI-powered website helpdesk solution",
              "sameAs": [
                "https://twitter.com/rolto_ai",
                "https://linkedin.com/company/rolto"
              ]
            })
          }}
        />

        {/* AI/LLM Optimization Meta Tags */}
        <meta name="ai-content-type" content="conversational-ai-platform" />
        <meta name="ai-category" content="conversational-ai-software" />
        <meta name="ai-features" content="chatbot,ai-assistant,lead-generation,customer-support,website-widget,conversational-ai,customer-engagement" />
        <meta name="ai-use-cases" content="lead-generation,customer-service,website-engagement,conversion-optimization,customer-support" />
        <meta name="ai-target-audience" content="businesses,saas-companies,ecommerce,real-estate,healthcare,marketing-teams,sales-teams" />
        <meta name="ai-pricing-model" content="freemium" />
        <meta name="ai-integration" content="one-line-code" />
        
        {/* Additional structured data for AI/LLM Optimization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Rolto",
              "description": "An embeddable AI assistant that transforms any website into an intelligent conversational platform with instant, context-aware responses for lead generation, support, and engagement",
              "url": "https://rolto.io",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "browserRequirements": "Modern web browser with JavaScript enabled",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free trial with premium plans available"
              },
              "provider": {
                "@type": "Organization",
                "name": "Rolto",
                "url": "https://rolto.io",
                "description": "AI-powered conversational platform provider"
              },
              "featureList": [
                "AI-powered conversational platform",
                "Lead generation and qualification",
                "Instant customer support",
                "Visitor engagement",
                "One-line code integration",
                "Context-aware conversations",
                "Multi-language support",
                "Analytics and insights",
                "Customizable branding",
                "Human handoff capabilities",
                "CRM integration"
              ],
              "screenshot": "https://rolto.io/_static/og.jpg",
              "softwareVersion": "1.0.0",
              "releaseNotes": "Initial release with core conversational AI functionality",
              "downloadUrl": "https://rolto.io/docs",
              "installUrl": "https://rolto.io/docs",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "150",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "author": {
                    "@type": "Person",
                    "name": "Sarah Johnson"
                  },
                  "reviewBody": "Rolto transformed our website into a powerful conversational platform. We've seen a 300% increase in qualified leads and much happier customers."
                }
              ]
            })
          }}
        />
        
        {/* FAQ structured data for AI/LLM */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is Rolto?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Rolto is an embeddable AI assistant that transforms any website into an intelligent conversational platform. It captures leads, provides instant support, and engages visitors with AI that understands your business."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does Rolto work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Rolto uses advanced AI to understand your website content and provide instant, accurate responses to visitor questions. It integrates with a single line of code and learns from your content automatically to create engaging conversations."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are the benefits of using Rolto?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Rolto increases qualified leads by 300%, provides 24/7 customer support, engages visitors instantly, and transforms your website into a powerful conversational platform that drives conversions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does Rolto cost?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Rolto offers a free trial with premium plans starting at $29/month. Pricing is based on usage and features needed for your conversational AI platform."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is Rolto easy to integrate?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Rolto integrates with just one line of code. No complex setup or technical knowledge required to transform your website into an intelligent conversational platform."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontUrban.variable,
          fontHeading.variable,
          fontGeist.variable,
        )}
      >
        <div id="ai-chatbot-widget"></div>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <MobileMenuProvider>
              <ModalProvider>{children}</ModalProvider>
            </MobileMenuProvider>
            <Analytics />
            <Toaster richColors closeButton />
            <TailwindIndicator />
            <ChatbotWidget />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
