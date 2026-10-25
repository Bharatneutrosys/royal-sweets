import Link from "next/link";
import { adminCatalog } from "@/lib/admin/data";
import { setProductAvailabilityAction } from "@/lib/admin/productActions";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    stock?: string;
    error?: string;
    status?: string;
  }>;
}) {
  const [{ products, categories, prices }, filters] = await Promise.all([
    adminCatalog(),
    searchParams,
  ]);
  const visible = products.filter(
    (item) =>
      (!filters.q ||
        item.name.toLowerCase().includes(filters.q.trim().toLowerCase())) &&
      (!filters.category || item.category_id === filters.category) &&
      (!filters.stock || item.stock_status === filters.stock),
  );
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-page text-primary">Products</h1>
          <p className="mt-2 text-muted">
            {products.length} products. Changes save to the connected database.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex min-h-11 items-center rounded-control bg-primary px-5 font-semibold text-on-primary no-underline"
        >
          Add Product
        </Link>
      </div>
      {filters.error && (
        <p role="alert" className="mt-4 text-error">
          The change failed. Check the details and try again.
        </p>
      )}
      {filters.status && (
        <p role="status" className="mt-4 text-success">
          Change saved.
        </p>
      )}
      <form
        method="get"
        className="surface-panel mt-6 grid gap-3 p-4 sm:grid-cols-3"
      >
        <label className="grid gap-1">
          Search
          <input
            name="q"
            type="search"
            defaultValue={filters.q}
            className="min-h-11 rounded-control border border-border px-3"
          />
        </label>
        <label className="grid gap-1">
          Category
          <select
            name="category"
            defaultValue={filters.category ?? ""}
            className="min-h-11 rounded-control border border-border px-3"
          >
            <option value="">All categories</option>
            {categories
              .filter((item) => !item.parent_id)
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </label>
        <label className="grid gap-1">
          Stock
          <select
            name="stock"
            defaultValue={filters.stock ?? ""}
            className="min-h-11 rounded-control border border-border px-3"
          >
            <option value="">All statuses</option>
            <option value="unknown">Unknown</option>
            <option value="available">Available</option>
            <option value="out-of-stock">Out of stock</option>
          </select>
        </label>
        <button
          type="submit"
          className="min-h-11 rounded-control border border-primary px-4 font-semibold text-primary sm:col-span-3"
        >
          Filter products
        </button>
      </form>
      {visible.length === 0 ? (
        <p className="mt-8 text-muted">No products match these filters.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {visible.map((item) => {
            const price = prices.find(
              (row) => row.product_id === item.id && row.is_active,
            );
            return (
              <article
                key={item.id}
                className="surface-panel flex flex-wrap items-center justify-between gap-4 p-4"
              >
                <div className="min-w-0">
                  <h2 className="font-display text-xl text-primary">
                    {item.name}
                  </h2>
                  <p className="text-sm text-muted">
                    {categories.find((row) => row.id === item.category_id)
                      ?.name ?? "Uncategorized"}{" "}
                    ·{" "}
                    {price
                      ? `$${(price.price_cents / 100).toFixed(2)} ${price.price_kind === "reference" ? "reference" : "direct"}`
                      : "No price"}{" "}
                    · {item.is_published ? "Published" : "Hidden"} ·{" "}
                    {item.stock_status}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/admin/products/${item.id}/edit`}
                    className="inline-flex min-h-11 items-center rounded-control border border-border px-3 font-semibold"
                  >
                    Edit
                  </Link>
                  {(["available", "out-of-stock", "hidden"] as const).map(
                    (mode) => (
                      <form key={mode} action={setProductAvailabilityAction}>
                        <input type="hidden" name="id" value={item.id} />
                        <input type="hidden" name="mode" value={mode} />
                        <button
                          type="submit"
                          className="min-h-11 rounded-control border border-border px-3 text-sm font-semibold text-primary hover:bg-secondary"
                        >
                          {mode === "out-of-stock"
                            ? "Out of stock"
                            : mode === "hidden"
                              ? "Hide"
                              : "Available"}
                        </button>
                      </form>
                    ),
                  )}
                  {!item.is_published && (
                    <form action={setProductAvailabilityAction}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="mode" value="restore" />
                      <button
                        type="submit"
                        className="min-h-11 rounded-control border border-primary px-3 text-sm font-semibold text-primary"
                      >
                        Restore
                      </button>
                    </form>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
