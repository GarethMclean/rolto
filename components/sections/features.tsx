import Link from "next/link";

import { features } from "@/config/landing";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export default function Features() {
  return (
    <section id="features" className="relative bg-muted/20">
      {/* Subtle top border for visual separation */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      <div className="container flex max-w-6xl flex-col gap-8 py-12 sm:gap-10 sm:py-16 md:gap-12 md:py-20 lg:py-28">
        <div className="text-gradient_indigo-purple mb-3 font-semibold sm:mb-4">
          Features
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Everything you need to build intelligent conversations.
        </h2>
        <p className="mt-4 text-balance text-sm text-muted-foreground sm:mt-6 sm:text-base md:text-lg">
          From content indexing to human handoff, Rolto provides all the tools
          to transform your website into a powerful conversational platform.
        </p>

        <div className="mt-8 sm:mt-12">
          {/* Mobile: Horizontal scrollable list */}
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-8 sm:hidden">
            {features.map((feature) => {
              const Icon = Icons[feature.icon || "nextjs"];
              return (
                <div
                  className="group relative w-72 shrink-0 snap-start overflow-hidden rounded-2xl border bg-background p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  key={feature.title}
                >
                  <div className="relative">
                    <div className="relative flex size-10 rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm *:relative *:m-auto *:size-5 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-400">
                      <Icon />
                    </div>

                    <h3 className="mt-4 text-base font-semibold text-foreground">
                      {feature.title}
                    </h3>

                    <p className="mt-2 pb-4 text-xs leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>

                    <div className="-mb-3 flex gap-2 border-t border-border/50 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="px-2 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Link
                          href={feature.link}
                          className="flex items-center gap-1"
                        >
                          <span>Learn more</span>
                          <Icons.arrowUpRight className="size-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden gap-4 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = Icons[feature.icon || "nextjs"];
              return (
                <div
                  className="group relative overflow-hidden rounded-2xl border bg-background p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:rounded-3xl sm:p-6 md:p-8"
                  key={feature.title}
                >
                  <div className="relative">
                    <div className="relative flex size-10 rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm *:relative *:m-auto *:size-5 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-400 sm:size-12 sm:rounded-2xl sm:*:size-6 md:size-14 md:*:size-7">
                      <Icon />
                    </div>

                    <h3 className="mt-4 text-base font-semibold text-foreground sm:mt-6 sm:text-lg md:text-xl">
                      {feature.title}
                    </h3>

                    <p className="mt-2 pb-4 text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:pb-6 sm:text-sm md:text-base">
                      {feature.description}
                    </p>

                    <div className="-mb-3 flex gap-2 border-t border-border/50 py-3 sm:-mb-5 sm:gap-3 sm:py-4 md:-mb-7">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="px-2 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 sm:px-4 sm:text-sm"
                      >
                        <Link
                          href={feature.link}
                          className="flex items-center gap-1 sm:gap-2"
                        >
                          <span>Learn more</span>
                          <Icons.arrowUpRight className="size-3 sm:size-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
