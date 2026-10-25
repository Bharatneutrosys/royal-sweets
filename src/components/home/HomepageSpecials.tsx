import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import Link from "next/link";
import type { Category, Product, Promotion, TodaysSpecial } from "@/types/menu";

export function HomepageSpecials({
  specials,
  promotions,
  products,
  categories,
}: {
  specials: TodaysSpecial[];
  promotions: Promotion[];
  products: Product[];
  categories: Category[];
}) {
  const activeSpecials = specials.filter((special) =>
    products.some(
      (product) => product.id === special.productId && product.isPublished,
    ),
  );
  if (activeSpecials.length === 0 && promotions.length === 0) return null;

  return (
    <Section aria-label="Current specials and offers" surface="sand">
      <Container>
        <h2 className="font-display text-section text-primary">
          Specials &amp; Offers
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {activeSpecials.map((special) => {
            const product = products.find(
              (item) => item.id === special.productId,
            )!;
            return (
              <article key={special.id} className="surface-panel p-6">
                <h3 className="font-display text-card text-primary">
                  {product.name}
                </h3>
                {special.message && (
                  <p className="mt-2 text-muted">{special.message}</p>
                )}
                <Link
                  className="mt-4 inline-flex min-h-11 items-center font-semibold"
                  href={`/menu/${categories.find((item) => item.id === product.categoryId)?.slug ?? ""}?q=${encodeURIComponent(product.name)}`}
                >
                  View on menu
                </Link>
              </article>
            );
          })}
          {promotions.map((promotion) => (
            <article key={promotion.id} className="surface-panel p-6">
              {promotion.image && (
                <MediaFrame
                  src={promotion.image}
                  alt={promotion.imageAlt || promotion.title}
                  aspect="wide"
                  className="mb-4"
                />
              )}
              <h3 className="font-display text-card text-primary">
                {promotion.title}
              </h3>
              <p className="mt-2 text-muted">{promotion.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
