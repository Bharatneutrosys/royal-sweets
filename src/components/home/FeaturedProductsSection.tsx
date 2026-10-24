import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FeaturedProductCard } from "@/components/home/FeaturedProductCard";
import { orderingUrl } from "@/lib/business";
import { featuredProducts } from "@/lib/featuredProducts";
import type { FeaturedSectionId } from "@/types/featuredProduct";

const sectionContent = {
  sweets: {
    eyebrow: "The Sweeter Side of Tradition",
    title: "Discover Our Signature Sweets",
    description:
      "From delicate milk-based desserts to golden syrup-soaked favorites, explore the timeless flavors of Indian mithai.",
    href: "/menu/sweets",
    action: "View All Sweets",
  },
  favorites: {
    eyebrow: "Customer Favorites to Explore",
    title: "More Than Just Sweets",
    description:
      "Discover comforting Indian meals, vibrant street-food favorites, and refreshing traditional drinks.",
    href: "/menu",
    action: "Explore Full Menu",
  },
} as const;

export function FeaturedProductsSection({
  section,
}: {
  section: FeaturedSectionId;
}) {
  const content = sectionContent[section];
  const products = featuredProducts
    .filter((product) => product.featuredSection === section)
    .sort((a, b) => a.displayOrder - b.displayOrder);
  const isFavorites = section === "favorites";

  return (
    <Section
      aria-labelledby={`featured-${section}-heading`}
      surface={isFavorites ? "sand" : "default"}
    >
      <Container>
        <div className={isFavorites ? "text-center" : ""}>
          <SectionHeading
            id={`featured-${section}-heading`}
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            align={isFavorites ? "center" : "left"}
            className="mb-9 sm:mb-12"
          />
        </div>

        <div
          className={`grid gap-[var(--grid-gap)] md:grid-cols-2 ${isFavorites ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}
        >
          {products.map((product) => (
            <FeaturedProductCard
              key={product.id}
              product={product}
              layout={isFavorites ? "horizontal" : "vertical"}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl font-body text-caption text-muted">
            Descriptions reflect traditional dishes; photos are illustrative.
            Online prices were supplied from the ordering menu. Confirm current
            prices when ordering; in-store prices may differ.
          </p>
          <div className="flex w-full shrink-0 flex-wrap gap-3 sm:w-auto">
            <ButtonLink
              href={content.href}
              variant={isFavorites ? "outline" : "primary"}
              className="w-full sm:w-auto"
            >
              {content.action}
            </ButtonLink>
            {isFavorites && (
              <ButtonLink
                href={orderingUrl}
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
                aria-label="Order Online (opens in a new tab)"
                className="w-full sm:w-auto"
              >
                Order Online
              </ButtonLink>
            )}
          </div>
        </div>

        <details className="mt-6 max-w-3xl font-body text-caption text-muted">
          <summary className="w-fit cursor-pointer text-primary underline-offset-4 focus-visible:outline-offset-4">
            Photography credits and licenses
          </summary>
          <p className="mt-3">
            Photos are illustrative. New product images were resized and
            converted to WebP; card framing may crop them. CC BY-SA 4.0
            derivatives are shared under that license.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {products.map((product) => (
              <li key={product.id}>
                {product.name}: {product.imageCredit.creator},{" "}
                <a href={product.imageCredit.sourceUrl} className="underline">
                  {product.imageCredit.title}
                </a>{" "}
                (
                <a href={product.imageCredit.licenseUrl} className="underline">
                  {product.imageCredit.license}
                </a>
                )
              </li>
            ))}
          </ul>
        </details>
      </Container>
    </Section>
  );
}
