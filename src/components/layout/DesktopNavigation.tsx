"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuDropdown } from "@/components/layout/MenuDropdown";
import { navigationItemClasses } from "@/components/layout/navigationStyles";
import {
  isNavigationActive,
  siteLinks,
  type MenuNavigationItem,
} from "@/lib/siteNavigation";

export function DesktopNavigation({
  menuCategories,
}: {
  menuCategories: MenuNavigationItem[];
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className="hidden lg:block">
      <ul className="flex items-center gap-5 xl:gap-8">
        {siteLinks.map(({ href, label }) => {
          const active = isNavigationActive(pathname, href);

          if (href === "/menu") {
            return (
              <MenuDropdown
                key={href}
                active={active}
                pathname={pathname}
                menuCategories={menuCategories}
              />
            );
          }

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={navigationItemClasses(active)}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
