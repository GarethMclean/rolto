"use client";

import { useContext } from "react";
import { Icons } from "@/components/shared/icons";
import { ModalContext } from "@/components/modals/providers";
import Link from "next/link";

export default function PreviewLanding() {
  const { setShowLeadCaptureModal } = useContext(ModalContext);

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 animate-fade-in-up px-4">
            How Rolto works
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-fade-in-up px-4">
            Transform your website into an intelligent conversational platform in three simple steps
          </p>
        </div>

        {/* How it works - Apple-style Layout */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-32">
          {/* Step 1: Upload Content */}
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">Upload your content</h3>
              </div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-4 sm:mb-6 md:mb-8 px-4 lg:px-0">
                Add your documentation, FAQs, knowledge base, and any other content. Rolto learns from everything you upload to provide accurate, context-aware answers.
              </p>
              <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground px-4 lg:px-0">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Icons.check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                  <span>PDFs & Documents</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Icons.check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                  <span>Web Pages & Knowledge Base</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Icons.check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                  <span>Custom Training Data</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full hidden sm:block">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl">
                <div className="flex items-center justify-center h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64">
                  <Icons.upload className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Add to Website */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">Add to your website</h3>
              </div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-4 sm:mb-6 md:mb-8 px-4 lg:px-0">
                One line of code adds the Rolto widget to your website. Customize the look and feel to match your brand perfectly.
              </p>
              <div className="bg-gray-900 text-green-400 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl font-mono text-xs sm:text-sm md:text-base lg:text-lg border border-gray-800 mx-4 lg:mx-0 overflow-x-auto">
                &lt;script src="https://app.rolto.io/widget.js"&gt;&lt;/script&gt;
              </div>
            </div>
            <div className="lg:w-1/2 w-full hidden sm:block">
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl">
                <div className="flex items-center justify-center h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64">
                  <Icons.code className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Watch it work */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 animate-fade-in-up [animation-delay:600ms]">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-600 text-white text-xl sm:text-2xl font-bold rounded-2xl">
                  3
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">Watch it work</h3>
              </div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Customers get instant answers to their questions. Complex issues are automatically escalated to your team with full context.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Icons.zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-blue-600" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">Instant responses</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Icons.brain className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-blue-600" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">Smart escalation</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Icons.analytics className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-blue-600" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">Full analytics</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Icons.shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-blue-600" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">Secure & private</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center hidden sm:flex">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-square bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-blue-100">
                  <Icons.bot className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-800/20 to-transparent rounded-2xl sm:rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in-up [animation-delay:700ms] px-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">
            Ready to transform your website?
          </h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto">
            Join hundreds of businesses already using Rolto to provide better customer experiences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setShowLeadCaptureModal(true)}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-200 text-base sm:text-lg hover:scale-105 w-full sm:w-auto"
            >
              Join Now
              <Icons.arrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </button>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-background text-foreground font-semibold rounded-full border border-border hover:border-border/60 transition-all duration-200 text-base sm:text-lg hover:scale-105 w-full sm:w-auto"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
