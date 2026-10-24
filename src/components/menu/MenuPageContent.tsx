import Link from "next/link";
import { Search } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { filterProducts } from "@/lib/menuCatalog";
import { primaryCategories, subcategoriesFor } from "@/lib/menuCategories";
import type { Product } from "@/types/menu";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const commonsCredits = [
  {
    dish: "Rasmalai",
    author: "Subhransuphotography",
    url: "https://commons.wikimedia.org/wiki/File:Rasa_malai.jpg",
  },
  {
    dish: "Gulab Jamun",
    author: "Cabeza2000",
    url: "https://commons.wikimedia.org/wiki/File:Gulab_jamun_(Gibraltar,_November_2020).jpg",
  },
  {
    dish: "Gajar Halwa",
    author: "Vinayakgupta4",
    url: "https://commons.wikimedia.org/wiki/File:Halwa_gajar_ka.jpg",
  },
  {
    dish: "Hot Samosa Chaat",
    author: "Dev Jadiya",
    url: "https://commons.wikimedia.org/wiki/File:Samosa_chat_at_Kochi,_Kerala_-_September_2026.jpg",
  },
  {
    dish: "Mango Lassi",
    author: "Nithyasrm",
    url: "https://commons.wikimedia.org/wiki/File:Tasty_Mango_lassi_picture.JPG",
  },
];

