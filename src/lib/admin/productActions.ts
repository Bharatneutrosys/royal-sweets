"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { assertAdmin } from "@/lib/admin/auth";
import {
  checked,
  positiveOrder,
  slugFor,
  dollarsToCents,
} from "@/lib/admin/validation";

const idSchema = z.string().regex(/^[a-z0-9-]{1,140}$/);
const productSchema = z.object({
  id: idSchema.optional(),
  name: z.string().trim().min(1).max(140),
  category_id: idSchema,
  subcategory_id: idSchema.nullable(),
  short_description: z.string().trim().max(500),
  detailed_description: z.string().trim().max(3000),
  image_alt: z.string().trim().max(240),
  stock_status: z.enum(["unknown", "available", "out-of-stock"]),
  display_order: positiveOrder,
});
const priceSchema = z.object({
  id: idSchema.optional(),
  product_id: idSchema,
  label: z.string().trim().min(1).max(80),
  unit: z.string().trim().max(40),
  quantity: z.union([z.string(), z.number()]).optional(),
  price_cents: z.coerce.number().int().min(0).max(100000000),
  price_kind: z.enum(["reference", "direct"]),
  display_order: positiveOrder,
});
const fail = (path = "/admin/products"): never =>
  redirect(`${path}?error=save`);
const refreshPublic = () => {
  revalidatePath("/", "layout");
  revalidatePath("/menu", "layout");
  revalidatePath("/", "page");
};

export async function saveProductAction(form: FormData) {
  const { supabase } = await assertAdmin();
  const parsed = productSchema.safeParse({
    id: form.get("id") || undefined,
    name: form.get("name"),
    category_id: form.get("category_id"),
    subcategory_id: form.get("subcategory_id") || null,
    short_description: form.get("short_description") ?? "",
    detailed_description: form.get("detailed_description") ?? "",
    image_alt: form.get("image_alt") ?? "",
    stock_status: form.get("stock_status"),
    display_order: form.get("display_order"),
  });
  if (!parsed.success) return fail();
  const { id, ...fields } = parsed.data;
  const row = {
    ...fields,
    short_description: fields.short_description || null,
    detailed_description: fields.detailed_description || null,
    image_alt: fields.image_alt || null,
    is_published: checked(form, "is_published"),
    is_featured: checked(form, "is_featured"),
  };
  let savedId = id;
  if (id) {
    const { data, error } = await supabase
      .from("products")
      .update(row)
      .eq("id", id)
      .select("id")
      .single();
    if (error || !data) fail(`/admin/products/${id}/edit`);
  } else {
    const slug = slugFor(fields.name);
    if (!slug) fail("/admin/products/new");
    savedId = crypto.randomUUID();
    const { error } = await supabase.from("products").insert({
      ...row,
      id: savedId,
      slug,
      primary_image_path: null,
      price_source: null,
      price_verified_at: null,
    });
    if (error) fail("/admin/products/new");
  }
  refreshPublic();
  redirect(`/admin/products/${savedId}/edit?status=saved`);
}

export async function setProductAvailabilityAction(form: FormData) {
  const { supabase } = await assertAdmin();
  const id = idSchema.safeParse(form.get("id"));
  const mode = z
    .enum(["available", "out-of-stock", "unknown", "hidden", "restore"])
    .safeParse(form.get("mode"));
  if (!id.success || !mode.success) fail();
  const row =
    mode.data === "hidden"
      ? { is_published: false }
      : mode.data === "restore"
        ? { is_published: true, stock_status: "unknown" }
        : { stock_status: mode.data };
  const { data, error } = await supabase
    .from("products")
    .update(row)
    .eq("id", id.data)
    .select("id")
    .single();
  if (error || !data) fail();
  refreshPublic();
  redirect("/admin/products?status=saved");
}

export async function savePriceAction(form: FormData) {
  const { supabase } = await assertAdmin();
  let cents = 0;
  try {
    cents = dollarsToCents(form.get("price_dollars"));
  } catch {
    fail();
  }
  const parsed = priceSchema.safeParse({
    id: form.get("id") || undefined,
    product_id: form.get("product_id"),
    label: form.get("label"),
    unit: form.get("unit") ?? "",
    quantity: form.get("quantity") ?? "",
    price_cents: cents,
    price_kind: form.get("price_kind"),
    display_order: form.get("display_order"),
  });
  if (!parsed.success) return fail();
  const { id, product_id, unit, quantity, ...fields } = parsed.data;
  const amount =
    quantity === "" || quantity === undefined ? null : Number(quantity);
  if (amount !== null && (!Number.isFinite(amount) || amount <= 0))
    fail(`/admin/products/${product_id}/edit`);
  const row = {
    ...fields,
    product_id,
    unit: unit || null,
    quantity: amount,
    is_active: checked(form, "is_active"),
  };
  const result = id
    ? await supabase
        .from("product_price_options")
        .update(row)
        .eq("id", id)
        .eq("product_id", product_id)
    : await supabase
        .from("product_price_options")
        .insert({ ...row, id: crypto.randomUUID() });
  if (result.error) fail(`/admin/products/${product_id}/edit`);
  if (fields.price_kind === "direct") {
    const { error: sourceError } = await supabase
      .from("products")
      .update({
        price_source: "restaurant-admin",
        price_verified_at: new Date().toISOString(),
      })
      .eq("id", product_id);
    if (sourceError) fail(`/admin/products/${product_id}/edit`);
  }
  refreshPublic();
  redirect(`/admin/products/${product_id}/edit?status=price-saved`);
}

export async function removePriceAction(form: FormData) {
  const { supabase } = await assertAdmin();
  if (form.get("confirm") !== "REMOVE") fail();
  const id = idSchema.safeParse(form.get("id"));
  const productId = idSchema.safeParse(form.get("product_id"));
  if (!id.success || !productId.success) fail();
  const { error } = await supabase
    .from("product_price_options")
    .delete()
    .eq("id", id.data)
    .eq("product_id", productId.data);
  if (error) fail(`/admin/products/${productId.data}/edit`);
  refreshPublic();
  redirect(`/admin/products/${productId.data}/edit?status=price-removed`);
}
