"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { assertAdmin } from "@/lib/admin/auth";
import { imageExtensions, validImageFile } from "@/lib/admin/imageValidation";

const kindSchema = z.enum(["category", "homepage", "promotion"]);
const idSchema = z.string().regex(/^[a-z0-9-]{1,140}$/);
const config = {
  category: {
    table: "categories",
    folder: "categories",
    returnPath: "/admin/categories",
  },
  homepage: {
    table: "homepage_sections",
    folder: "homepage",
    returnPath: "/admin/homepage",
  },
  promotion: {
    table: "promotions",
    folder: "promotions",
    returnPath: "/admin/promotions",
  },
} as const;
const refresh = () => {
  revalidatePath("/", "layout");
  revalidatePath("/", "page");
  revalidatePath("/menu", "layout");
};

export async function uploadContentImageAction(form: FormData) {
  const { supabase } = await assertAdmin();
  const kind = kindSchema.safeParse(form.get("kind"));
  const id = idSchema.safeParse(form.get("id"));
  if (!kind.success || !id.success) redirect("/admin?error=image");
  const item = config[kind.data];
  const file = form.get("image");
  const alt = z
    .string()
    .trim()
    .min(1)
    .max(240)
    .safeParse(form.get("image_alt"));
  if (
    !(file instanceof File) ||
    !alt.success ||
    !imageExtensions[file.type] ||
    file.size === 0 ||
    file.size > 5 * 1024 * 1024
  )
    redirect(`${item.returnPath}?error=image`);
  if (!(await validImageFile(file))) redirect(`${item.returnPath}?error=image`);
  const { data: existing, error: lookupError } = await supabase
    .from(item.table)
    .select("image_path")
    .eq("id", id.data)
    .single();
  if (lookupError || !existing) redirect(`${item.returnPath}?error=image`);
  const path = `${item.folder}/${id.data}/${crypto.randomUUID()}.${imageExtensions[file.type]}`;
  const { error: uploadError } = await supabase.storage
    .from("royal-assets")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (uploadError) redirect(`${item.returnPath}?error=image`);
  const { error: updateError } = await supabase
    .from(item.table)
    .update({ image_path: path, image_alt: alt.data })
    .eq("id", id.data);
  if (updateError) {
    await supabase.storage.from("royal-assets").remove([path]);
    redirect(`${item.returnPath}?error=image`);
  }
  if (existing.image_path && !existing.image_path.startsWith("/images/"))
    await supabase.storage.from("royal-assets").remove([existing.image_path]);
  refresh();
  redirect(`${item.returnPath}?status=image-saved`);
}

export async function removeContentImageAction(form: FormData) {
  const { supabase } = await assertAdmin();
  const kind = kindSchema.safeParse(form.get("kind"));
  const id = idSchema.safeParse(form.get("id"));
  if (!kind.success || !id.success || form.get("confirm") !== "REMOVE")
    redirect("/admin?error=image");
  const item = config[kind.data];
  const { data: existing, error: lookupError } = await supabase
    .from(item.table)
    .select("image_path")
    .eq("id", id.data)
    .single();
  if (lookupError || !existing) redirect(`${item.returnPath}?error=image`);
  const { error } = await supabase
    .from(item.table)
    .update({ image_path: null, image_alt: null })
    .eq("id", id.data);
  if (error) redirect(`${item.returnPath}?error=image`);
  if (existing.image_path && !existing.image_path.startsWith("/images/"))
    await supabase.storage.from("royal-assets").remove([existing.image_path]);
  refresh();
  redirect(`${item.returnPath}?status=image-removed`);
}