function MenuCard({ product }: { product: Product }) {
  const price = product.priceOptions.find((option) => option.isActive);
  return (
    <article className="surface-panel flex h-full min-w-0 flex-col overflow-hidden">
      {product.image && product.imageAlt ? (
        <MediaFrame
          src={product.image}
          alt={product.imageAlt}
          aspect="landscape"
          sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) calc((100vw - 4rem) / 2), 360px"
          className="rounded-none border-0"
        />
      ) : (
        <div className="relative">
          <MediaFrame aspect="landscape" className="rounded-none border-0" />
          <span
            aria-hidden="true"
            className="absolute inset-x-4 bottom-5 text-center font-display text-lg font-semibold text-primary"
          >
            {product.name}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h4 className="font-display text-product font-semibold text-primary">
          {product.name}
        </h4>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {product.description ??
            "Details and image pending restaurant confirmation."}
        </p>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-2 border-t border-border pt-4">
          <div>
            <span className="block text-xs text-muted">
              Reference menu price
            </span>
            <span className="font-body text-price font-bold text-foreground">
              {price
                ? currency.format(price.priceCents / 100)
                : "Ask for price"}
            </span>
          </div>
          <span className="text-xs text-muted">Call for availability</span>
        </div>
      </div>
    </article>
  );
}

type MenuPageContentProps = {
  categoryId?: string;
  subcategory?: string;
  query?: string;
};

export function MenuPageContent({
  categoryId,
  subcategory,
  query,
}: MenuPageContentProps) {
  const category = categoryId
    ? primaryCategories.find((item) => item.id === categoryId)
    : undefined;
  const validSubcategory =
    category &&
    subcategoriesFor(category.id).some((item) => item.id === subcategory)
      ? subcategory
      : undefined;
  const matching = filterProducts(category?.id, validSubcategory, query);
  const searchAction = category ? `/menu/${category.slug}` : "/menu";
  const groups = category ? [category] : primaryCategories;

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="bg-secondary/60 py-10 sm:py-14">
        <Container>
          <p className="text-label font-bold tracking-[0.18em] text-primary uppercase">
            Royal Sweets &amp; Fast Food
          </p>
          <h1 className="mt-3 font-display text-page font-semibold text-primary">
            {category?.name ?? "Explore Our Menu"}
          </h1>
          <p className="mt-3 max-w-2xl text-supporting text-muted">
            {category?.description ??
              "Browse traditional sweets, Indian food, chaat, snacks, and drinks."}
          </p>
          <p className="mt-4 max-w-3xl text-sm text-muted">
            Prices below are an externally published reference snapshot, not
            confirmed website selling prices. Units and availability are
            unverified; please call for current details. Images are
            illustrative.
          </p>
        </Container>
      </div>

      <Container className="py-8 sm:py-12">
        <nav
          aria-label="Menu categories"
          className="flex flex-wrap gap-2 border-b border-border pb-6"
        >
          {[
            { id: "all", name: "All Menu", slug: "" },
            ...primaryCategories,
          ].map((item) => {
            const active = (category?.id ?? "all") === item.id;
            return (
              <Link
                key={item.id}
                href={item.slug ? `/menu/${item.slug}` : "/menu"}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-control border px-4 py-2 text-sm font-semibold no-underline transition-colors ${active ? "border-primary bg-primary !text-on-primary" : "border-border bg-surface text-primary hover:bg-secondary"}`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {category && (
          <nav
            aria-label={`${category.name} subcategories`}
            className="flex flex-wrap gap-2 py-5"
          >
            <Link
              href={`/menu/${category.slug}`}
              aria-current={!validSubcategory ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-control px-4 py-2 text-sm no-underline ${!validSubcategory ? "bg-secondary font-bold text-primary" : "text-primary hover:bg-secondary"}`}
            >
              All {category.name}
            </Link>
            {subcategoriesFor(category.id).map((item) => (
              <Link
                key={item.id}
                href={`/menu/${category.slug}?subcategory=${item.slug}`}
                aria-current={validSubcategory === item.id ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-control px-4 py-2 text-sm no-underline ${validSubcategory === item.id ? "bg-secondary font-bold text-primary" : "text-primary hover:bg-secondary"}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}

        <form
          action={searchAction}
          method="get"
          role="search"
          className="mt-5 flex max-w-xl flex-wrap gap-3"
        >
          {validSubcategory && (
            <input type="hidden" name="subcategory" value={validSubcategory} />
          )}
          <label htmlFor="menu-search" className="sr-only">
            Search menu by product name
          </label>
          <input
            id="menu-search"
            name="q"
            type="search"
            defaultValue={query ?? ""}
            placeholder="Search menu by name"
            className="min-h-12 min-w-0 flex-1 rounded-control border border-border bg-surface px-4 text-foreground placeholder:text-muted"
          />
          <button
            type="submit"
            className="ui-button inline-flex min-h-12 items-center gap-2 rounded-control bg-primary px-5 font-semibold text-on-primary hover:bg-primary-hover"
          >
            <Search aria-hidden="true" className="size-4" />
            Search
          </button>
        </form>

        {matching.length === 0 ? (
          <div className="mt-10 rounded-surface border border-border bg-surface p-8 sm:p-12">
            <h2 className="font-display text-card text-primary">
              {categoryId === "hot-mix" && !query
                ? "Products coming soon"
                : "No matching menu items"}
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              {categoryId === "hot-mix" && !query
                ? "Hot Mix & Namkeen is planned, but individual items and prices are awaiting restaurant confirmation. Please call for current options."
                : "Try another name or browse a different category."}
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-14">
            {groups.map((group) => {
              const groupItems = matching.filter(
                (product) => product.categoryId === group.id,
              );
              if (groupItems.length === 0) return null;
              return (
                <section key={group.id} aria-labelledby={`group-${group.id}`}>
                  <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
                    <h2
                      id={`group-${group.id}`}
                      className="font-display text-section font-semibold text-primary"
                    >
                      {group.name}
                    </h2>
                    {!category && (
                      <Link
                        href={`/menu/${group.slug}`}
                        className="text-sm font-semibold text-primary"
                      >
                        View category
                      </Link>
                    )}
                  </div>
                  {subcategoriesFor(group.id).map((subgroup) => {
                    const items = groupItems.filter(
                      (product) => product.subcategoryId === subgroup.id,
                    );
                    if (items.length === 0) return null;
                    return (
                      <div key={subgroup.id} className="mb-10 last:mb-0">
                        <h3 className="mb-5 font-display text-card text-foreground">
                          {subgroup.name}
                        </h3>
                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                          {items.map((product) => (
                            <MenuCard key={product.id} product={product} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </section>
              );
            })}
          </div>
        )}
        {matching.length > 0 && (
          <p className="mt-10 border-t border-border pt-5 text-sm text-muted">
            Showing {matching.length} {matching.length === 1 ? "item" : "items"}
            . Prices, units, and availability require restaurant confirmation.
            No online checkout is currently available.
          </p>
        )}
        {matching.some((item) =>
          commonsCredits.some(
            (credit) => credit.dish === item.name && item.image,
          ),
        ) && (
          <details className="mt-5 text-xs text-muted">
            <summary className="cursor-pointer font-semibold">
              Illustrative photo credits and licenses
            </summary>
            <p className="mt-2">
              The following photographs were resized and converted to WebP and
              remain licensed under{" "}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC BY-SA 4.0
              </a>
              :
            </p>
            <ul className="mt-2 list-inside list-disc">
              {commonsCredits
                .filter((credit) =>
                  matching.some(
                    (item) => item.name === credit.dish && item.image,
                  ),
                )
                .map((credit) => (
                  <li key={credit.dish}>
                    {credit.dish}:{" "}
                    <a
                      href={credit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {credit.author}, original photograph
                    </a>
                  </li>
                ))}
            </ul>
          </details>
        )}
      </Container>
    </main>
  );
}
