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
  width: number;
  height: number;
  isVisible: boolean;
}

interface AvoidTarget {
  id: string;
  rect: DOMRect;
}

interface Anchor {
  x: number; // percentage
  y: number; // percentage
  name: string;
}

interface BubblePosition {
  x: number;
  y: number;
  breakpoint: string;
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
];

export default function HeroLanding() {
  const [chatBubbles, setChatBubbles] = useState<ChatBubble[]>([]);
  const [draggedBubble, setDraggedBubble] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('desktop');
  const [isLayoutStable, setIsLayoutStable] = useState(false);
  const { setShowLeadCaptureModal } = useContext(ModalContext);
  const heroRef = useRef<HTMLElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();

  // Constants
  const GAP = 16; // minimum padding between bubble and avoid targets/edges
  const BREAKPOINTS = {
    mobile: 640,
    tablet: 1024,
    desktop: 1024
  };

  // Anchor positions per breakpoint (ordered by preference) - very permissive
  const ANCHORS: Record<string, Anchor[]> = {
    desktop: [
      { x: 20, y: 20, name: 'top-left' },
      { x: 80, y: 20, name: 'top-right' },
      { x: 20, y: 80, name: 'bottom-left' },
      { x: 80, y: 80, name: 'bottom-right' },
      { x: 30, y: 50, name: 'mid-left' },
      { x: 70, y: 50, name: 'mid-right' },
    ],
    tablet: [
      { x: 20, y: 20, name: 'top-left' },
      { x: 80, y: 20, name: 'top-right' },
      { x: 20, y: 80, name: 'bottom-left' },
      { x: 80, y: 80, name: 'bottom-right' },
      { x: 30, y: 50, name: 'mid-left' },
      { x: 70, y: 50, name: 'mid-right' },
    ],
    mobile: [
      { x: 25, y: 25, name: 'top-left' },
      { x: 75, y: 25, name: 'top-right' },
      { x: 25, y: 75, name: 'bottom-left' },
      { x: 75, y: 75, name: 'bottom-right' },
      { x: 25, y: 50, name: 'mid-left' },
      { x: 75, y: 50, name: 'mid-right' },
    ]
  };

  // Detect breakpoint and layout stability
  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      let newBreakpoint = 'desktop';
      
      if (width < BREAKPOINTS.mobile) {
        newBreakpoint = 'mobile';
        setIsMobile(true);
      } else if (width < BREAKPOINTS.tablet) {
        newBreakpoint = 'tablet';
        setIsMobile(false);
      } else {
        newBreakpoint = 'desktop';
        setIsMobile(false);
      }
      
      setCurrentBreakpoint(newBreakpoint);
    };

    const handleResize = () => {
      // Clear existing timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      // Debounce resize events
      resizeTimeoutRef.current = setTimeout(() => {
        checkBreakpoint();
        setIsLayoutStable(false);
        // Re-run placement after layout stabilizes
        setTimeout(() => {
          setIsLayoutStable(true);
        }, 100);
      }, 150);
    };

    checkBreakpoint();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    
    // Wait for fonts to load and layout to stabilize
    document.fonts.ready.then(() => {
      setTimeout(() => {
        setIsLayoutStable(true);
      }, 100);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  // Positioning utilities
  const getBubbleKey = (bubbleId: number, breakpoint: string) => `bubblePos:${bubbleId}:${breakpoint}`;
  
  const saveBubblePosition = (bubbleId: number, breakpoint: string, x: number, y: number) => {
    try {
      const key = getBubbleKey(bubbleId, breakpoint);
      const position: BubblePosition = { x, y, breakpoint };
      localStorage.setItem(key, JSON.stringify(position));
    } catch (error) {
      console.warn('Failed to save bubble position:', error);
    }
  };

  const loadBubblePosition = (bubbleId: number, breakpoint: string): BubblePosition | null => {
    try {
      const key = getBubbleKey(bubbleId, breakpoint);
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.warn('Failed to load bubble position:', error);
      return null;
    }
  };

  const resetBubblePositions = () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('bubblePos:')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to reset bubble positions:', error);
    }
  };

  const measureAvoidTargets = (): AvoidTarget[] => {
    if (!heroRef.current) return [];
    
    const avoidElements = heroRef.current.querySelectorAll('[data-avoid]');
    const targets: AvoidTarget[] = [];
    const heroRect = heroRef.current.getBoundingClientRect();
    
    console.log('Hero dimensions:', { width: heroRect.width, height: heroRect.height });
    
    avoidElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      
      // Convert to relative coordinates within hero
      const relativeRect = new DOMRect(
        ((rect.left - heroRect.left) / heroRect.width) * 100,
        ((rect.top - heroRect.top) / heroRect.height) * 100,
        (rect.width / heroRect.width) * 100,
        (rect.height / heroRect.height) * 100
      );
      
      const target = {
        id: element.getAttribute('data-avoid') || `target-${index}`,
        rect: relativeRect
      };
      
      console.log(`Avoid target ${target.id}:`, {
        x: relativeRect.x,
        y: relativeRect.y,
        width: relativeRect.width,
        height: relativeRect.height
      });
      
      targets.push(target);
    });
    
    return targets;
  };

  // Simple validation - just check if position is within bounds
  const isPositionValid = (
    x: number, 
    y: number, 
    bubbleWidth: number, 
    bubbleHeight: number, 
    avoidTargets: AvoidTarget[], 
    placedBubbles: ChatBubble[]
  ): boolean => {
    // Basic bounds check - ensure position is within the hero container
    return x >= 5 && x <= 95 && y >= 5 && y <= 95;
  };

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
      if (!isLayoutStable || !heroRef.current) return;

      const bubbles: ChatBubble[] = [];
      const avoidTargets = measureAvoidTargets();
      const anchors = ANCHORS[currentBreakpoint];
      
      // Create a shuffled array of messages to ensure no repetition
      const shuffledMessages = [...chatMessages].sort(() => Math.random() - 0.5);

      // Sort bubbles by size (larger bubbles first for placement difficulty)
      const bubbleSizes = [
        { id: 0, width: isMobile ? 200 : 280, height: isMobile ? 80 : 100 },
        { id: 1, width: isMobile ? 200 : 280, height: isMobile ? 80 : 100 },
        { id: 2, width: isMobile ? 200 : 280, height: isMobile ? 80 : 100 },
        { id: 3, width: isMobile ? 200 : 280, height: isMobile ? 80 : 100 },
      ].sort((a, b) => (b.width * b.height) - (a.width * a.height));

      const placedBubbles: ChatBubble[] = [];

      for (const bubbleSize of bubbleSizes) {
        const bubbleId = bubbleSize.id;
        
        // Try to load saved position first
        const savedPosition = loadBubblePosition(bubbleId, currentBreakpoint);
        let placed = false;
        let finalX = 0;
        let finalY = 0;

        // Check if saved position is still valid
        if (savedPosition) {
          const isValid = isPositionValid(
            savedPosition.x, 
            savedPosition.y, 
            bubbleSize.width, 
            bubbleSize.height, 
            avoidTargets, 
            placedBubbles
          );
          
          if (isValid) {
            finalX = savedPosition.x;
            finalY = savedPosition.y;
            placed = true;
          }
        }

        // If no valid saved position, use predefined positions for each bubble
        if (!placed) {
          // Positions in the open spaces - top 2 high, bottom 2 lower
          const positions = [
            { x: 12, y: 14, name: 'top-left' },      // Above and left of headline (moved down slightly)
            { x: 88, y: isMobile ? 32 : 45, name: 'top-right' },     // Right of headline/paragraph, aligned with text (moved up slightly on mobile, down on desktop)
            { x: 18, y: 72, name: 'mid-left' },      // Below buttons, left of feature list (moved down)
            { x: 82, y: 85, name: 'mid-right' },     // Below buttons, right of feature list (moved down quite a bit)
          ];
          
          const position = positions[bubbleId];
          finalX = position.x;
          finalY = position.y;
          placed = true;
          console.log(`  Placed bubble ${bubbleId} at ${position.name} (${finalX}, ${finalY})`);
        }

        // Create bubble (visible or hidden)
        const bubble: ChatBubble = {
          id: bubbleId,
          message: shuffledMessages[bubbleId],
          x: finalX,
          y: -30, // Start above viewport
          isDragging: false,
          isFalling: placed,
          isBouncing: false,
          hasLanded: false,
          velocity: 0.8 + Math.random() * 0.4,
          rotation: (Math.random() - 0.5) * (isMobile ? 8 : 12),
          scale: (isMobile ? 0.5 : 0.7) + Math.random() * (isMobile ? 0.06 : 0.12),
          opacity: (isMobile ? 0.65 : 0.75) + Math.random() * (isMobile ? 0.2 : 0.25),
          bounceCount: 0,
          finalX: finalX,
          finalY: finalY,
          width: bubbleSize.width,
          height: bubbleSize.height,
          isVisible: placed,
        };

        bubbles.push(bubble);
        if (placed) {
          placedBubbles.push(bubble);
        }
      }

      // Sort bubbles back to original order by ID
      bubbles.sort((a, b) => a.id - b.id);

      console.log(`Created ${bubbles.length} bubbles, ${placedBubbles.length} visible for ${currentBreakpoint}`);
      setChatBubbles(bubbles);

      // Start falling animations for visible bubbles
      placedBubbles.forEach((bubble, index) => {
        setTimeout(() => {
          startWaterDropAnimation(bubble.id);
        }, index * (isMobile ? 600 : 800));
      });
    };

    // Start the animation after a short delay
    const timer = setTimeout(createWaterDrops, 500);
    return () => clearTimeout(timer);
  }, [isLayoutStable, currentBreakpoint, startWaterDropAnimation]);

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

      // Allow full freedom to drag anywhere on the hero section
      // Apply edge padding to prevent bubbles from going off-screen or into header
      const minEdgePadding = isMobile ? 6 : 8;
      const maxEdgePadding = isMobile ? 94 : 92;
      const headerHeight = isMobile ? 8 : 6; // Prevent going into header area
      
      const constrainedX = Math.max(minEdgePadding, Math.min(maxEdgePadding, x));
      const constrainedY = Math.max(headerHeight + 2, Math.min(maxEdgePadding, y)); // Start below header

      setChatBubbles((prev) =>
        prev.map((bubble) =>
          bubble.id === draggedBubble
            ? {
                ...bubble,
                x: constrainedX,
                y: constrainedY,
              }
            : bubble,
        ),
      );
    }
  };

  const handleMouseUp = () => {
    if (draggedBubble !== null) {
      setChatBubbles((prev) =>
        prev.map((bubble) => {
          if (bubble.id === draggedBubble) {
            // Save the final position
            saveBubblePosition(bubble.id, currentBreakpoint, bubble.x, bubble.y);
            return { ...bubble, isDragging: false };
          }
          return bubble;
        }),
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

      // Allow full freedom to drag anywhere on the hero section
      // Apply edge padding to prevent bubbles from going off-screen or into header
      const minEdgePadding = isMobile ? 6 : 8;
      const maxEdgePadding = isMobile ? 94 : 92;
      const headerHeight = isMobile ? 8 : 6; // Prevent going into header area
      
      const constrainedX = Math.max(minEdgePadding, Math.min(maxEdgePadding, x));
      const constrainedY = Math.max(headerHeight + 2, Math.min(maxEdgePadding, y)); // Start below header

      setChatBubbles((prev) =>
        prev.map((bubble) =>
          bubble.id === draggedBubble
            ? {
                ...bubble,
                x: constrainedX,
                y: constrainedY,
              }
            : bubble,
        ),
      );
    }
  };

  const handleTouchEnd = () => {
    if (draggedBubble !== null) {
      setChatBubbles((prev) =>
        prev.map((bubble) => {
          if (bubble.id === draggedBubble) {
            // Save the final position
            saveBubblePosition(bubble.id, currentBreakpoint, bubble.x, bubble.y);
            return { ...bubble, isDragging: false };
          }
          return bubble;
        }),
      );
      setDraggedBubble(null);
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container flex max-w-5xl flex-col items-center gap-6 text-center sm:gap-8 md:gap-10">
        {/* Trust Indicator Badge */}
        <div data-avoid="trust-badge" className="mb-8 flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300 sm:mb-12">
          <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
          Join the Future of Business Engagement
        </div>

        <h1 data-avoid="headline" className="mb-6 text-balance font-urban text-3xl font-extrabold tracking-tight sm:mb-8 sm:text-4xl md:mb-10 md:text-5xl lg:text-6xl xl:text-7xl">
          Transform Your Website into an{" "}
          <span className="text-gradient_indigo-purple font-extrabold">
            Intelligent Engagement Platform
          </span>
        </h1>

        <p data-avoid="subheadline" className="mb-8 max-w-2xl text-balance text-base leading-normal text-muted-foreground sm:mb-10 sm:text-lg md:mb-12 md:text-xl lg:text-2xl">
          Capture leads, close deals, and support customers — all through AI
          that understands your business. With one line of code, turn any website
          into a powerful, intelligent engagement hub.
        </p>

        <div data-avoid="cta-buttons" className="mb-8 flex w-full flex-col items-center justify-center gap-3 sm:mb-10 sm:w-auto sm:flex-row sm:gap-4 md:mb-12">
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
        <div data-avoid="trust-indicators" className="mb-4 flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:mb-6 sm:flex-row sm:gap-6 md:gap-8">
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
        <div data-avoid="social-proof" className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="size-2 rounded-full bg-green-500"></div>
          <span>Join the future of conversational AI</span>
        </div>
      </div>

      {/* Water-Drop Chat Bubbles */}
      {chatBubbles.filter(bubble => bubble.isVisible).map((bubble) => (
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
