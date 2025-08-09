import { ImageResponse } from "@vercel/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        tw="flex relative flex-col p-12 w-full h-full items-start justify-center"
        style={{
          color: "#000",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
        }}
      >
        {/* Background Pattern */}
        <div
          tw="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, #6366f1 0%, transparent 50%), radial-gradient(circle at 75% 75%, #a855f7 0%, transparent 50%)",
          }}
        />

        {/* Main Content */}
        <div tw="relative z-10 flex flex-col w-full">
          {/* Trust Badge */}
          <div
            tw="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 mb-8 w-fit"
            style={{
              borderColor: "#bfdbfe",
              backgroundColor: "#eff6ff",
              color: "#1d4ed8",
            }}
          >
            <div tw="w-2 h-2 rounded-full bg-green-500" />
            <span>Join the future of customer support</span>
          </div>

          {/* Main Heading */}
          <div
            tw="text-6xl font-extrabold leading-tight mb-6"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
              backgroundClip: "text",
              color: "transparent",
              fontSize: "72px",
              lineHeight: "1.1",
            }}
          >
            Rolto
          </div>

          {/* Subtitle */}
          <div
            tw="text-2xl leading-relaxed text-gray-600 mb-8 max-w-2xl"
            style={{
              color: "#4b5563",
              fontSize: "28px",
              lineHeight: "1.4",
            }}
          >
            Transform Your Website into an Intelligent Conversational Platform
          </div>

          {/* Description */}
          <div
            tw="text-lg leading-relaxed text-gray-500 mb-8 max-w-xl"
            style={{
              color: "#6b7280",
              fontSize: "20px",
              lineHeight: "1.5",
            }}
          >
            Capture leads, provide instant support, and engage visitors with AI that understands your business.
          </div>

          {/* Trust Indicators */}
          <div tw="flex items-center gap-6 text-sm text-gray-500">
            <div tw="flex items-center gap-2">
              <div tw="w-4 h-4 rounded-full bg-green-500" />
              <span>Setup in 5 minutes</span>
            </div>
            <div tw="flex items-center gap-2">
              <div tw="w-4 h-4 rounded-full bg-green-500" />
              <span>14-day free trial</span>
            </div>
            <div tw="flex items-center gap-2">
              <div tw="w-4 h-4 rounded-full bg-green-500" />
              <span>24/7 AI support</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div tw="absolute bottom-12 left-12 right-12 flex items-center justify-between">
          <div tw="flex items-center text-xl">
            <div
              tw="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div tw="flex flex-col ml-3">
              <div
                tw="text-lg font-semibold"
              >
                Rolto
              </div>
              <div>
                AI-Powered Conversational Platform
              </div>
            </div>
          </div>

          <div
            tw="flex items-center text-lg"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                stroke="#6b7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                stroke="#6b7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div tw="ml-2">rolto.io</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
