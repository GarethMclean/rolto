"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";

import { docsConfig } from "@/config/docs";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { DocsSidebarNav } from "@/components/docs/sidebar-nav";
import { ModalContext } from "@/components/modals/providers";
import { Icons } from "@/components/shared/icons";

import { useMobileMenu } from "./mobile-menu-context";
import { ModeToggle } from "./mode-toggle";

export function NavMobile() {
  const { data: session } = useSession();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenu();
  const selectedLayout = useSelectedLayoutSegment();
  const documentation = selectedLayout === "docs";
  const { setShowLeadCaptureModal } = useContext(ModalContext);

  const configMap = {
    docs: docsConfig.mainNav,
  };

  const links =
    (selectedLayout && configMap[selectedLayout]) || marketingConfig.mainNav;

  // prevent body scroll when modal is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={cn(
          "fixed right-2 top-2.5 z-50 rounded-full p-2 transition-colors duration-200 hover:bg-muted focus:outline-none active:bg-muted md:hidden",
          isMobileMenuOpen && "bg-muted hover:bg-muted/80",
        )}
      >
        {isMobileMenuOpen ? (
          <X className="size-5 text-muted-foreground" />
        ) : (
          <Menu className="size-5 text-muted-foreground" />
        )}
      </button>

      <nav
        className={cn(
          "fixed inset-0 z-30 hidden w-full overflow-auto bg-background px-5 py-16 lg:hidden",
          isMobileMenuOpen && "block",
        )}
      >
        <ul className="grid divide-y divide-muted">
          {links &&
            links.length > 0 &&
            links.map(({ title, href }) => (
              <li key={href} className="py-3">
                <Link
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full font-medium capitalize"
                >
                  {title}
                </Link>
              </li>
            ))}

          {session ? (
            <>
              {session.user.role === "ADMIN" ? (
                <li className="py-3">
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex w-full font-medium capitalize"
                  >
                    Admin
                  </Link>
                </li>
              ) : null}

              <li className="py-3">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full font-medium capitalize"
                >
                  Dashboard
                </Link>
              </li>
            </>
          ) : (
            <li className="py-3">
              <button
                onClick={() => {
                  setShowLeadCaptureModal(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex w-full font-medium capitalize"
              >
                Join Now
              </button>
            </li>
          )}
        </ul>

        {documentation ? (
          <div className="mt-8 block md:hidden">
            <DocsSidebarNav setOpen={setIsMobileMenuOpen} />
          </div>
        ) : null}

        <div className="mt-5 flex items-center justify-end space-x-4">
          <ModeToggle />
        </div>
      </nav>
    </>
  );
}
