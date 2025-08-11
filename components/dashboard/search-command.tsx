"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Icons } from "@/components/shared/icons";

// Dynamically import the component to prevent SSR issues with useRouter
const SearchCommandContent = dynamic(() => import("./search-command-content"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export function SearchCommand({ links }: { links: any[] }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchCommandContent links={links} />
    </Suspense>
  );
}
