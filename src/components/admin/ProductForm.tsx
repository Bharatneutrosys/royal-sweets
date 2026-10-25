import Link from "next/link";
import { saveProductAction } from "@/lib/admin/productActions";
import type { AdminCategoryRow, AdminProductRow } from "@/lib/admin/data";

export function ProductForm({
  product,
  categories,
}: {
  product?: AdminProductRow;
  categories: AdminCategoryRow[];
}) {
  const primary = categories.filter((item) => !item.parent_id);
  const subcategories = categories.filter((item) => item.parent_id);
  return (
    <form
      action={saveProductAction}
      className="surface-panel mt-6 grid gap-4 p-5 sm:grid-cols-2 sm:p-7"
    >
      {product && <input type="hidden" name="id" value={product.id} />}
      <label className="grid gap-1 font-semibold sm:col-span-2">
        Product name
        <input
          name="name"
          required
          maxLength={140}
          defaultValue={product?.name}
          className="min-h-11 rounded-control border border-border px-3 font-normal"
        />
      </label>
      <label className="grid gap-1 font-semibold">
        Category
        <select
          name="category_id"
          required
          defaultValue={product?.category_id ?? ""}
          className="min-h-11 rounded-control border border-border px-3 font-normal"
        >
          <option value="" disabled>
            Select category
          </option>
          {primary.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 font-semibold">
        Subcategory
        <select
          name="subcategory_id"
          defaultValue={product?.subcategory_id ?? ""}
          className="min-h-11 rounded-control border border-border px-3 font-normal"
        >
          <option value="">None</option>
          {primary.map((parent) => (
            <optgroup key={parent.id} label={parent.name}>
              {subcategories
                .filter((item) => item.parent_id === parent.id)
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </label>
      <label className="grid gap-1 font-semibold sm:col-span-2">
        Short description
        <textarea
          name="short_description"
          rows={2}
          maxLength={500}
          defaultValue={product?.short_description ?? ""}
          className="rounded-control border border-border p-3 font-normal"
        />
      </label>
      <label className="grid gap-1 font-semibold sm:col-span-2">
        Detailed description
        <textarea
          name="detailed_description"
          rows={4}
          maxLength={3000}
          defaultValue={product?.detailed_description ?? ""}
          className="rounded-control border border-border p-3 font-normal"
        />
      </label>
      <label className="grid gap-1 font-semibold">
        Stock status
        <select
          name="stock_status"
          defaultValue={product?.stock_status ?? "unknown"}
          className="min-h-11 rounded-control border border-border px-3 font-normal"
        >
          <option value="unknown">Unknown — confirm with owner</option>
          <option value="available">Available</option>
          <option value="out-of-stock">Temporarily out of stock</option>
        </select>
      </label>
      <label className="grid gap-1 font-semibold">
        Display order
        <input
          name="display_order"
          type="number"
          min={0}
          defaultValue={product?.display_order ?? 100}
          className="min-h-11 rounded-control border border-border px-3 font-normal"
        />
      </label>
      <label className="grid gap-1 font-semibold sm:col-span-2">
        Primary image alt text
        <input
          name="image_alt"
          maxLength={240}
          defaultValue={product?.image_alt ?? ""}
          className="min-h-11 rounded-control border border-border px-3 font-normal"
        />
      </label>
      <label className="flex min-h-11 items-center gap-2">
        <input
          name="is_published"
          type="checkbox"
          defaultChecked={product?.is_published ?? false}
        />{" "}
        Published
      </label>
      <label className="flex min-h-11 items-center gap-2">
        <input
          name="is_featured"
          type="checkbox"
          defaultChecked={product?.is_featured ?? false}
        />{" "}
        Featured
      </label>
      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <button
          type="submit"
          className="min-h-11 rounded-control bg-primary px-5 font-semibold text-on-primary"
        >
          Save product
        </button>
        <Link
          href="/admin/products"
          className="inline-flex min-h-11 items-center px-4 font-semibold"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
