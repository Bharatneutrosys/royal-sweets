import "server-only";
import { requireAdmin } from "@/lib/admin/auth";

export type AdminCategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_path: string | null;
  image_alt: string | null;
  parent_id: string | null;
  display_order: number;
  is_active: boolean;
};
export type AdminProductRow = {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  subcategory_id: string | null;
  short_description: string | null;
  detailed_description: string | null;
  primary_image_path: string | null;
  image_alt: string | null;
  stock_status: "unknown" | "available" | "out-of-stock";
  is_published: boolean;
  is_featured: boolean;
  display_order: number;
  price_source: string | null;
  price_verified_at: string | null;
};
export type AdminPriceRow = {
  id: string;
  product_id: string;
  label: string;
  unit: string | null;
  quantity: number | null;
  price_cents: number;
  price_kind: "reference" | "direct";
  is_active: boolean;
  display_order: number;
};
export type AdminImageRow = {
  id: string;
  product_id: string;
  storage_path: string;
  alt_text: string;
  display_order: number;
};

export async function adminCatalog() {
  const { supabase } = await requireAdmin();
  const [categoriesResult, productsResult, pricesResult] = await Promise.all([
    supabase.from("categories").select("*").order("display_order"),
    supabase.from("products").select("*").order("display_order"),
    supabase.from("product_price_options").select("*").order("display_order"),
  ]);
  if (categoriesResult.error || productsResult.error || pricesResult.error)
    throw new Error("Could not load administrator catalog");
  return {
    categories: categoriesResult.data as AdminCategoryRow[],
    products: productsResult.data as AdminProductRow[],
    prices: pricesResult.data as AdminPriceRow[],
  };
}

export async function adminImageRows(productId: string) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId)
    .order("display_order");
  if (error) throw new Error("Could not load product images");
  return data as AdminImageRow[];
}
