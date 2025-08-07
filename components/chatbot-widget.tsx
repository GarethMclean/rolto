"use client";

import { useEffect } from "react";

export default function ChatbotWidget() {
  useEffect(() => {
    if (typeof window !== "undefined") {
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
      };
      document.head.appendChild(script);
    }
  }, []);

  return null;
} 