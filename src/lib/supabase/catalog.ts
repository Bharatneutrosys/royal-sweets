import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseConfig } from "@/lib/supabase/config";
import { categories as seedCategories } from "@/lib/menuCategories";
import { products as seedProducts } from "@/lib/menuCatalog";
import type { Category, Product, PriceOption, StockStatus } from "@/types/menu";

const categoryRow = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  image_path: z.string().nullable(),
  image_alt: z.string().nullable(),
  parent_id: z.string().nullable(),
  display_order: z.number(),
  is_active: z.boolean(),
});
const productRow = z.object({
  id: z.string(),
  category_id: z.string(),
  subcategory_id: z.string().nullable(),
  name: z.string(),
  slug: z.string(),
  short_description: z.string().nullable(),
  detailed_description: z.string().nullable(),
  primary_image_path: z.string().nullable(),
  image_alt: z.string().nullable(),
  stock_status: z.enum(["unknown", "available", "out-of-stock"]),
  is_published: z.boolean(),
  is_featured: z.boolean(),
  display_order: z.number(),
  price_source: z.string().nullable(),
  price_verified_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});
const priceRow = z.object({
  id: z.string(),
  product_id: z.string(),
  label: z.string(),
  unit: z.string().nullable(),
  quantity: z.number().nullable(),
  price_cents: z.number().int(),
  price_kind: z.enum(["reference", "direct"]),
  is_active: z.boolean(),
});

export async function imageUrl(
  path: string | null,
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
) {
  if (!path) return null;
  if (path.startsWith("/images/")) return path;
  const { data, error } = await supabase.storage
    .from("royal-assets")
    .createSignedUrl(path, 3600);
  return error ? null : data.signedUrl;
}

export type PublicCatalog = {
  categories: Category[];
  products: Product[];
  source: "seed" | "database";
};

export const getPublicCatalog = cache(async (): Promise<PublicCatalog> => {
  if (!supabaseConfig())
    return {
      categories: seedCategories,
      products: seedProducts,
      source: "seed",
    };
  await connection();
  const supabase = await createSupabaseServerClient();
  const [
    { data: categoryData, error: categoryError },
    { data: productData, error: productError },
  ] = await Promise.all([
    supabase
      .from("categories")
      .select(
        "id,name,slug,description,image_path,image_alt,parent_id,display_order,is_active",
      )
      .eq("is_active", true)
      .order("display_order"),
    supabase
      .from("products")
      .select(
        "id,category_id,subcategory_id,name,slug,short_description,detailed_description,primary_image_path,image_alt,stock_status,is_published,is_featured,display_order,price_source,price_verified_at,created_at,updated_at",
      )
      .eq("is_published", true)
      .order("display_order"),
  ]);
  if (categoryError || productError)
    throw new Error("Live menu is temporarily unavailable");
  const categoryRows = z.array(categoryRow).parse(categoryData);
  const productRows = z.array(productRow).parse(productData);
  const ids = productRows.map((item) => item.id);
  const { data: priceData, error: priceError } = ids.length
    ? await supabase
        .from("product_price_options")
        .select(
          "id,product_id,label,unit,quantity,price_cents,price_kind,is_active",
        )
        .in("product_id", ids)
        .eq("is_active", true)
    : { data: [], error: null };
  if (priceError)
    throw new Error("Live menu prices are temporarily unavailable");
  const priceRows = z.array(priceRow).parse(priceData);
  const activeIds = new Set(
    categoryRows.filter((item) => !item.parent_id).map((item) => item.id),
  );
  const categories: Category[] = await Promise.all(
    categoryRows
      .filter((item) => !item.parent_id || activeIds.has(item.parent_id))
      .map(async (item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description,
        image: await imageUrl(item.image_path, supabase),
        imageAlt: item.image_alt,
        parentId: item.parent_id,
        displayOrder: item.display_order,
        isActive: item.is_active,
      })),
  );
  const validCategoryIds = new Set(categories.map((item) => item.id));
  const products: Product[] = await Promise.all(
    productRows
      .filter(
        (item) =>
          validCategoryIds.has(item.category_id) &&
          (!item.subcategory_id || validCategoryIds.has(item.subcategory_id)),
      )
      .map(async (item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        categoryId: item.category_id,
        subcategoryId: item.subcategory_id ?? "",
        description: item.short_description,
        detailedDescription: item.detailed_description,
        image: await imageUrl(item.primary_image_path, supabase),
        imageAlt: item.image_alt,
        galleryImages: [],
        priceOptions: priceRows
          .filter((option) => option.product_id === item.id)
          .map((option): PriceOption => ({
            id: option.id,
            productId: option.product_id,
            label: option.label,
            unit: option.unit,
            quantity: option.quantity,
            priceCents: option.price_cents,
            priceKind: option.price_kind,
            isActive: option.is_active,
          })),
        priceSource: item.price_source ?? "restaurant",
        priceVerifiedAt: item.price_verified_at,
        stockStatus: item.stock_status as StockStatus,
        isPublished: item.is_published,
        isFeatured: item.is_featured,
        displayOrder: item.display_order,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })),
  );
  return { categories, products, source: "database" };
});
