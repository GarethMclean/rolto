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
      };
      document.head.appendChild(script);
    }
  }, []);

  return null;
}
