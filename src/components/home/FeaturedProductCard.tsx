import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { menuCategories } from "@/lib/siteNavigation";
import type { FeaturedProduct } from "@/types/featuredProduct";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function FeaturedProductCard({
  product,
  layout,
}: {
  product: FeaturedProduct;
  layout: "vertical" | "horizontal";
}) {
  const category = menuCategories.find(
    (category) => category.slug === product.categoryId,
  );
  if (!category)
    throw new Error(`Unknown menu category: ${product.categoryId}`);

  return (
    <Link
      href={category.href}
      aria-labelledby={`product-${product.id}`}
      className="product-link group block min-w-0 rounded-surface no-underline focus-visible:outline-offset-4"
    >
      <Card
        hoverable
        className={`flex h-full overflow-hidden ${layout === "horizontal" ? "flex-col lg:flex-row" : "flex-col"}`}
      >
        <MediaFrame
          src={product.image}
          alt={product.imageAlt}
          aspect="square"
          sizes={
            layout === "horizontal"
              ? "(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1023px) calc((100vw - 4rem) / 2), (max-width: 1440px) 24vw, 260px"
              : "(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1023px) calc((100vw - 4rem) / 2), (max-width: 1440px) calc((100vw - 8rem) / 3), 420px"
          }
          className={`shrink-0 rounded-none border-0 ${layout === "horizontal" ? "lg:w-[42%] lg:aspect-auto lg:self-stretch" : ""}`}
        />

        <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-7">
          <p className="font-body text-caption font-bold tracking-[0.15em] text-primary uppercase">
            {category.label}
          </p>
          <h3
            id={`product-${product.id}`}
            className="mt-2 font-display text-card font-semibold text-primary"
          >
            {product.name}
          </h3>
          <p className="mt-3 font-body text-supporting text-muted">
            {product.shortDescription}
          </p>
          <div className="mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-3 pt-6">
            <div>
              <span className="block font-body text-caption text-muted">
                Online price
              </span>
              <span className="font-body text-price font-bold text-foreground">
                {currency.format(product.onlinePriceCents / 100)}
              </span>
            </div>
            <span className="product-action inline-flex items-center gap-1.5 font-body text-button font-bold text-primary">
              View menu
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 shrink-0"
                strokeWidth={1.75}
              />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
