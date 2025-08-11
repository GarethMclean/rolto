import { UserRole } from "@prisma/client";

import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      {
        href: "/admin",
        icon: "laptop",
        title: "Admin Panel",
        authorizeOnly: UserRole.ADMIN,
      },
      { href: "/dashboard", icon: "laptop", title: "Dashboard" },
      {
        href: "/dashboard/billing",
        icon: "billing",
        title: "Billing",
        authorizeOnly: UserRole.USER,
      },
      { href: "/dashboard/charts", icon: "analytics", title: "Charts" },
      {
        href: "/admin/orders",
        icon: "post",
        title: "Orders",
        badge: 2,
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/admin/referrals",
        icon: "users",
        title: "Referrals",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "#/dashboard/posts",
        icon: "post",
        title: "User Posts",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
  {
    title: "OPTIONS",
    items: [
      { href: "/dashboard/settings", icon: "settings", title: "Settings" },
      { href: "/", icon: "logo", title: "Homepage" },
      { href: "/docs", icon: "code", title: "Documentation" },
      {
        href: "#",
        icon: "messageSquare",
        title: "Support",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
];
