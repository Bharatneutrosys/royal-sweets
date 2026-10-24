import Image from "next/image";
import heroImage from "../../../public/images/hero/indian-mithai-assortment.webp";
import { Container } from "@/components/shared/Container";
import { ButtonLink } from "@/components/ui/Button";
import { orderingUrl } from "@/lib/business";

const photoSource =
  "https://unsplash.com/photos/a-plate-of-assorted-desserts-on-a-table-UEtHJ8lSuwY";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-background"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-[38%] bg-secondary/55 lg:block"
      />
      <Container className="relative grid items-center gap-14 py-14 sm:py-20 lg:min-h-[760px] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:py-20">
        <div className="hero-copy-enter max-w-2xl">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-10 shrink-0 bg-antique-gold"
            />
            <p className="font-body text-label font-bold tracking-[0.2em] text-primary uppercase">
              Royal Sweets &amp; Fast Food
            </p>
          </div>
          <h1
            id="hero-heading"
            className="mt-7 max-w-[12ch] font-display text-hero font-semibold text-primary"
          >
            A Royal Taste of <em className="font-normal">India</em>
          </h1>
          <p className="mt-7 max-w-xl font-body text-body text-muted sm:text-lg">
            Discover the richness of traditional Indian sweets, flavorful street
            food, and timeless favorites, all in one delicious destination.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <ButtonLink href="/menu" size="lg" className="w-full sm:w-auto">
              Explore Our Menu
            </ButtonLink>
            <ButtonLink
              href={orderingUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order Online (opens in a new tab)"
              prefetch={false}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Order Online
            </ButtonLink>
          </div>
          <p className="mt-10 border-l border-antique-gold pl-4 font-body text-sm text-muted">
            Richardson, Texas
          </p>
        </div>

        <figure className="hero-visual-enter mx-auto w-full max-w-[36rem]">
          <div className="relative p-2.5 sm:p-3">
            <div
              aria-hidden="true"
              className="absolute inset-0 border border-antique-gold/80"
            />
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              <Image
                src={heroImage}
                alt="Assorted traditional Indian sweets arranged on an ornate brass platter with rose petals"
                fill
                priority
                placeholder="blur"
                sizes="(max-width: 639px) calc(100vw - 3.75rem), (max-width: 1023px) min(calc(100vw - 4.5rem), 34.5rem), min(43vw, 34.5rem)"
                className="object-cover object-[center_52%]"
              />
            </div>
          </div>
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
        </figure>
      </Container>
    </section>
  );
}
