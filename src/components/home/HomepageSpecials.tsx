import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { activeHomepageOffers } from "@/lib/homeContent";
import { products } from "@/lib/menuCatalog";

export function HomepageSpecials() {
  const { specials, offers: activePromotions } = activeHomepageOffers();
  const activeSpecials = specials.filter((special) =>
    products.some(
      (product) => product.id === special.productId && product.isPublished,
    ),
  );
  if (activeSpecials.length === 0 && activePromotions.length === 0) return null;

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
              </article>
            );
          })}
          {activePromotions.map((promotion) => (
            <article key={promotion.id} className="surface-panel p-6">
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
