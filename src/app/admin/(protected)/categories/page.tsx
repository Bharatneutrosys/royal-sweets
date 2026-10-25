import { adminCatalog } from "@/lib/admin/data";
import {
  saveCategoryAction,
  deleteCategoryAction,
  setCategoryActiveAction,
} from "@/lib/admin/categoryActions";
import { ContentImageForm } from "@/components/admin/ContentImageForm";
import { requireAdmin } from "@/lib/admin/auth";
import { imageUrl } from "@/lib/supabase/catalog";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; status?: string }>;
}) {
  const [{ categories, products }, { error, status }, { supabase }] =
    await Promise.all([adminCatalog(), searchParams, requireAdmin()]);
  const imageUrls = new Map(
    await Promise.all(
      categories.map(
        async (item) =>
          [item.id, await imageUrl(item.image_path, supabase)] as const,
      ),
    ),
  );
  const primary = categories.filter((item) => !item.parent_id);
  return (
    <>
      <h1 className="font-display text-page text-primary">Categories</h1>
      <p className="mt-2 text-muted">
        Names and descriptions can change while existing slugs stay stable.
        Reassign products from their editor before removing a category.
      </p>
      {error && (
        <p role="alert" className="mt-4 text-error">
          {error === "in-use"
            ? "This category has products or subcategories. Reassign them first."
            : "Category change failed. Check the fields and try again."}
        </p>
      )}
      {status && (
        <p role="status" className="mt-4 text-success">
          Category change saved.
        </p>
      )}
      <section className="mt-8 surface-panel p-5">
        <h2 className="font-display text-card text-primary">
          Add category or subcategory
        </h2>
        <form
          action={saveCategoryAction}
          className="mt-4 grid gap-3 sm:grid-cols-2"
        >
          <label className="grid gap-1 font-semibold">
            Name
            <input
              name="name"
              required
              maxLength={100}
              className="min-h-11 rounded-control border border-border px-3"
            />
          </label>
          <label className="grid gap-1 font-semibold">
            Parent category
            <select
              name="parent_id"
              className="min-h-11 rounded-control border border-border px-3"
            >
              <option value="">Primary category</option>
              {primary.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 font-semibold sm:col-span-2">
            Description
            <textarea
              name="description"
              rows={2}
              maxLength={1000}
              className="rounded-control border border-border p-3"
            />
          </label>
          <label className="grid gap-1 font-semibold">
            Display order
            <input
              name="display_order"
              type="number"
              min={0}
              defaultValue={categories.length + 1}
              className="min-h-11 rounded-control border border-border px-3"
            />
          </label>
          <label className="flex items-center gap-2">
            <input name="is_active" type="checkbox" defaultChecked /> Active
          </label>
          <button
            type="submit"
            className="min-h-11 rounded-control bg-primary px-5 font-semibold text-on-primary sm:col-span-2"
          >
            Add category
          </button>
        </form>
      </section>
      <div className="mt-8 space-y-4">
        {categories.map((item) => {
          const count = products.filter(
            (product) =>
              product.category_id === item.id ||
              product.subcategory_id === item.id,
          ).length;
          return (
            <section key={item.id} className="surface-panel p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-card text-primary">
                  {item.name}
                </h2>
                <span className="text-sm text-muted">
                  /{item.slug} · {count} products ·{" "}
                  {item.is_active ? "Active" : "Hidden"}
                </span>
              </div>
              <form
                action={saveCategoryAction}
                className="mt-4 grid gap-3 sm:grid-cols-2"
              >
                <input type="hidden" name="id" value={item.id} />
                <label className="grid gap-1">
                  Name
                  <input
                    name="name"
                    defaultValue={item.name}
                    required
                    maxLength={100}
                    className="min-h-11 rounded-control border border-border px-3"
                  />
                </label>
                <div className="grid gap-1">
                  Parent
                  <input
                    type="hidden"
                    name="parent_id"
                    value={item.parent_id ?? ""}
                  />
                  <span className="flex min-h-11 items-center rounded-control border border-border px-3 text-muted">
                    {categories.find((parent) => parent.id === item.parent_id)
                      ?.name ?? "Primary category"}
                  </span>
                </div>
                <label className="grid gap-1 sm:col-span-2">
                  Description
                  <textarea
                    name="description"
                    defaultValue={item.description}
                    rows={2}
                    maxLength={1000}
                    className="rounded-control border border-border p-3"
                  />
                </label>
                <label className="grid gap-1">
                  Display order
                  <input
                    name="display_order"
                    type="number"
                    min={0}
                    defaultValue={item.display_order}
                    className="min-h-11 rounded-control border border-border px-3"
                  />
                </label>
                <label className="flex items-center gap-2">
                  <input
                    name="is_active"
                    type="checkbox"
                    defaultChecked={item.is_active}
                  />{" "}
                  Active
                </label>
                <button
                  type="submit"
                  className="min-h-11 rounded-control border border-primary px-5 font-semibold text-primary sm:col-span-2"
                >
                  Save category
                </button>
              </form>
              <ContentImageForm
                kind="category"
                id={item.id}
                imageUrl={imageUrls.get(item.id) ?? null}
                imageAlt={item.image_alt}
              />
              <div className="mt-4 flex flex-wrap gap-4">
                <form action={setCategoryActiveAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <input
                    type="hidden"
                    name="active"
                    value={String(!item.is_active)}
                  />
                  <button
                    type="submit"
                    className="min-h-11 text-sm font-semibold text-primary underline"
                  >
                    {item.is_active ? "Hide" : "Restore"}
                  </button>
                </form>
                {count === 0 && (
                  <details>
                    <summary className="cursor-pointer text-sm text-error">
                      Delete empty category
                    </summary>
                    <form
                      action={deleteCategoryAction}
                      className="mt-2 flex flex-wrap items-center gap-3"
                    >
                      <input type="hidden" name="id" value={item.id} />
                      <label>
                        <input
                          type="checkbox"
                          name="confirm"
                          value="DELETE"
                          required
                        />{" "}
                        Confirm deletion
                      </label>
                      <button
                        type="submit"
                        className="min-h-11 rounded-control border border-error px-4 font-semibold text-error"
                      >
                        Delete
                      </button>
                    </form>
                  </details>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
