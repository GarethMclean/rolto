"use client";

import { useEffect } from "react";

// Global flag to track if the widget has been loaded
let widgetLoaded = false;

export default function ChatbotWidget() {
  useEffect(() => {
    if (typeof window !== "undefined" && !widgetLoaded) {
      // Check if the widget is already initialized
      if (window.AIChatbot) {
        widgetLoaded = true;
        return;
      }

      // Check if the script is already in the DOM
      const existingScript = document.querySelector(
        'script[src="https://chat-to-eight.vercel.app/widget.js"]',
      );
      if (existingScript) {
        widgetLoaded = true;
        return;
      }

      // Demo Rolto widget - replace with actual Rolto widget when available
      const script = document.createElement("script");
      script.src = "https://chat-to-eight.vercel.app/widget.js";
      script.onload = function () {
        // @ts-ignore
        window.AIChatbot?.init({
          chatbotId: "cb_49a4cf98",
          position: "bottom-right",
          theme: "light",
        });
        widgetLoaded = true;

        // Dynamically modify chat bubble styling after widget loads
        setTimeout(() => {
          const style = document.createElement('style');
          style.textContent = `
            /* Force external chat widget bubbles to be wider and shorter */
            #ai-chatbot-widget *,
            [data-widget="chat"] *,
            .chat-widget *,
            iframe[src*="chat"] *,
            div[class*="chat"] *,
            div[class*="message"] *,
            div[class*="bubble"] * {
              max-width: 280px !important;
              min-width: 200px !important;
              width: auto !important;
              height: auto !important;
              min-height: auto !important;
              max-height: none !important;
              padding: 8px 16px !important;
              border-radius: 20px !important;
              display: inline-block !important;
              white-space: normal !important;
              word-wrap: break-word !important;
              line-height: 1.4 !important;
            }
            
            @media (max-width: 768px) {
              #ai-chatbot-widget *,
              [data-widget="chat"] *,
              .chat-widget *,
              iframe[src*="chat"] *,
              div[class*="chat"] *,
              div[class*="message"] *,
              div[class*="bubble"] * {
                max-width: 240px !important;
                min-width: 180px !important;
                padding: 6px 12px !important;
              }
            }
          `;
          document.head.appendChild(style);
        }, 1000); // Wait 1 second for widget to fully load
      };
      document.head.appendChild(script);
    }
  }, []);

  return null;
}
