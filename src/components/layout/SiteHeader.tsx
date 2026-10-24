import { BrandLogo } from "@/components/layout/BrandLogo";
import { DesktopNavigation } from "@/components/layout/DesktopNavigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Container } from "@/components/shared/Container";
import { ButtonLink } from "@/components/ui/Button";
import { orderingUrl } from "@/lib/siteNavigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <Container className="flex min-h-16 items-center justify-between gap-3 py-2.5 sm:min-h-18 lg:grid lg:min-h-24 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-8 lg:py-3">
        <BrandLogo />
        <DesktopNavigation />
        <div className="flex items-center justify-end gap-2">
          <div className="hidden sm:block">
            <ButtonLink
              href={orderingUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order Online (opens in a new tab)"
              prefetch={false}
              size="sm"
              className="shrink-0 whitespace-nowrap"
            >
              Order Online
            </ButtonLink>
          </div>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
