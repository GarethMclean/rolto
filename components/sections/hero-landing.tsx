"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ModalContext } from "@/components/modals/providers";
import { Icons } from "@/components/shared/icons";

interface ChatBubble {
  id: number;
  message: string;
  x: number;
  y: number;
  isDragging: boolean;
  isFalling: boolean;
  isBouncing: boolean;
  hasLanded: boolean;
  velocity: number;
  rotation: number;
  scale: number;
  opacity: number;
  bounceCount: number;
  finalX: number;
  finalY: number;
}

const chatMessages = [
  "🚀 Ready to capture more leads?",
  "💬 Need help with your order?",
  "🎯 Want to see our pricing?",
  "✨ Transform your website today!",
  "🤖 AI that actually understands you",
  "📈 Boost your conversion rates",
  "⚡ Setup in under 5 minutes",
  "🎉 Join 10,000+ happy customers",
  "💡 Get instant customer support",
  "🔧 One line of code integration",
  "📱 Works on all devices",
  "🌙 24/7 AI assistance",
  "🎨 Customize to match your brand",
  "📊 Real-time analytics included",
  "🔒 Enterprise-grade security",
  "🚀 Start your free trial today",
  "💼 Perfect for any business size",
  "🎯 Increase customer engagement",
  "⚡ Lightning-fast responses",
  "🌟 Rated #1 in customer satisfaction",
];

