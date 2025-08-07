"use client";

import { useEffect, useState, useContext } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { ModalContext } from "@/components/modals/providers";
import { useMobileMenu } from "@/components/layout/mobile-menu-context";

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
  "✨ Transform your website today!"
];

export default function HeroLanding() {
  const [chatBubbles, setChatBubbles] = useState<ChatBubble[]>([]);
  const [draggedBubble, setDraggedBubble] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { setShowLeadCaptureModal } = useContext(ModalContext);
  const { isMobileMenuOpen } = useMobileMenu();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Create water-drop style falling bubbles
  useEffect(() => {
    console.log('Hero useEffect triggered, isMobile:', isMobile, 'isMobileMenuOpen:', isMobileMenuOpen);
    
    const createWaterDrops = () => {
      const bubbles: ChatBubble[] = [];

      // Strategic positions for mobile vs desktop - find open spaces
      const positions = isMobile ? [
        { x: 10, y: 15 },   // Top left - lots of space above header
        { x: 90, y: 15 },   // Top right - lots of space above header
        { x: 10, y: 85 },   // Bottom left - below CTA buttons
        { x: 90, y: 85 },   // Bottom right - below CTA buttons
      ] : [
        { x: 12, y: 20 }, // Top left area
        { x: 88, y: 25 }, // Top right area
        { x: 15, y: 80 }, // Bottom left area
        { x: 85, y: 75 }, // Bottom right area
      ];

      for (let i = 0; i < 4; i++) {
        const finalX = positions[i].x + (Math.random() - 0.5) * (isMobile ? 1 : 8);
        const finalY = positions[i].y + (Math.random() - 0.5) * (isMobile ? 1 : 6);

        const bubble: ChatBubble = {
          id: i,
          message: chatMessages[i % chatMessages.length],
          x: finalX + (Math.random() - 0.5) * (isMobile ? 2 : 12),
          y: -30, // Start above viewport
          isDragging: false,
          isFalling: true,
          isBouncing: false,
          hasLanded: false,
          velocity: 0.8 + Math.random() * 0.4,
          rotation: (Math.random() - 0.5) * (isMobile ? 10 : 15),
          scale: (isMobile ? 0.7 : 0.85) + Math.random() * (isMobile ? 0.15 : 0.3),
          opacity: (isMobile ? 0.65 : 0.75) + Math.random() * (isMobile ? 0.2 : 0.25),
          bounceCount: 0,
          finalX: finalX,
          finalY: finalY,
        };
        bubbles.push(bubble);
      }

      console.log('Created bubbles:', bubbles.length);
      setChatBubbles(bubbles);

      // Start falling animations with staggered timing
      bubbles.forEach((bubble, index) => {
        setTimeout(() => {
          startWaterDropAnimation(bubble.id);
        }, index * (isMobile ? 600 : 800));
      });
    };

    // Start the animation after a short delay, but only if mobile menu is not open
    if (!isMobileMenuOpen) {
      const timer = setTimeout(createWaterDrops, 500);
      return () => clearTimeout(timer);
    }
  }, [isMobile, isMobileMenuOpen]);

  // Clear chat bubbles when mobile menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      setChatBubbles([]);
    }
  }, [isMobileMenuOpen]);

  const startWaterDropAnimation = (bubbleId: number) => {
    const fallDuration = (isMobile ? 1200 : 1600) + Math.random() * (isMobile ? 400 : 500);
    const startTime = Date.now();

    const animateFall = () => {
      const elapsed = Date.now() - startTime;

      setChatBubbles(prev => prev.map(bubble => {
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
      }));

      if (elapsed < fallDuration) {
        requestAnimationFrame(animateFall);
      }
    };

    animateFall();
  };

  // Handle bounce completion
  useEffect(() => {
    chatBubbles.forEach(bubble => {
      if (bubble.isBouncing) {
        setTimeout(() => {
          setChatBubbles(prev => prev.map(b => {
            if (b.id === bubble.id && b.isBouncing) {
              return {
                ...b,
                isBouncing: false,
                opacity: 0.9,
              };
            }
            return b;
          }));
        }, 200);
      }
    });
  }, [chatBubbles]);

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent, bubbleId: number) => {
    e.preventDefault();
    setDraggedBubble(bubbleId);
    setChatBubbles(prev => prev.map(bubble => 
      bubble.id === bubbleId ? { ...bubble, isDragging: true } : bubble
    ));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedBubble !== null) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setChatBubbles(prev => prev.map(bubble => 
        bubble.id === draggedBubble 
          ? { ...bubble, x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) }
          : bubble
      ));
    }
  };

  const handleMouseUp = () => {
    if (draggedBubble !== null) {
      setChatBubbles(prev => prev.map(bubble => 
        bubble.id === draggedBubble ? { ...bubble, isDragging: false } : bubble
      ));
      setDraggedBubble(null);
    }
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent, bubbleId: number) => {
    e.preventDefault();
    setDraggedBubble(bubbleId);
    setChatBubbles(prev => prev.map(bubble => 
      bubble.id === bubbleId ? { ...bubble, isDragging: true } : bubble
    ));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (draggedBubble !== null) {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      const touch = e.touches[0];
      const x = ((touch.clientX - rect.left) / rect.width) * 100;
      const y = ((touch.clientY - rect.top) / rect.height) * 100;

      setChatBubbles(prev => prev.map(bubble => 
        bubble.id === draggedBubble 
          ? { ...bubble, x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) }
          : bubble
      ));
    }
  };

  const handleTouchEnd = () => {
    if (draggedBubble !== null) {
      setChatBubbles(prev => prev.map(bubble => 
        bubble.id === draggedBubble ? { ...bubble, isDragging: false } : bubble
      ));
      setDraggedBubble(null);
    }
  };

  return (
    <section 
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container flex max-w-5xl flex-col items-center gap-6 sm:gap-8 md:gap-10 text-center">
        {/* Trust Indicator Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 mb-6 sm:mb-8">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Join the future of customer support
        </div>

        <h1 className="text-balance font-urban text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6 md:mb-8">
          Transform Your Website into an{" "}
          <span className="text-gradient_indigo-purple font-extrabold">
            Intelligent Conversational Platform
          </span>
        </h1>

        <p className="max-w-2xl text-balance leading-normal text-muted-foreground text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10">
          Capture leads, provide instant support, and engage visitors with AI that understands your business. One line of code to turn any website into a powerful conversational experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-6 sm:mb-8 md:mb-10">
          <button
            onClick={() => setShowLeadCaptureModal(true)}
            className={cn(
              buttonVariants({ size: "lg", rounded: "full" }),
              "gap-2 w-full sm:w-auto"
            )}
          >
            <span>Join Now</span>
            <Icons.arrowRight className="size-4" />
          </button>
          <Link
            href="/pricing"
            prefetch={true}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg", rounded: "full" }),
              "w-full sm:w-auto"
            )}
          >
            <span>View Pricing</span>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 text-sm text-muted-foreground mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <Icons.check className="size-4 text-green-500 flex-shrink-0" />
            <span>Setup in 5 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Icons.check className="size-4 text-green-500 flex-shrink-0" />
            <span>Free forever plan</span>
          </div>
          <div className="flex items-center gap-2">
            <Icons.check className="size-4 text-green-500 flex-shrink-0" />
            <span>24/7 AI support</span>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Join the future of conversational AI</span>
        </div>
      </div>

      {/* Water-Drop Chat Bubbles */}
      {!isMobileMenuOpen && chatBubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={cn(
            "absolute z-10 cursor-grab select-none touch-none",
            bubble.isDragging && "cursor-grabbing z-15"
          )}
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            transform: `translate(-50%, -50%) scale(${bubble.scale}) rotate(${bubble.rotation}deg)`,
            opacity: bubble.opacity,
            transition: bubble.isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
          onMouseDown={(e) => handleMouseDown(e, bubble.id)}
          onTouchStart={(e) => handleTouchStart(e, bubble.id)}
        >
          <div className={cn(
            "relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl px-2.5 sm:px-3 md:px-4 py-2 sm:py-3 shadow-lg border border-gray-200/50 dark:border-gray-700/50 max-w-[140px] sm:max-w-[200px] md:max-w-xs",
            bubble.isDragging && "shadow-xl scale-105"
          )}>
            {/* Chat bubble tail */}
            <div className="absolute -bottom-2 left-2.5 sm:left-3 md:left-4 w-3 h-3 sm:w-4 sm:h-4 bg-white/90 dark:bg-gray-800/90 border-b border-r border-gray-200/50 dark:border-gray-700/50 transform rotate-45"></div>
            
            {/* Message content */}
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 rounded-full flex items-center justify-center">
                  <Icons.bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Rolto AI</span>
                  <span className="text-xs text-muted-foreground">• now</span>
                </div>
                <p className="text-xs sm:text-sm text-foreground leading-relaxed">{bubble.message}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}