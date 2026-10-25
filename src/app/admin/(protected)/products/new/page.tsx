import { adminCatalog } from "@/lib/admin/data";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ categories }, { error }] = await Promise.all([
    adminCatalog(),
    searchParams,
  ]);
  return (
    <>
      <h1 className="font-display text-page text-primary">Add Product</h1>
      <p className="mt-2 text-muted">
        Create the product first, then add price options and photos. New
        products start unpublished unless selected.
      </p>
      {error && (
        <p role="alert" className="mt-4 text-error">
          Product could not be saved. Check the category, name, and unique slug.
        </p>
      )}
      <ProductForm categories={categories} />
    </>
  );
}
