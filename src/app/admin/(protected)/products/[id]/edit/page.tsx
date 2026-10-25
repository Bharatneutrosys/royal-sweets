import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { adminCatalog, adminImageRows } from "@/lib/admin/data";
import {
  savePriceAction,
  removePriceAction,
  setProductAvailabilityAction,
} from "@/lib/admin/productActions";
import {
  uploadProductImageAction,
  setPrimaryImageAction,
  reorderProductImageAction,
  updateProductImageAltAction,
  removeProductImageAction,
} from "@/lib/admin/imageActions";
import { requireAdmin } from "@/lib/admin/auth";
import { imageUrl } from "@/lib/supabase/catalog";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; status?: string }>;
}) {
  const [{ id }, message, catalog, { supabase }] = await Promise.all([
    params,
    searchParams,
    adminCatalog(),
    requireAdmin(),
  ]);
  const product = catalog.products.find((item) => item.id === id);
  if (!product) notFound();
  const images = await adminImageRows(id);
  const prices = catalog.prices.filter((item) => item.product_id === id);
  const imageCards = await Promise.all(
    images.map(async (item) => ({
      ...item,
      url: await imageUrl(item.storage_path, supabase),
    })),
  );
  return (
    <>
      <Link
        href="/admin/products"
        className="inline-flex min-h-11 items-center"
      >
        ← Products
      </Link>
      <h1 className="font-display text-page text-primary">
        Edit {product.name}
      </h1>
      <p className="mt-2 text-sm text-muted">
        Stable slug: {product.slug}. Archive by hiding; existing references
        remain intact.
      </p>
      {message.error && (
        <p role="alert" className="mt-4 text-error">
          The change failed. Check the fields and try again.
        </p>
      )}
      {message.status && (
        <p role="status" className="mt-4 text-success">
          Change saved to the database.
        </p>
      )}
      <ProductForm product={product} categories={catalog.categories} />
      <section className="mt-10">
        <h2 className="font-display text-section text-primary">
          Price options
        </h2>
        <p className="mt-2 text-sm text-muted">
          Seed prices are unverified references. Select direct only after
          confirming the amount and unit with the restaurant.
        </p>
        <div className="mt-5 space-y-4">
          {prices.map((price) => (
            <div key={price.id} className="surface-panel p-5">
              <form
                action={savePriceAction}
                className="grid gap-3 sm:grid-cols-2"
              >
                <input type="hidden" name="id" value={price.id} />
                <input type="hidden" name="product_id" value={id} />
                <label className="grid gap-1">
                  Label
                  <input
                    name="label"
                    required
                    maxLength={80}
                    defaultValue={price.label}
                    className="min-h-11 rounded-control border border-border px-3"
                  />
                </label>
                <label className="grid gap-1">
                  Price (USD)
                  <input
                    name="price_dollars"
                    required
                    inputMode="decimal"
                    defaultValue={(price.price_cents / 100).toFixed(2)}
                    className="min-h-11 rounded-control border border-border px-3"
                  />
                </label>
                <label className="grid gap-1">
                  Unit
                  <input
                    name="unit"
                    maxLength={40}
                    defaultValue={price.unit ?? ""}
                    placeholder="Unknown or piece, pound, plate…"
                    className="min-h-11 rounded-control border border-border px-3"
                  />
                </label>
                <label className="grid gap-1">
                  Quantity
                  <input
                    name="quantity"
                    type="number"
                    step="0.001"
                    min="0.001"
                    defaultValue={price.quantity ?? ""}
                    className="min-h-11 rounded-control border border-border px-3"
                  />
                </label>
                <label className="grid gap-1">
                  Price status
                  <select
                    name="price_kind"
                    defaultValue={price.price_kind}
                    className="min-h-11 rounded-control border border-border px-3"
                  >
                    <option value="reference">Unverified reference</option>
                    <option value="direct">
                      Restaurant-confirmed direct price
                    </option>
                  </select>
                </label>
                <label className="grid gap-1">
                  Display order
                  <input
                    name="display_order"
                    type="number"
                    min={0}
                    defaultValue={price.display_order}
                    className="min-h-11 rounded-control border border-border px-3"
                  />
                </label>
                <label className="flex min-h-11 items-center gap-2">
                  <input
                    name="is_active"
                    type="checkbox"
                    defaultChecked={price.is_active}
                  />{" "}
                  Active
                </label>
                <button
                  type="submit"
                  className="min-h-11 rounded-control border border-primary px-4 font-semibold text-primary"
                >
                  Save price
                </button>
              </form>
              <details className="mt-3">
                <summary className="cursor-pointer text-sm text-error">
                  Remove price option
                </summary>
                <form action={removePriceAction} className="mt-2 flex gap-3">
                  <input type="hidden" name="id" value={price.id} />
                  <input type="hidden" name="product_id" value={id} />
                  <label className="flex items-center gap-2">
                    <input
                      name="confirm"
                      type="checkbox"
                      value="REMOVE"
                      required
                    />{" "}
                    Confirm
                  </label>
                  <button
                    type="submit"
                    className="min-h-11 text-error underline"
                  >
                    Remove
                  </button>
                </form>
              </details>
            </div>
          ))}
        </div>
        <form
          action={savePriceAction}
          className="surface-panel mt-5 grid gap-3 p-5 sm:grid-cols-2"
        >
          <h3 className="font-display text-card text-primary sm:col-span-2">
            Add price option
          </h3>
          <input type="hidden" name="product_id" value={id} />
          <label className="grid gap-1">
            Label
            <input
              name="label"
              required
              maxLength={80}
              placeholder="e.g. Half pound"
              className="min-h-11 rounded-control border border-border px-3"
            />
          </label>
          <label className="grid gap-1">
            Price (USD)
            <input
              name="price_dollars"
              required
              inputMode="decimal"
              placeholder="0.00"
              className="min-h-11 rounded-control border border-border px-3"
            />
          </label>
          <label className="grid gap-1">
            Unit
            <input
              name="unit"
              maxLength={40}
              placeholder="piece, half-pound, pound, plate…"
              className="min-h-11 rounded-control border border-border px-3"
            />
          </label>
          <label className="grid gap-1">
            Quantity
            <input
              name="quantity"
              type="number"
              step="0.001"
              min="0.001"
              className="min-h-11 rounded-control border border-border px-3"
            />
          </label>
          <label className="grid gap-1">
            Price status
            <select
              name="price_kind"
              defaultValue="direct"
              className="min-h-11 rounded-control border border-border px-3"
            >
              <option value="direct">Restaurant-confirmed direct price</option>
              <option value="reference">Unverified reference</option>
            </select>
          </label>
          <label className="grid gap-1">
            Display order
            <input
              name="display_order"
              type="number"
              min={0}
              defaultValue={prices.length + 1}
              className="min-h-11 rounded-control border border-border px-3"
            />
          </label>
          <label className="flex min-h-11 items-center gap-2">
            <input name="is_active" type="checkbox" defaultChecked /> Active
          </label>
          <button
            type="submit"
            className="min-h-11 rounded-control bg-primary px-4 font-semibold text-on-primary"
          >
            Add price
          </button>
        </form>
      </section>
      <section className="mt-10">
        <h2 className="font-display text-section text-primary">
          Product photos
        </h2>
        <p className="mt-2 text-sm text-muted">
          JPEG, PNG, or WebP, up to 5 MB. Add clear alt text. Uploaded files are
          private until referenced by a published product.
        </p>
        <form
          action={uploadProductImageAction}
          className="surface-panel mt-5 grid gap-3 p-5 sm:grid-cols-2"
        >
          <input type="hidden" name="product_id" value={id} />
          <label className="grid gap-1 sm:col-span-2">
            Image
            <input
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required
              className="min-h-11"
            />
          </label>
          <label className="grid gap-1 sm:col-span-2">
            Alt text
            <input
              name="alt_text"
              required
              maxLength={240}
              className="min-h-11 rounded-control border border-border px-3"
            />
          </label>
          <label className="grid gap-1">
            Display order
            <input
              name="display_order"
              type="number"
              min={0}
              defaultValue={images.length + 1}
              className="min-h-11 rounded-control border border-border px-3"
            />
          </label>
          <label className="flex min-h-11 items-center gap-2">
            <input
              name="make_primary"
              type="checkbox"
              defaultChecked={!product.primary_image_path}
            />{" "}
            Make primary
          </label>
          <button
            type="submit"
            className="min-h-11 rounded-control bg-primary px-4 font-semibold text-on-primary sm:col-span-2"
          >
            Upload photo
          </button>
        </form>
        {imageCards.length > 0 && (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {imageCards.map((item) => (
              <div key={item.id} className="surface-panel overflow-hidden">
                {item.url && (
                  <div className="relative aspect-video">
                    <Image
                      src={item.url}
                      alt={item.alt_text}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="space-y-3 p-4">
                  <form
                    action={updateProductImageAltAction}
                    className="flex flex-wrap items-end gap-2"
                  >
                    <input type="hidden" name="product_id" value={id} />
                    <input type="hidden" name="image_id" value={item.id} />
                    <label className="grid min-w-0 flex-1 gap-1 text-sm">
                      Photo description
                      <input
                        name="alt_text"
                        required
                        maxLength={240}
                        defaultValue={item.alt_text}
                        className="min-h-11 rounded-control border border-border px-3"
                      />
                    </label>
                    <button
                      type="submit"
                      className="min-h-11 font-semibold text-primary underline"
                    >
                      Save alt text
                    </button>
                  </form>
                  <p className="text-xs">
                    {product.primary_image_path === item.storage_path
                      ? "Primary photo"
                      : "Gallery photo"}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <form action={setPrimaryImageAction}>
                      <input type="hidden" name="product_id" value={id} />
                      <input type="hidden" name="image_id" value={item.id} />
                      <button
                        type="submit"
                        className="min-h-11 text-sm font-semibold text-primary underline"
                      >
                        Set primary
                      </button>
                    </form>
                    <form
                      action={reorderProductImageAction}
                      className="flex items-center gap-2"
                    >
                      <input type="hidden" name="product_id" value={id} />
                      <input type="hidden" name="image_id" value={item.id} />
                      <label className="text-sm">
                        Order{" "}
                        <input
                          name="display_order"
                          type="number"
                          min={0}
                          defaultValue={item.display_order}
                          className="w-16 rounded-control border border-border px-1"
                        />
                      </label>
                      <button
                        type="submit"
                        className="min-h-11 text-sm font-semibold text-primary underline"
                      >
                        Save
                      </button>
                    </form>
                  </div>
                  <details>
                    <summary className="cursor-pointer text-sm text-error">
                      Remove photo
                    </summary>
                    <form
                      action={removeProductImageAction}
                      className="mt-2 flex gap-2"
                    >
                      <input type="hidden" name="product_id" value={id} />
                      <input type="hidden" name="image_id" value={item.id} />
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="confirm"
                          value="REMOVE"
                          required
                        />{" "}
                        Confirm
                      </label>
                      <button
                        type="submit"
                        className="min-h-11 text-error underline"
                      >
                        Remove
                      </button>
                    </form>
                  </details>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="mt-10 border-t border-border pt-6">
        <h2 className="font-display text-card text-primary">
          Archive or restore
        </h2>
        <p className="mt-2 text-muted">
          Hiding removes this product from the public menu without deleting
          records.
        </p>
        <form action={setProductAvailabilityAction} className="mt-4">
          <input type="hidden" name="id" value={id} />
          <input
            type="hidden"
            name="mode"
            value={product.is_published ? "hidden" : "restore"}
          />
          <button
            type="submit"
            className="min-h-11 rounded-control border border-primary px-4 font-semibold text-primary"
          >
            {product.is_published ? "Hide product" : "Restore product"}
          </button>
        </form>
      </section>
    </>
  );
}
