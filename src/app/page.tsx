import { HeroSection } from "@/components/home/HeroSection";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { BrandStorySection } from "@/components/home/BrandStorySection";
import { CelebrationsSection } from "@/components/home/CelebrationsSection";
import { VisitSection } from "@/components/home/VisitSection";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProductsSection section="sweets" />
      <FeaturedProductsSection section="favorites" />
      <BrandStorySection />
      <CelebrationsSection />
      <VisitSection />
    </main>
  );
}
