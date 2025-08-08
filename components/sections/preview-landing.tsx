"use client";

import { useContext } from "react";
import Link from "next/link";

import { ModalContext } from "@/components/modals/providers";
import { Icons } from "@/components/shared/icons";

export default function PreviewLanding() {
  const { setShowLeadCaptureModal } = useContext(ModalContext);

  return (
    <section className="bg-muted/30 py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl px-6 sm:px-8">
        {/* Header */}
        <div className="mb-16 text-center sm:mb-20 md:mb-24 lg:mb-32">
          <h2 className="animate-fade-in-up mb-6 text-3xl font-bold sm:mb-8 sm:text-4xl md:mb-10 md:text-5xl lg:text-6xl xl:text-7xl">
            How Rolto works
          </h2>
          <p className="animate-fade-in-up mx-auto max-w-4xl text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-2xl lg:text-3xl">
            Transform your website into an intelligent conversational platform
            in three simple steps
          </p>
        </div>

        {/* How it works - Uniform Layout */}
        <div className="space-y-20 sm:space-y-24 md:space-y-28 lg:space-y-32">
          {/* Step 1: Upload Content */}
          <div
            className="animate-fade-in-up flex flex-col items-center gap-8 sm:gap-10 md:gap-12 lg:flex-row lg:gap-16"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="text-center lg:w-1/2 lg:text-left">
              <div className="mb-8 flex items-center justify-center gap-4 sm:mb-10 sm:gap-5 md:mb-12 lg:justify-start">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg sm:size-14 md:size-16">
                  <span className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                    1
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                  Upload your content
                </h3>
              </div>
              <p className="mb-8 text-base leading-relaxed text-muted-foreground sm:mb-10 sm:text-lg md:mb-12 md:text-xl lg:text-2xl">
                Add your documentation, FAQs, knowledge base, and any other
                content. Rolto learns from everything you upload to provide
                accurate, context-aware answers.
              </p>
              <div className="grid grid-cols-1 gap-4 text-sm text-muted-foreground sm:gap-5 sm:text-base md:gap-6 md:text-lg lg:text-xl">
                <div className="flex items-center gap-3">
                  <Icons.check className="size-4 shrink-0 text-green-500 sm:size-5" />
                  <span>PDFs & Documents</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icons.check className="size-4 shrink-0 text-green-500 sm:size-5" />
                  <span>Web Pages & Knowledge Base</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icons.check className="size-4 shrink-0 text-green-500 sm:size-5" />
                  <span>Custom Training Data</span>
                </div>
              </div>
            </div>
            <div className="hidden w-full sm:block lg:w-1/2">
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 shadow-xl dark:from-blue-950 dark:to-blue-900 sm:rounded-3xl sm:p-6 md:p-8 lg:p-12">
                <div className="flex h-32 items-center justify-center sm:h-40 md:h-48 lg:h-56 xl:h-64">
                  <Icons.upload className="size-16 text-blue-600 dark:text-blue-400 sm:size-20 md:size-24 lg:size-32" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Add to Website */}
          <div
            className="animate-fade-in-up flex flex-col items-center gap-8 sm:gap-10 md:gap-12 lg:flex-row-reverse lg:gap-16"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="text-center lg:w-1/2 lg:text-left">
              <div className="mb-8 flex items-center justify-center gap-4 sm:mb-10 sm:gap-5 md:mb-12 lg:justify-start">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg sm:size-14 md:size-16">
                  <span className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                    2
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                  Add to your website
                </h3>
              </div>
              <p className="mb-8 text-base leading-relaxed text-muted-foreground sm:mb-10 sm:text-lg md:mb-12 md:text-xl lg:text-2xl">
                One line of code adds the Rolto widget to your website.
                Customize the look and feel to match your brand perfectly.
              </p>
              <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900 p-4 font-mono text-sm text-green-400 sm:rounded-2xl sm:p-5 sm:text-base md:p-6 md:text-lg lg:text-xl">
                &lt;script
                src=&quot;https://app.rolto.io/widget.js&quot;&gt;&lt;/script&gt;
              </div>
            </div>
            <div className="hidden w-full sm:block lg:w-1/2">
              <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-4 shadow-xl dark:from-green-950 dark:to-green-900 sm:rounded-3xl sm:p-6 md:p-8 lg:p-12">
                <div className="flex h-32 items-center justify-center sm:h-40 md:h-48 lg:h-56 xl:h-64">
                  <Icons.code className="size-16 text-green-600 dark:text-green-400 sm:size-20 md:size-24 lg:size-32" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Watch it work */}
          <div
            className="animate-fade-in-up flex flex-col items-center gap-8 sm:gap-10 md:gap-12 lg:flex-row lg:gap-16"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-center lg:w-1/2 lg:text-left">
              <div className="mb-8 flex items-center justify-center gap-4 sm:mb-10 sm:gap-5 md:mb-12 lg:justify-start">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg sm:size-14 md:size-16">
                  <span className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                    3
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                  Watch it work
                </h3>
              </div>
              <p className="mb-8 text-base leading-relaxed text-muted-foreground sm:mb-10 sm:text-lg md:mb-12 md:text-xl lg:text-2xl">
                Customers get instant answers to their questions. Complex issues
                are automatically escalated to your team with full context.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 sm:size-8">
                    <Icons.zap className="size-4 text-blue-600 sm:size-5" />
                  </div>
                  <span className="text-base font-medium sm:text-lg">
                    Instant responses
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 sm:size-8">
                    <Icons.brain className="size-4 text-blue-600 sm:size-5" />
                  </div>
                  <span className="text-base font-medium sm:text-lg">
                    Smart escalation
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 sm:size-8">
                    <Icons.analytics className="size-4 text-blue-600 sm:size-5" />
                  </div>
                  <span className="text-base font-medium sm:text-lg">
                    Full analytics
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 sm:size-8">
                    <Icons.shield className="size-4 text-blue-600 sm:size-5" />
                  </div>
                  <span className="text-base font-medium sm:text-lg">
                    Secure & private
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden w-full sm:block lg:w-1/2">
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 shadow-xl dark:from-blue-950 dark:to-blue-900 sm:rounded-3xl sm:p-6 md:p-8 lg:p-12">
                <div className="flex h-32 items-center justify-center sm:h-40 md:h-48 lg:h-56 xl:h-64">
                  <Icons.bot className="size-16 text-blue-600 dark:text-blue-400 sm:size-20 md:size-24 lg:size-32" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="animate-fade-in-up mt-16 px-4 text-center [animation-delay:700ms] sm:mt-20 md:mt-24 lg:mt-32">
          <h3 className="mb-6 text-xl font-bold sm:mb-8 sm:text-2xl md:mb-10 md:text-3xl lg:mb-12 lg:text-4xl">
            Ready to transform your website?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-sm text-muted-foreground sm:mb-10 sm:text-base md:mb-12 md:text-lg lg:mb-14 lg:text-xl">
            Join hundreds of businesses already using Rolto to provide better
            customer experiences.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <button
              onClick={() => setShowLeadCaptureModal(true)}
              className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-blue-700 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            >
              Join Now
              <Icons.arrowRight className="ml-2 size-4 sm:size-5" />
            </button>
            <Link
              href="/pricing"
              className="inline-flex w-full items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-base font-semibold text-foreground transition-all duration-200 hover:scale-105 hover:border-border/60 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