export default function HeroLanding() {
  const [chatBubbles, setChatBubbles] = useState<ChatBubble[]>([]);
  const [draggedBubble, setDraggedBubble] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { setShowLeadCaptureModal } = useContext(ModalContext);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const startWaterDropAnimation = useCallback(
    (bubbleId: number) => {
      const fallDuration =
        (isMobile ? 1200 : 1600) + Math.random() * (isMobile ? 400 : 500);
      const startTime = Date.now();

      const animateFall = () => {
        const elapsed = Date.now() - startTime;

        setChatBubbles((prev) =>
          prev.map((bubble) => {
            if (bubble.id === bubbleId && bubble.isFalling) {
              const currentY = bubble.y + bubble.velocity;

              if (currentY >= bubble.finalY) {
                return {
                  ...bubble,
                  y: bubble.finalY,
                  isFalling: false,
                  isBouncing: true,
                  hasLanded: true,
                  velocity: 0,
                };
              }

              return {
                ...bubble,
                y: currentY,
                velocity: bubble.velocity + 0.02,
              };
            }
            return bubble;
          }),
        );

        if (elapsed < fallDuration) {
          requestAnimationFrame(animateFall);
        }
      };

      animateFall();
    },
    [isMobile],
  );

  // Create water-drop style falling bubbles
  useEffect(() => {
    console.log("Hero useEffect triggered, isMobile:", isMobile);

    const createWaterDrops = () => {
      const bubbles: ChatBubble[] = [];

      // Strategic positions for mobile vs desktop - find open spaces
      // Avoid covering text and stay within screen bounds
      const positions = isMobile
        ? [
            { x: 8, y: 8 }, // Top-left - well above headline, minimal overlap
            { x: 92, y: 8 }, // Top-right - well above headline, minimal overlap
            { x: 8, y: 55 }, // Mid-left - well to the left of content
            { x: 92, y: 75 }, // Bottom-right - well to the right of content
          ]
        : [
            { x: 10, y: 30 }, // Top left - more open space above headline
            { x: 90, y: 25 }, // Top right - moved higher and more to edge to avoid headline
            { x: 12, y: 80 }, // Bottom left - more open space
            { x: 88, y: 80 }, // Bottom right - more open space
          ];

      // Create a shuffled array of messages to ensure no repetition
      const shuffledMessages = [...chatMessages].sort(() => Math.random() - 0.5);

      for (let i = 0; i < 4; i++) {
        const finalX =
          positions[i].x + (Math.random() - 0.5) * (isMobile ? 0.5 : 1);
        const finalY =
          positions[i].y + (Math.random() - 0.5) * (isMobile ? 0.5 : 1);

        const bubble: ChatBubble = {
          id: i,
          message: shuffledMessages[i], // Use shuffled array to ensure unique messages
          x: finalX + (Math.random() - 0.5) * (isMobile ? 0.5 : 1),
          y: -30, // Start above viewport
          isDragging: false,
          isFalling: true,
          isBouncing: false,
          hasLanded: false,
          velocity: 0.8 + Math.random() * 0.4,
          rotation: (Math.random() - 0.5) * (isMobile ? 10 : 15),
          scale:
            (isMobile ? 0.55 : 0.7) + Math.random() * (isMobile ? 0.08 : 0.12),
          opacity:
            (isMobile ? 0.65 : 0.75) + Math.random() * (isMobile ? 0.2 : 0.25),
          bounceCount: 0,
          finalX: finalX,
          finalY: finalY,
        };
        bubbles.push(bubble);
      }

      console.log("Created bubbles:", bubbles.length);
      setChatBubbles(bubbles);

      // Start falling animations with staggered timing
      bubbles.forEach((bubble, index) => {
        setTimeout(
          () => {
            startWaterDropAnimation(bubble.id);
          },
          index * (isMobile ? 600 : 800),
        );
      });
    };

    // Start the animation after a short delay
    const timer = setTimeout(createWaterDrops, 500);
    return () => clearTimeout(timer);
  }, [isMobile, startWaterDropAnimation]);

  // Handle bounce completion
  useEffect(() => {
    chatBubbles.forEach((bubble) => {
      if (bubble.isBouncing) {
        setTimeout(() => {
          setChatBubbles((prev) =>
            prev.map((b) => {
              if (b.id === bubble.id && b.isBouncing) {
                return {
                  ...b,
                  isBouncing: false,
                  opacity: 0.9,
                };
              }
              return b;
            }),
          );
        }, 200);
      }
    });
  }, [chatBubbles]);

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent, bubbleId: number) => {
    e.preventDefault();
    setDraggedBubble(bubbleId);
    setChatBubbles((prev) =>
      prev.map((bubble) =>
        bubble.id === bubbleId ? { ...bubble, isDragging: true } : bubble,
      ),
    );
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedBubble !== null) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setChatBubbles((prev) =>
        prev.map((bubble) =>
          bubble.id === draggedBubble
            ? {
                ...bubble,
                x: Math.max(8, Math.min(92, x)),
                y: Math.max(8, Math.min(92, y)),
              }
            : bubble,
        ),
      );
    }
  };

  const handleMouseUp = () => {
    if (draggedBubble !== null) {
      setChatBubbles((prev) =>
        prev.map((bubble) =>
          bubble.id === draggedBubble
            ? { ...bubble, isDragging: false }
            : bubble,
        ),
      );
      setDraggedBubble(null);
    }
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent, bubbleId: number) => {
    e.preventDefault();
    setDraggedBubble(bubbleId);
    setChatBubbles((prev) =>
      prev.map((bubble) =>
        bubble.id === bubbleId ? { ...bubble, isDragging: true } : bubble,
      ),
    );
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (draggedBubble !== null) {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      const touch = e.touches[0];
      const x = ((touch.clientX - rect.left) / rect.width) * 100;
      const y = ((touch.clientY - rect.top) / rect.height) * 100;

      setChatBubbles((prev) =>
        prev.map((bubble) =>
          bubble.id === draggedBubble
            ? {
                ...bubble,
                x: Math.max(8, Math.min(92, x)),
                y: Math.max(8, Math.min(92, y)),
              }
            : bubble,
        ),
      );
    }
  };

  const handleTouchEnd = () => {
    if (draggedBubble !== null) {
      setChatBubbles((prev) =>
        prev.map((bubble) =>
          bubble.id === draggedBubble
            ? { ...bubble, isDragging: false }
            : bubble,
        ),
      );
      setDraggedBubble(null);
    }
  };

  return (
    <section
      className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container flex max-w-5xl flex-col items-center gap-6 text-center sm:gap-8 md:gap-10">
        {/* Trust Indicator Badge */}
        <div className="mb-8 flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300 sm:mb-12">
          <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
          Join the future of customer support
        </div>

        <h1 className="mb-6 text-balance font-urban text-3xl font-extrabold tracking-tight sm:mb-8 sm:text-4xl md:mb-10 md:text-5xl lg:text-6xl xl:text-7xl">
          Transform Your Website into an{" "}
          <span className="text-gradient_indigo-purple font-extrabold">
            Intelligent Conversational Platform
          </span>
        </h1>

        <p className="mb-8 max-w-2xl text-balance text-base leading-normal text-muted-foreground sm:mb-10 sm:text-lg md:mb-12 md:text-xl lg:text-2xl">
          Capture leads, provide instant support, and engage visitors with AI
          that understands your business. One line of code to turn any website
          into a powerful conversational experience.
        </p>

        <div className="mb-8 flex w-full flex-col items-center justify-center gap-3 sm:mb-10 sm:w-auto sm:flex-row sm:gap-4 md:mb-12">
          <button
            onClick={() => setShowLeadCaptureModal(true)}
            className={cn(
              buttonVariants({ size: "lg", rounded: "full" }),
              "w-full gap-2 sm:w-auto",
            )}
          >
            <span>Join Now</span>
            <Icons.arrowRight className="size-4" />
          </button>
          <Link
            href="/pricing"
            prefetch={true}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
                rounded: "full",
              }),
              "w-full sm:w-auto",
            )}
          >
            <span>View Pricing</span>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mb-4 flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:mb-6 sm:flex-row sm:gap-6 md:gap-8">
          <div className="flex items-center gap-2">
            <Icons.check className="size-4 shrink-0 text-green-500" />
            <span>Setup in 5 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Icons.check className="size-4 shrink-0 text-green-500" />
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <Icons.check className="size-4 shrink-0 text-green-500" />
            <span>24/7 AI support</span>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="size-2 rounded-full bg-green-500"></div>
          <span>Join the future of conversational AI</span>
        </div>
      </div>

      {/* Water-Drop Chat Bubbles */}
      {chatBubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={cn(
            "absolute z-10 cursor-grab touch-none select-none",
            bubble.isDragging && "z-15 cursor-grabbing",
          )}
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            transform: `translate(-50%, -50%) scale(${bubble.scale}) rotate(${bubble.rotation}deg)`,
            opacity: bubble.opacity,
            transition: bubble.isDragging ? "none" : "transform 0.1s ease-out",
          }}
          onMouseDown={(e) => handleMouseDown(e, bubble.id)}
          onTouchStart={(e) => handleTouchStart(e, bubble.id)}
        >
          <div
            className={cn(
              "relative h-[80px] w-[200px] rounded-3xl border border-gray-200/50 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/90 sm:h-[90px] sm:w-[240px] sm:px-5 sm:py-3.5 md:h-[100px] md:w-[280px] md:px-6 md:py-4",
              bubble.isDragging && "scale-105 shadow-xl",
            )}
          >
            {/* Chat bubble tail */}
            <div className="absolute -bottom-2 left-3 size-3 rotate-45 border-b border-r border-gray-200/50 bg-white/90 dark:border-gray-700/50 dark:bg-gray-800/90 sm:left-3.5 sm:size-3.5 md:left-4 md:size-4"></div>

            {/* Message content */}
            <div className="flex items-start gap-2">
              <div className="shrink-0">
                <div className="flex size-6 items-center justify-center rounded-full bg-blue-500 sm:size-7">
                  <Icons.bot className="size-3 text-white sm:size-4" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-1">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    Rolto AI
                  </span>
                  <span className="text-xs text-muted-foreground">• now</span>
                </div>
                <p className="line-clamp-2 whitespace-normal break-words text-xs leading-relaxed text-foreground sm:text-sm">
                  {bubble.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
