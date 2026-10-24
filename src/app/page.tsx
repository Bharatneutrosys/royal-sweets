import { HeroSection } from "@/components/home/HeroSection";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProductsSection section="sweets" />
      <FeaturedProductsSection section="favorites" />
    </main>
  );
}
