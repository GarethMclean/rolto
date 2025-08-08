"use client";

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { InfoLdg } from "types";
import { Button, buttonVariants } from "@/components/ui/button";
import { ModalContext } from "@/components/modals/providers";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { cn } from "@/lib/utils";

interface InfoLandingProps {
  data: InfoLdg;
  reverse?: boolean;
}

export default function InfoLanding({
  data,
  reverse = false,
}: InfoLandingProps) {
  const { setShowLeadCaptureModal } = useContext(ModalContext);

  return (
    <section>
      <div className="pb-6 pt-28">
        <MaxWidthWrapper>
          <div
            className={`grid gap-12 lg:grid-cols-2 lg:gap-16 ${
              reverse ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="flex flex-col justify-center">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                    {data.title}
                  </h2>
                  <p className="text-xl leading-relaxed text-muted-foreground">
                    {data.description}
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  {data.list.map((item, index) => {
                    const Icon = Icons[item.icon || "nextjs"];
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/50">
                          <Icon className="size-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-lg font-semibold">{item.title}</p>
                          <p className="leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:gap-4">
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
                    href="/docs"
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
                    <span>View Documentation</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden items-center justify-center sm:flex">
              <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl dark:border-blue-800 dark:from-blue-950 dark:to-blue-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icons.bot className="size-48 text-blue-600 opacity-20 dark:text-blue-400" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
}
