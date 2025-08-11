"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Icons } from "@/components/shared/icons";

// Dynamically import the component to prevent SSR issues with useParams
const BlogHeaderLayoutContent = dynamic(() => import("./blog-header-layout-content"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export function BlogHeaderLayout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogHeaderLayoutContent />
    </Suspense>
  );
}
