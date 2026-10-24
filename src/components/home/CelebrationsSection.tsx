import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { ButtonLink } from "@/components/ui/Button";
import { business } from "@/lib/business";

export function CelebrationsSection() {
  return (
    <section
      aria-labelledby="celebrations-heading"
      className="celebrations-section section-space overflow-hidden bg-primary text-on-primary"
    >
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
        <figure className="order-2 lg:order-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-surface bg-primary-hover">
            <Image
              src="/images/products/ladoo.webp"
              alt="Illustrative ladoo sweets arranged beside a candle"
              fill
              sizes="(max-width: 1023px) calc(100vw - 2.5rem), 40vw"
              className="object-cover object-[center_58%]"
            />
          </div>
          <figcaption className="mt-3 font-body text-caption text-on-primary/80">
            Illustrative sweets photography
          </figcaption>
        </figure>

        <div className="order-1 lg:order-2">
          <div className="mb-5 flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-9 bg-antique-gold" />
            <p className="font-body text-label font-bold tracking-[0.18em] text-on-primary uppercase">
              Celebrations &amp; Group Orders
            </p>
          </div>
          <h2
            id="celebrations-heading"
            className="max-w-[15ch] font-display text-section font-semibold text-on-primary"
          >
            Bring a Little Sweetness to the Occasion
          </h2>
          <p className="mt-6 max-w-xl font-body text-body text-on-primary/90">
            Planning a gathering or group order? Explore traditional sweets and
            savory favorites, then call us to ask about current options for your
            occasion.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink
              href={business.phone.href}
              prefetch={false}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Ask About Group Orders
            </ButtonLink>
            <Link
              href="/menu/sweets"
              className="celebrations-link inline-flex min-h-12 items-center rounded-control px-2 font-body text-button font-semibold underline-offset-4"
            >
              Explore Sweets
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
