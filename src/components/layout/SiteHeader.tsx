import { BrandLogo } from "@/components/layout/BrandLogo";
import { DesktopNavigation } from "@/components/layout/DesktopNavigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Container } from "@/components/shared/Container";
import { ButtonLink } from "@/components/ui/Button";

const orderingUrl =
  "https://order.online/store/royal-sweets-fast-food-west-belt-line-road-303445";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <Container className="flex min-h-18 items-center justify-between gap-3 py-3 lg:grid lg:min-h-24 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-8">
        <BrandLogo />
        <DesktopNavigation />
        <div className="flex justify-end">
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
      </Container>
      <MobileNavigation />
    </header>
  );
}
