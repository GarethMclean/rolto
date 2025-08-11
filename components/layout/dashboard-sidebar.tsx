"use client";

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { Icons } from "@/components/shared/icons";

// Dynamically import the component to prevent SSR issues with usePathname
const DashboardSidebarContent = dynamic(() => import("./dashboard-sidebar-content"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

// Dynamically import the mobile sidebar to prevent SSR issues
const MobileSheetSidebarContent = dynamic(() => import("./mobile-sheet-sidebar-content"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export function DashboardSidebar({ links }: { links: any[] }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardSidebarContent links={links} />
    </Suspense>
  );
}

export function MobileSheetSidebar({ links }: { links: any[] }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MobileSheetSidebarContent links={links} />
    </Suspense>
  );
}
