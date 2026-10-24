import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/Card";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { homeCategories } from "@/lib/homeCategories";

export function CategoryShowcase() {
  return (
    <Section aria-labelledby="categories-heading" surface="light">
      <Container>
        <SectionHeading
          id="categories-heading"
          eyebrow="Explore the menu"
          title="Find Your Craving"
          description="Browse the full menu by category."
          className="mb-7"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeCategories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="category-link group block min-w-0 rounded-surface no-underline focus-visible:outline-offset-4"
              aria-labelledby={`category-${category.id}`}
            >
              <Card hoverable className="h-full overflow-hidden">
                <MediaFrame
                  src={category.image}
                  alt={category.imageAlt}
                  aspect="landscape"
                  sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1023px) calc((100vw - 4rem) / 2), (max-width: 1440px) calc((100vw - 8rem) / 3), 420px"
                  className="rounded-none border-0"
                />
                <div className="flex items-center justify-between gap-3 p-4 sm:p-5">
                  <h3
                    id={`category-${category.id}`}
                    className="font-display text-xl font-semibold text-primary"
                  >
                    {category.title}
                  </h3>
                  <span className="category-action inline-flex items-center gap-2 font-body text-button font-bold text-primary">
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={1.75}
                    />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <p className="mt-6 font-body text-caption text-muted">
          Images are illustrative; food and presentation at Royal Sweets may
          differ.
        </p>
      </Container>
    </Section>
  );
}
