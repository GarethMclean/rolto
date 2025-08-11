"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Icons } from "@/components/shared/icons";

// Dynamically import the component to prevent SSR issues with usePathname
const SidebarNavContent = dynamic(() => import("./sidebar-nav-content"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export function DocsSidebarNav({ setOpen }: { setOpen?: (boolean) => void }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SidebarNavContent setOpen={setOpen} />
    </Suspense>
  );
}

export function SidebarNav({ items }: { items: any[] }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SidebarNavContent setOpen={undefined} />
    </Suspense>
  );
}
