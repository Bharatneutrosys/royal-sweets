import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export function BrandStorySection() {
  return (
    <Section aria-labelledby="story-heading" surface="light">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div className="max-w-xl">
          <SectionHeading
            id="story-heading"
            eyebrow="Our Story"
            title="A Place for Sweet and Savory Traditions"
            description="At Royal Sweets & Fast Food in Richardson, discover Indian sweets, chaat, snacks, and comforting favorites in one destination."
          />
          <p className="mt-5 font-body text-body text-muted">
            Some flavors bring back a familiar memory. Others become a new
            favorite. Explore both sides of the menu and find something to
            share.
          </p>
          <ButtonLink href="/menu" variant="outline" className="mt-8">
            Explore Our Menu
          </ButtonLink>
        </div>

        <figure className="min-w-0">
          <div className="grid grid-cols-2 items-start gap-3 sm:gap-5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-surface bg-surface-muted">
              <Image
                src="/images/products/jalebi.webp"
                alt="Illustrative golden jalebi sweets garnished with rose petals"
                fill
                sizes="(max-width: 1023px) 43vw, 20vw"
                className="object-cover"
              />
            </div>
            <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-surface bg-surface-muted sm:mt-12">
              <Image
                src="/images/products/chole-bhature.webp"
                alt="Illustrative chole and fried bhatura bread"
                fill
                sizes="(max-width: 1023px) 43vw, 20vw"
                className="object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-3 font-body text-caption text-muted">
            Illustrative Indian food photography
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}
