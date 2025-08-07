"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

import { InfoLdg } from "types";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { ModalContext } from "@/components/modals/providers";

interface InfoLandingProps {
  data: InfoLdg;
  reverse?: boolean;
}

export default function InfoLanding({ data, reverse = false }: InfoLandingProps) {
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
                  <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                    Seamless Integration, Instant Setup
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Add Rolto to your website with a single line of JavaScript or an iframe snippet. Customize the look, feel, and behavior 
                    to match your brand—no complex integrations or months of setup required.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  {data.list.map((item, index) => {
                    const Icon = Icons[item.icon || "nextjs"];
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900">
                          <Icon className="size-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="font-semibold text-lg">{item.title}</p>
                          <p className="text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="rounded-full px-8 py-4 text-lg"
                    onClick={() => setShowLeadCaptureModal(true)}
                  >
                    <span>Join Now</span>
                    <Icons.arrowRight className="size-5 ml-2" />
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full px-8 py-4 text-lg">
                    <Link href="/docs" className="flex items-center gap-2">
                      <span>View Documentation</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 shadow-xl border border-blue-200 dark:border-blue-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icons.bot className="w-48 h-48 text-blue-600 dark:text-blue-400 opacity-20" />
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
