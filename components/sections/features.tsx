import Link from "next/link";

import { features } from "@/config/landing";
import { Button } from "@/components/ui/button";
import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function Features() {
  return (
    <section id="features" className="bg-muted/20">
      <div className="pb-6 pt-16 sm:pt-20 md:pt-28">
        <MaxWidthWrapper>
          <div className="text-gradient_indigo-purple mb-3 sm:mb-4 font-semibold">Features</div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">
            Everything you need to build intelligent conversations.
          </h2>
          <p className="mt-4 sm:mt-6 text-balance text-sm sm:text-base md:text-lg text-muted-foreground">
            From content indexing to human handoff, Rolto provides all the tools to transform your website into a powerful conversational platform.
          </p>

          <div className="mt-8 sm:mt-12">
            {/* Mobile: Horizontal scrollable list */}
            <div className="flex gap-4 overflow-x-auto pb-4 sm:hidden scrollbar-hide">
              {features.map((feature) => {
                const Icon = Icons[feature.icon || "nextjs"];
                return (
                  <div
                    className="group relative overflow-hidden rounded-2xl border bg-background p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex-shrink-0 w-72"
                    key={feature.title}
                  >
                                      <div className="relative">
                      <div className="relative flex size-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 shadow-sm *:relative *:m-auto *:size-5 text-blue-600 dark:text-blue-400">
                        <Icon />
                      </div>

                      <h3 className="mt-4 text-base font-semibold text-foreground">{feature.title}</h3>

                      <p className="mt-2 pb-4 text-xs text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>

                      <div className="-mb-3 flex gap-2 border-t border-border/50 py-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="px-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs"
                        >
                          <Link href={feature.link} className="flex items-center gap-1">
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
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {features.map((feature) => {
                const Icon = Icons[feature.icon || "nextjs"];
                return (
                  <div
                    className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border bg-background p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    key={feature.title}
                  >
                    <div className="relative">
                      <div className="relative flex size-10 sm:size-12 md:size-14 rounded-xl sm:rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 shadow-sm *:relative *:m-auto *:size-5 sm:*:size-6 md:*:size-7 text-blue-600 dark:text-blue-400">
                        <Icon />
                      </div>

                      <h3 className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl font-semibold text-foreground">{feature.title}</h3>

                      <p className="mt-2 sm:mt-3 pb-4 sm:pb-6 text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>

                      <div className="-mb-3 sm:-mb-5 flex gap-2 sm:gap-3 border-t border-border/50 py-3 sm:py-4 md:-mb-7">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="px-2 sm:px-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs sm:text-sm"
                        >
                          <Link href={feature.link} className="flex items-center gap-1 sm:gap-2">
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
        </MaxWidthWrapper>
      </div>
    </section>
  );
}
