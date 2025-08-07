import Image from "next/image";

import { testimonials } from "@/config/landing";
import { HeaderSection } from "@/components/shared/header-section";

export default function Testimonials() {
  return (
    <section>
      <div className="container flex max-w-6xl flex-col gap-8 sm:gap-10 py-16 sm:py-24 md:py-32 sm:gap-y-16">
        <div className="text-gradient_indigo-purple mb-3 sm:mb-4 font-semibold">Testimonials</div>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">
          What our clients are sharing.
        </h2>
        <p className="mt-4 sm:mt-6 text-balance text-sm sm:text-base md:text-lg text-muted-foreground">
          Discover the glowing feedback from teams using Rolto to transform their websites into intelligent conversational platforms.
        </p>

        <div className="column-1 gap-3 sm:gap-5 space-y-3 sm:space-y-5 md:columns-2 lg:columns-3">
          {testimonials.map((item) => (
                          <div className="break-inside-avoid" key={item.name}>
                <div className="relative rounded-lg sm:rounded-xl border bg-muted/25">
                  <div className="flex flex-col px-3 sm:px-4 py-4 sm:py-5 md:p-6">
                    <div>
                      <div className="relative mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                        <span className="relative inline-flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-full text-base">
                          <Image
                            width={100}
                            height={100}
                            className="size-full rounded-full border"
                            src={item.image}
                            alt={item.name}
                          />
                        </span>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-foreground">
                            {item.name}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {item.job}
                          </p>
                        </div>
                      </div>
                      <q className="text-xs sm:text-sm md:text-base text-muted-foreground">{item.review}</q>
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
