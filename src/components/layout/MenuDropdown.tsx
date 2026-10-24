"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { navigationItemClasses } from "@/components/layout/navigationStyles";
import { classNames } from "@/lib/classNames";
import { menuCategories } from "@/lib/siteNavigation";

type MenuDropdownProps = {
  active: boolean;
  pathname: string;
};

export function MenuDropdown({ active, pathname }: MenuDropdownProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      const details = detailsRef.current;

      if (details?.open && !details.contains(event.target as Node)) {
        details.open = false;
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  }, [pathname]);

  function handleKeyDown(event: KeyboardEvent<HTMLDetailsElement>) {
    if (event.key === "Escape" && detailsRef.current?.open) {
      event.preventDefault();
      detailsRef.current.open = false;
      summaryRef.current?.focus();
    }
  }

  return (
    <li className="relative">
      <details ref={detailsRef} className="group" onKeyDown={handleKeyDown}>
        <summary
          ref={summaryRef}
          className={classNames(
            navigationItemClasses(active),
            "cursor-pointer list-none [&::-webkit-details-marker]:hidden",
          )}
        >
          Menu
          <ChevronDown
            aria-hidden="true"
            size={16}
            strokeWidth={1.75}
            className="transition-transform duration-[var(--duration-fast)] group-open:rotate-180"
          />
        </summary>
        <div className="absolute top-full left-1/2 z-50 w-72 -translate-x-1/2 pt-2">
          <ul className="rounded-surface border border-border bg-surface p-2 shadow-surface">
            {menuCategories.map(({ href, label }) => {
              const selected = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={selected ? "page" : undefined}
                    onClick={() => {
                      if (detailsRef.current) {
                        detailsRef.current.open = false;
                      }
                    }}
                    className={classNames(
                      "flex min-h-11 items-center rounded-control px-3 font-body text-sm no-underline transition-colors duration-[var(--duration-fast)]",
                      selected
                        ? "bg-secondary font-semibold text-primary"
                        : "text-foreground hover:bg-secondary hover:text-primary",
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </details>
    </li>
  );
}
