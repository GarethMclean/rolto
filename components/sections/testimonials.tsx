"use client";

import { useState } from "react";
import Image from "next/image";

import { testimonials } from "@/config/landing";
import { HeaderSection } from "@/components/shared/header-section";

export default function Testimonials() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleCardPress = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section className="relative">
      {/* Subtle top border for visual separation */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      <div className="container flex max-w-6xl flex-col gap-8 py-12 sm:gap-10 sm:py-16 md:gap-12 md:py-20 lg:py-28">
        <div className="text-gradient_indigo-purple mb-3 font-semibold sm:mb-4">
          Testimonials
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          What our clients are sharing.
        </h2>
        <p className="mt-4 text-balance text-sm text-muted-foreground sm:mt-6 sm:text-base md:text-lg">
          Discover the glowing feedback from teams using Rolto to transform
          their websites into intelligent conversational platforms.
        </p>

        {/* Mobile: Horizontal scrolling with interaction */}
        <div className="relative md:hidden">
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-8">
            {/* Left fade indicator */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-6 bg-gradient-to-r from-background to-transparent" />
            {/* Right fade indicator */}
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-6 bg-gradient-to-l from-background to-transparent" />
            {testimonials.map((item, index) => (
              <div
                className="flex min-w-[200px] max-w-[240px] shrink-0 snap-start first:ml-0 last:mr-4"
                key={item.name}
              >
                <div
                  className={`relative w-full rounded-2xl border bg-muted/25 shadow-lg transition-all duration-300 ${
                    expandedCard === index
                      ? "shadow-xl ring-2 ring-primary/20"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => handleCardPress(index)}
                  onTouchStart={() => handleCardPress(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardPress(index);
                    }
                  }}
                >
                  <div className="flex flex-col px-4 py-5">
                    <div>
                      <div className="relative mb-4 flex items-center gap-3">
                        <span className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full text-base">
                          <Image
                            width={100}
                            height={100}
                            className="size-full rounded-full border-2 border-background object-cover shadow-md"
                            src={item.image}
                            alt={item.name}
                            onError={(e) => {
                              // Fallback to a default avatar if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.src = "/_static/avatars/gareth.png";
                            }}
                          />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {item.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {item.job}
                          </p>
                        </div>
                      </div>
                      <q
                        className={`text-sm leading-relaxed text-muted-foreground transition-all duration-300 ${
                          expandedCard === index
                            ? "line-clamp-none"
                            : "line-clamp-4"
                        }`}
                      >
                        {item.review}
                      </q>
                      {/* Expand/collapse indicator */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-xs text-muted-foreground/60">
                          {expandedCard === index
                            ? "Tap to collapse"
                            : "Tap to expand"}
                        </div>
                        <div
                          className={`text-xs transition-transform duration-300 ${
                            expandedCard === index ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Scroll indicator */}
          <div className="mt-8 flex justify-center">
            <div className="flex gap-1.5">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className="size-1.5 rounded-full bg-muted-foreground/30 transition-colors duration-200"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Column layout */}
        <div className="column-1 hidden gap-4 space-y-4 sm:gap-6 sm:space-y-6 md:block md:columns-2 lg:columns-3">
          {testimonials.map((item) => (
            <div className="break-inside-avoid" key={item.name}>
              <div className="relative rounded-xl border bg-muted/25 shadow-sm transition-shadow duration-200 hover:shadow-md">
                <div className="flex flex-col px-5 py-6">
                  <div>
                    <div className="relative mb-5 flex items-center gap-3">
                      <span className="relative inline-flex size-12 shrink-0 items-center justify-center rounded-full text-base">
                        <Image
                          width={100}
                          height={100}
                          className="size-full rounded-full border-2 border-background object-cover shadow-sm"
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            // Fallback to a default avatar if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.src = "/_static/avatars/gareth.png";
                          }}
                        />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.job}
                        </p>
                      </div>
                    </div>
                    <q className="text-sm leading-relaxed text-muted-foreground">
                      {item.review}
                    </q>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
