import Image from "next/image";

import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { HeaderSection } from "@/components/shared/header-section";

export default function BentoGrid() {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-background">
      <MaxWidthWrapper>
        <HeaderSection
          label="Benefits"
          title="Why choose Rolto?"
          subtitle="Transform your customer support with AI that actually works. See the real benefits teams are experiencing."
        />

        <div className="text-gradient_indigo-purple mb-3 sm:mb-4 font-semibold">Benefits</div>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[40px]">
          Why choose Rolto?
        </h2>
        <p className="mt-4 sm:mt-6 text-balance text-sm sm:text-base md:text-lg text-muted-foreground">
          Transform your website into an intelligent conversational platform. See the real benefits teams are experiencing.
        </p>

        <div className="relative z-10 grid grid-cols-6 gap-2 sm:gap-3 mt-12 sm:mt-16">
          {/* Card 1: Lead Generation */}
          <div className="relative col-span-full flex overflow-hidden rounded-2xl border bg-background p-4 sm:p-6 md:p-8 lg:col-span-2">
            <div className="relative m-auto size-fit">
              <div className="relative flex h-16 sm:h-20 md:h-24 w-40 sm:w-48 md:w-56 items-center">
                <svg className="absolute inset-0 size-full text-muted-foreground/30" viewBox="0 0 254 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.049 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z" fill="currentColor"/>
                </svg>
                <span className="text-gradient_indigo-purple mx-auto block w-fit font-heading text-3xl sm:text-4xl md:text-5xl">300%</span>
              </div>
              <h2 className="mt-4 sm:mt-6 text-center font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                More Qualified Leads
              </h2>
            </div>
          </div>

          {/* Card 2: Instant Engagement */}
          <div className="relative col-span-full overflow-hidden rounded-2xl border bg-background p-4 sm:p-6 md:p-8 sm:col-span-3 lg:col-span-2">
            <div>
              <div className="relative mx-auto flex aspect-square size-20 sm:size-24 md:size-28 lg:size-32 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border before:bg-muted/20 dark:before:border-white/5">
                <svg className="m-auto h-fit w-16 sm:w-20 md:w-24" viewBox="0 0 212 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="text-muted-foreground/30" d="M44.0209 55.3542C43.1945 54.7639 42.6916 54.0272 42.5121 53.1442C42.3327 52.2611 42.5995 51.345 43.3125 50.3958C50.632 40.3611 59.812 32.5694 70.8525 27.0208C81.8931 21.4722 93.668 18.6979 106.177 18.6979C118.691 18.6979 130.497 21.3849 141.594 26.7587C152.691 32.1326 161.958 39.8936 169.396 50.0417C170.222 51.1042 170.489 52.0486 170.196 52.875C169.904 53.7014 169.401 54.4097 168.688 55C167.979 55.5903 167.153 55.8571 166.208 55.8004C165.264 55.7437 164.438 55.2408 163.729 54.2917C157.236 45.0833 148.885 38.0307 138.675 33.1337C128.466 28.2368 117.633 25.786 106.177 25.7812C94.7257 25.7812 83.9827 28.2321 73.948 33.1337C63.9132 38.0354 55.5903 45.0881 48.9792 54.2917C48.2709 55.3542 47.4445 55.9444 46.5 56.0625C45.5556 56.1806 44.7292 55.9444 44.0209 55.3542Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="relative z-10 mt-4 sm:mt-6 md:mt-8 space-y-1 sm:space-y-1.5 text-center">
                <h2 className="text-sm sm:text-base md:text-lg font-medium text-foreground">Instant Engagement</h2>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Engage visitors immediately with intelligent conversations that guide them through your funnel.</p>
              </div>
            </div>
          </div>

          {/* Card 3: Smart Analytics */}
          <div className="relative col-span-full overflow-hidden rounded-2xl border bg-background p-8 sm:col-span-3 lg:col-span-2">
            <div>
              <div className="children">
                <svg className="h-32 w-full" viewBox="0 0 386 123" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="386" height="123" rx="10"/>
                  <g clipPath="url(#clip0_0_106)">
                    <circle className="text-primary" cx="29" cy="29" r="15" fill="currentColor"/>
                    <path d="M29 23V35" className="stroke-white dark:stroke-black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path className="stroke-white dark:stroke-black" d="M35 29L29 35L23 29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <path fillRule="evenodd" clipRule="evenodd" d="M3 123C3 123 14.3298 94.153 35.1282 88.0957C55.9266 82.0384 65.9333 80.5508 65.9333 80.5508C65.9333 80.5508 80.699 80.5508 92.1777 80.5508C103.656 80.5508 100.887 63.5348 109.06 63.5348C117.233 63.5348 117.217 91.9728 124.78 91.9728C132.343 91.9728 142.264 78.03 153.831 80.5508C165.398 83.0716 186.825 91.9728 193.761 91.9728C200.697 91.9728 206.296 63.5348 214.07 63.5348C221.844 63.5348 238.653 93.7771 244.234 91.9728C249.814 90.1684 258.8 60 266.19 60C272.075 60 284.1 88.057 286.678 88.0957C294.762 88.2171 300.192 72.9284 305.423 72.9284C312.323 72.9284 323.377 65.2437 335.553 63.5348C347.729 61.8259 348.218 82.07 363.639 80.5508C367.875 80.1335 372.949 82.2017 376.437 87.1008C379.446 91.3274 381.054 97.4325 382.521 104.647C383.479 109.364 382.521 123 382.521 123" fill="url(#paint0_linear_0_106)"/>
                  <defs>
                    <linearGradient id="paint0_linear_0_106" x1="3" y1="60" x2="3" y2="123" gradientUnits="userSpaceOnUse">
                      <stop className="text-purple-600/80" stopColor="currentColor"/>
                      <stop className="text-white dark:text-transparent" offset="1" stopColor="currentColor" stopOpacity="0.103775"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="relative z-10 mt-8 space-y-1.5 text-center">
                <h2 className="text-lg font-medium text-foreground">Smart Analytics</h2>
                <p className="text-muted-foreground">Track conversations, identify opportunities, and optimize your conversational strategy.</p>
              </div>
            </div>
          </div>

          {/* Card 4: One Line Setup */}
          <div className="relative col-span-full overflow-hidden rounded-2xl border bg-background p-8 lg:col-span-3">
            <div className="grid sm:grid-cols-2">
              <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:bg-white/5 dark:before:border-white/5">
                  <svg className="m-auto size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinejoin="round" d="M5.5 7c2 0 6.5-3 6.5-3s4.5 3 6.5 3v4.5C18.5 18 12 20 12 20s-6.5-2-6.5-8.5z"/>
                  </svg>
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-medium text-foreground">One Line Setup</h2>
                  <p className="text-muted-foreground">Add conversational AI to your website with a single line of JavaScript. No complex integrations needed.</p>
                </div>
              </div>
              <div className="relative -mb-10 -mr-10 mt-8 h-fit rounded-tl-xl border bg-muted/30 pt-6 sm:ml-6 sm:mt-auto">
                <div className="absolute left-3 top-2 flex gap-1">
                  <span className="block size-2 rounded-full border border-border"></span>
                  <span className="block size-2 rounded-full border border-border"></span>
                  <span className="block size-2 rounded-full border border-border"></span>
                </div>
                <div className="p-4 font-mono text-sm">
                  <span className="text-green-600">&lt;script&gt;</span><br/>
                  <span className="text-blue-600">rolto</span>.<span className="text-purple-600">init</span>({'{'}<br/>
                  &nbsp;&nbsp;<span className="text-orange-600">apiKey</span>: <span className="text-green-600">'your-key'</span><br/>
                  {'}'});<br/>
                  <span className="text-green-600">&lt;/script&gt;</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Human Handoff */}
          <div className="relative col-span-full overflow-hidden rounded-2xl border bg-background p-8 lg:col-span-3">
            <div className="grid h-full sm:grid-cols-2">
              <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:bg-white/5 dark:before:border-white/5">
                  <svg className="m-auto size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <g fill="none">
                      <path stroke="currentColor" d="M9 6a3 3 0 1 0 6 0a3 3 0 0 0-6 0zm-4.562 7.902a3 3 0 1 0 3 5.195a3 3 0 0 0-3-5.196zm15.124 0a2.999 2.999 0 1 1-2.998 5.194a2.999 2.999 0 0 1 2.998-5.194z"/>
                      <path fill="currentColor" fillRule="evenodd" d="M9.003 6.125a2.993 2.993 0 0 1 .175-1.143a8.507 8.507 0 0 0-5.031 4.766a8.5 8.5 0 0 0-.502 4.817a3 3 0 0 1 .902-.723a7.498 7.498 0 0 1 4.456-7.717m5.994 0a7.499 7.499 0 0 1 4.456 7.717a2.998 2.998 0 0 1 .902.723a8.5 8.5 0 0 0-5.533-9.583a3 3 0 0 1 .175 1.143m2.536 13.328a3.002 3.002 0 0 1-1.078-.42a7.501 7.501 0 0 1-8.91 0l-.107.065a3 3 0 0 1-.971.355a8.5 8.5 0 0 0 11.066 0" clipRule="evenodd"/>
                    </g>
                  </svg>
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-medium text-foreground">Seamless Handoff</h2>
                  <p className="text-muted-foreground">Escalate to your team when AI needs help or you prefer human oversight for complex conversations.</p>
                </div>
              </div>
              <div className="relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px before:bg-purple-500/50 sm:-my-8 sm:-mr-8">
                <div className="relative flex h-full flex-col justify-center space-y-6 py-6">
                  <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                    <span className="block h-fit rounded-md border bg-muted/50 px-2 py-1 text-xs">AI Assistant</span>
                    <div className="size-7 ring-4 ring-background">
                      <div className="size-full rounded-full border bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">AI</div>
                    </div>
                  </div>
                  <div className="relative ml-[calc(50%-1rem)] flex items-center gap-2">
                    <div className="size-8 ring-4 ring-background">
                      <img width={100} height={100} className="size-full rounded-full border" src="https://randomuser.me/api/portraits/women/6.jpg" alt="support-agent" />
                    </div>
                    <span className="block h-fit rounded-md border bg-muted/50 px-2 py-1 text-xs">Your Team</span>
                  </div>
                  <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                    <span className="block h-fit rounded-md border bg-muted/50 px-2 py-1 text-xs">Visitor</span>
                    <div className="size-7 ring-4 ring-background">
                      <img width={100} height={100} className="size-full rounded-full border" src="https://randomuser.me/api/portraits/men/2.jpg" alt="customer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
