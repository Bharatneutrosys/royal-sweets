import { HeroSection } from "@/components/home/HeroSection";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { HomepageSpecials } from "@/components/home/HomepageSpecials";
import { VisitSection } from "@/components/home/VisitSection";
import { getPublicCatalog } from "@/lib/supabase/catalog";
import { getPublicHomepage } from "@/lib/supabase/homepage";

export default async function HomePage() {
  const result = await Promise.all([
    getPublicCatalog(),
    getPublicHomepage(),
  ]).catch(() => null);
  if (!result)
    return (
      <main id="main-content" tabIndex={-1} className="page-container py-20">
        <h1 className="font-display text-page text-primary">
          Royal Sweets &amp; Fast Food
        </h1>
        <p className="mt-4 text-muted">
          Website content is temporarily unavailable. Please call us for current
          details.
        </p>
      </main>
    );
  const [catalog, homepage] = result;
  const sections = homepage.sections
    .filter((item) => item.isVisible)
    .sort((a, b) => a.displayOrder - b.displayOrder);
  const heroVisible = sections.some((item) => item.type === "hero");
  const firstOfferId = sections.find(
    (item) => item.type === "offers" || item.type === "specials",
  )?.id;
  return (
    <main id="main-content" tabIndex={-1}>
      {!heroVisible && (
        <h1 className="sr-only">Royal Sweets &amp; Fast Food</h1>
      )}
      {sections.map((section) => {
        if (section.type === "hero")
          return <HeroSection key={section.id} content={section} />;
        if (section.type === "categories")
          return (
            <CategoryShowcase
              key={section.id}
              content={section}
              categories={catalog.categories}
            />
          );
        if (section.type === "visit")
          return <VisitSection key={section.id} content={section} />;
        if (section.type === "offers" || section.type === "specials") {
          if (section.id !== firstOfferId) return null;
          return (
            <HomepageSpecials
              key={section.id}
              specials={
                sections.some((item) => item.type === "specials")
                  ? homepage.specials
                  : []
              }
              promotions={
                sections.some((item) => item.type === "offers")
                  ? homepage.promotions
                  : []
              }
              products={catalog.products}
              categories={catalog.categories}
            />
          );
        }
        return null;
      })}
    </main>
  );
}
