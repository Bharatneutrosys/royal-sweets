"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { navigationItemClasses } from "@/components/layout/navigationStyles";
import { isNavigationActive, siteLinks } from "@/lib/siteNavigation";

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <div className="border-t border-border lg:hidden">
      <Container>
        <nav
          aria-label="Mobile navigation"
          className="overflow-x-auto overscroll-x-contain"
        >
          <ul className="flex w-max items-center gap-5">
            {siteLinks.map(({ href, label }) => {
              const active = isNavigationActive(pathname, href);

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
      </Container>
    </div>
  );
}
