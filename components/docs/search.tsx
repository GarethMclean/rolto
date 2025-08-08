"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { allDocs } from "contentlayer/generated";

import { cn } from "@/lib/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";

interface DocsSearchProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DocsSearch({ className, ...props }: DocsSearchProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  // Filter and prepare docs for search
  const searchableDocs = allDocs
    .filter((doc) => doc.published !== false)
    .map((doc) => ({
      title: doc.title,
      description: doc.description || "",
      href: doc.slug,
      category: doc.slug.split("/")[1] || "General",
    }));

  return (
    <>
      <div
        className={cn("relative w-full", className)}
        onClick={() => setOpen(true)}
        {...props}
      >
        <Input
          type="search"
          placeholder="Search documentation..."
          className="h-8 w-full cursor-pointer sm:w-64 sm:pr-12"
          readOnly
        />
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search documentation..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Getting Started">
            {searchableDocs
              .filter((doc) => doc.category === "docs" || doc.href === "/docs")
              .map((doc) => (
                <CommandItem
                  key={doc.href}
                  onSelect={() => {
                    runCommand(() => router.push(doc.href));
                  }}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{doc.title}</span>
                    {doc.description && (
                      <span className="text-sm text-muted-foreground">
                        {doc.description}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
          {searchableDocs.some(
            (doc) => doc.category !== "docs" && doc.href !== "/docs",
          ) && (
            <CommandGroup heading="Other Documentation">
              {searchableDocs
                .filter(
                  (doc) => doc.category !== "docs" && doc.href !== "/docs",
                )
                .map((doc) => (
                  <CommandItem
                    key={doc.href}
                    onSelect={() => {
                      runCommand(() => router.push(doc.href));
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{doc.title}</span>
                      {doc.description && (
                        <span className="text-sm text-muted-foreground">
                          {doc.description}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
