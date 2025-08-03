"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { toast } from "sonner";

// Add type definition for window.AIChatbot
declare global {
  interface Window {
    AIChatbot?: {
      init: (config: { 
        chatbotId: string; 
        position: string; 
        theme: string;
        containerSelector?: string;
      }) => void;
      destroy?: () => void;
    };
  }
}

export default function PreviewLanding() {
  const [showIframe, setShowIframe] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");

  // Clean up chatbot and remove script on unmount
  useEffect(() => {
    return () => {
      if (window.AIChatbot?.destroy) {
        window.AIChatbot.destroy();
      }
      const scripts = document.querySelectorAll('script[src*="widget.js"]');
      scripts.forEach((s) => s.remove());
    };
  }, []);

  // Inject chatbot widget script dynamically once iframe is shown
  useEffect(() => {
    if (!showIframe) return;

    const existingScript = document.querySelector('script[src="https://app.rolto.io/widget.js"]');
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://app.rolto.io/widget.js";
    script.async = true;
    script.onload = () => {
      window.AIChatbot?.init({
        chatbotId: "cb_1dd521c7",
        position: "bottom-right",
        theme: "light",
        containerSelector: "#preview-container",
      });
    };
    document.body.appendChild(script);
  }, [showIframe]);

  const handleSubmit = () => {
    if (!inputUrl) return;

    let url = inputUrl.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }
    url = url.replace(/\/+$/, "");

    try {
      new URL(url);
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

      fetch(proxyUrl)
        .then((response) => {
          if (!response.ok) throw new Error("Proxy failed");
          setWebsiteUrl(proxyUrl);
          setShowIframe(true);
        })
        .catch(() => {
          // If proxy fails, try direct URL
          setWebsiteUrl(url);
          setShowIframe(true);
        });
    } catch (err) {
      toast.error("Please enter a valid website URL");
    }
  };

  const handleIframeError = () => {
    toast.error(
      "Unable to load website. This might be due to security restrictions. Try another website or check the URL."
    );
    setShowIframe(false);
  };

  return (
    <div className="pb-6 sm:pb-16">
      <MaxWidthWrapper>
        <div className="rounded-xl h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] lg:h-[calc(100vh-6rem)] border border-gray-200 dark:border-gray-800 bg-background shadow-sm">
          <div id="preview-container" className="relative size-full overflow-hidden rounded-xl">
            {showIframe && websiteUrl ? (
              <div className="relative size-full iframe-container">
                <iframe
                  src={websiteUrl}
                  className="absolute inset-0 size-full"
                  allow="fullscreen"
                  onError={handleIframeError}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
                />
                {/* AI Chatbot Widget (rendered inside this container via script) */}
                <div
                  id="ai-chatbot-widget"
                  className="absolute bottom-4 right-4 z-[100] pointer-events-auto"
                />
                {/* Button container */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="hover:text-primary-foreground hover:bg-primary"
                    onClick={() => {
                      setShowIframe(false);
                      setWebsiteUrl("");
                      if (window.AIChatbot?.destroy) {
                        window.AIChatbot.destroy();
                      }
                    }}
                  >
                    Try Another Website
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative size-full">
                {/* Blurred website placeholder */}
                <div
                  className="absolute inset-0 bg-cover bg-center blur-sm opacity-50"
                  style={{
                    backgroundImage: "url('/placeholder-website.png')",
                    filter: "grayscale(1)",
                  }}
                />

                {/* URL input overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/30 p-6 backdrop-blur-sm">
                  <div className="w-full max-w-md space-y-4">
                    <Input
                      type="url"
                      placeholder="Enter your website URL (e.g., example.com)"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      className="h-12 bg-white/10 text-lg"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSubmit();
                      }}
                    />
                    <Button
                      className="w-full h-12 text-lg"
                      variant="default"
                      onClick={handleSubmit}
                    >
                      Try Demo on Your Website
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Note: Some websites may not allow embedding due to security
                    restrictions
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
