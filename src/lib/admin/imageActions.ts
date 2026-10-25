"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { assertAdmin } from "@/lib/admin/auth";
import { positiveOrder } from "@/lib/admin/validation";
import { imageExtensions, validImageFile } from "@/lib/admin/imageValidation";

const productIdSchema = z.string().regex(/^[a-z0-9-]{1,140}$/);
const editPath = (id: string) => `/admin/products/${id}/edit`;
const fail = (id: string): never => redirect(`${editPath(id)}?error=image`);
const refresh = (id: string) => {
  revalidatePath("/", "layout");
  revalidatePath("/menu", "layout");
  revalidatePath("/", "page");
  revalidatePath(editPath(id));
};

export async function uploadProductImageAction(form: FormData) {
  const { supabase } = await assertAdmin();
  const id = productIdSchema.safeParse(form.get("product_id"));
  if (!id.success) redirect("/admin/products?error=image");
  const file = form.get("image");
  const alt = z.string().trim().min(1).max(240).safeParse(form.get("alt_text"));
  const order = positiveOrder.safeParse(form.get("display_order") ?? 0);
  if (
    !(file instanceof File) ||
    !alt.success ||
    !order.success ||
    !imageExtensions[file.type] ||
    file.size === 0 ||
    file.size > 5 * 1024 * 1024
  )
    return fail(id.data);
  if (!(await validImageFile(file))) return fail(id.data);
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id,primary_image_path")
    .eq("id", id.data)
    .single();
  if (productError || !product) return fail(id.data);
  const path = `products/${id.data}/${crypto.randomUUID()}.${imageExtensions[file.type]}`;
  const { error: uploadError } = await supabase.storage
    .from("royal-assets")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (uploadError) fail(id.data);
  const { error: recordError } = await supabase.from("product_images").insert({
    product_id: id.data,
    storage_path: path,
    alt_text: alt.data,
    display_order: order.data,
  });
  if (recordError) {
    await supabase.storage.from("royal-assets").remove([path]);
    fail(id.data);
  }
  if (!product.primary_image_path || form.get("make_primary") === "on") {
    const { error: primaryError } = await supabase
      .from("products")
      .update({ primary_image_path: path, image_alt: alt.data })
      .eq("id", id.data);
    if (primaryError) fail(id.data);
  }
  refresh(id.data);
  redirect(`${editPath(id.data)}?status=image-saved`);
}

export async function setPrimaryImageAction(form: FormData) {
  const { supabase } = await assertAdmin();
  const id = productIdSchema.safeParse(form.get("product_id"));
  const imageId = z.string().uuid().safeParse(form.get("image_id"));
  if (!id.success || !imageId.success) redirect("/admin/products?error=image");
  const { data: image, error } = await supabase
    .from("product_images")
    .select("storage_path,alt_text")
    .eq("id", imageId.data)
    .eq("product_id", id.data)
    .single();
  if (error || !image) return fail(id.data);
  const updated = await supabase
    .from("products")
    .update({
      primary_image_path: image.storage_path,
      image_alt: image.alt_text,
    })
    .eq("id", id.data);
  if (updated.error) fail(id.data);
  refresh(id.data);
  redirect(`${editPath(id.data)}?status=image-saved`);
}

export async function reorderProductImageAction(form: FormData) {
  const { supabase } = await assertAdmin();
  const id = productIdSchema.safeParse(form.get("product_id"));
  const imageId = z.string().uuid().safeParse(form.get("image_id"));
  const order = positiveOrder.safeParse(form.get("display_order"));
  if (!id.success || !imageId.success || !order.success)
    redirect("/admin/products?error=image");
  const { error } = await supabase
    .from("product_images")
    .update({ display_order: order.data })
    .eq("id", imageId.data)
    .eq("product_id", id.data);
  if (error) fail(id.data);
  refresh(id.data);
  redirect(`${editPath(id.data)}?status=image-saved`);
}

export async function updateProductImageAltAction(form: FormData) {
  const { supabase } = await assertAdmin();
  const id = productIdSchema.safeParse(form.get("product_id"));
  const imageId = z.string().uuid().safeParse(form.get("image_id"));
  const alt = z.string().trim().min(1).max(240).safeParse(form.get("alt_text"));
  if (!id.success || !imageId.success || !alt.success)
    redirect("/admin/products?error=image");
  const image = await supabase
    .from("product_images")
    .update({ alt_text: alt.data })
    .eq("id", imageId.data)
    .eq("product_id", id.data)
    .select("storage_path")
    .single();
  if (image.error || !image.data) return fail(id.data);
  const product = await supabase
    .from("products")
    .select("primary_image_path")
    .eq("id", id.data)
    .single();
  if (product.error || !product.data) return fail(id.data);
  if (product.data.primary_image_path === image.data.storage_path) {
    const updated = await supabase
      .from("products")
      .update({ image_alt: alt.data })
      .eq("id", id.data);
    if (updated.error) fail(id.data);
  }
  refresh(id.data);
  redirect(`${editPath(id.data)}?status=image-saved`);
}

export async function removeProductImageAction(form: FormData) {
  const { supabase } = await assertAdmin();
  const id = productIdSchema.safeParse(form.get("product_id"));
  const imageId = z.string().uuid().safeParse(form.get("image_id"));
  if (!id.success || !imageId.success || form.get("confirm") !== "REMOVE")
    redirect("/admin/products?error=image");
  const [imageResult, productResult] = await Promise.all([
    supabase
      .from("product_images")
      .select("storage_path")
      .eq("id", imageId.data)
      .eq("product_id", id.data)
      .single(),
    supabase
      .from("products")
      .select("primary_image_path")
      .eq("id", id.data)
      .single(),
  ]);
  if (
    imageResult.error ||
    productResult.error ||
    !imageResult.data ||
    !productResult.data
  )
    return fail(id.data);
  if (productResult.data.primary_image_path === imageResult.data.storage_path) {
    const { error } = await supabase
      .from("products")
      .update({ primary_image_path: null, image_alt: null })
      .eq("id", id.data);
    if (error) fail(id.data);
  }
  const { error: deleteError } = await supabase
    .from("product_images")
    .delete()
    .eq("id", imageId.data)
    .eq("product_id", id.data);
  if (deleteError) fail(id.data);
  const { error: storageError } = await supabase.storage
    .from("royal-assets")
    .remove([imageResult.data.storage_path]);
  if (storageError) fail(id.data); // A storage orphan may remain; report cleanup in server logs.
  refresh(id.data);
  redirect(`${editPath(id.data)}?status=image-removed`);
}
