import { BrandLogo } from "@/components/layout/BrandLogo";
import { DesktopNavigation } from "@/components/layout/DesktopNavigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Container } from "@/components/shared/Container";
import { ButtonLink } from "@/components/ui/Button";
import type { MenuNavigationItem } from "@/lib/siteNavigation";

export function SiteHeader({
  menuCategories,
}: {
  menuCategories: MenuNavigationItem[];
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <Container className="flex min-h-16 items-center justify-between gap-3 py-2.5 sm:min-h-18 lg:grid lg:min-h-24 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-8 lg:py-3">
        <BrandLogo />
        <DesktopNavigation menuCategories={menuCategories} />
        <div className="flex items-center justify-end gap-2">
          <div className="hidden sm:block">
            <ButtonLink
              href="/menu"
              size="sm"
              className="shrink-0 whitespace-nowrap"
            >
              Explore Menu
            </ButtonLink>
          </div>
          <MobileNavigation menuCategories={menuCategories} />
        </div>
      </Container>
    </header>
  );
}
