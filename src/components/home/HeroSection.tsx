import Image from "next/image";
import heroImage from "../../../public/images/hero/indian-mithai-assortment.webp";
import { Container } from "@/components/shared/Container";
import { ButtonLink } from "@/components/ui/Button";
import type { HomepageSection } from "@/types/menu";

const photoSource =
  "https://unsplash.com/photos/a-plate-of-assorted-desserts-on-a-table-UEtHJ8lSuwY";

export function HeroSection({ content }: { content: HomepageSection }) {
  const image = content.image;
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-background"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-[38%] bg-secondary/55 lg:block"
      />
      <Container className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-16">
        <div className="hero-copy-enter max-w-2xl">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-10 shrink-0 bg-antique-gold"
            />
            <p className="font-body text-label font-bold tracking-[0.2em] text-primary uppercase">
              {content.eyebrow}
            </p>
          </div>
          <h1
            id="hero-heading"
            className="mt-6 max-w-[18ch] font-display text-page font-semibold text-primary"
          >
            {content.heading}
          </h1>
          <p className="mt-7 max-w-xl font-body text-body text-muted sm:text-lg">
            {content.subheading}
          </p>
          <p className="mt-4 max-w-xl font-body text-supporting text-muted">
            {content.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <ButtonLink href="/menu" size="lg" className="w-full sm:w-auto">
              Explore Our Menu
            </ButtonLink>
          </div>
        </div>

        <figure className="hero-visual-enter mx-auto w-full max-w-[30rem]">
          <div className="relative p-2.5 sm:p-3">
            <div
              aria-hidden="true"
              className="absolute inset-0 border border-antique-gold/80"
            />
            <div className="relative aspect-[5/4] overflow-hidden bg-secondary lg:aspect-[4/5]">
              {image && (
                <Image
                  src={
                    image === "/images/hero/indian-mithai-assortment.webp"
                      ? heroImage
                      : image
                  }
                  alt={content.imageAlt || "Royal Sweets homepage visual"}
                  fill
                  priority
                  unoptimized={image.startsWith("https://")}
                  sizes="(max-width: 639px) calc(100vw - 3.75rem), (max-width: 1023px) min(calc(100vw - 4.5rem), 34.5rem), min(43vw, 34.5rem)"
                  className="object-cover object-[center_52%]"
                />
              )}
            </div>
          </div>
          {image === "/images/hero/indian-mithai-assortment.webp" && (
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 font-body text-caption text-muted">
              <span>Illustrative Indian sweets photography</span>
              <a
                href={photoSource}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Photo by Gaurav Kumar on Unsplash (opens in a new tab)"
                className="text-primary underline-offset-4"
              >
                Gaurav Kumar / Unsplash
              </a>
            </figcaption>
          )}
        </figure>
      </Container>
    </section>
  );
}
