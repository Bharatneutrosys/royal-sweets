import { HeroSection } from "@/components/home/HeroSection";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { HomepageSpecials } from "@/components/home/HomepageSpecials";
import { VisitSection } from "@/components/home/VisitSection";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <HeroSection />
      <CategoryShowcase />
      <HomepageSpecials />
      <VisitSection />
    </main>
  );
}
