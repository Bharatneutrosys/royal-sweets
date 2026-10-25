"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { assertAdmin } from "@/lib/admin/auth";
import { slugFor, positiveOrder, checked } from "@/lib/admin/validation";

const categoryId = z.string().regex(/^[a-z0-9-]{1,100}$/);
const schema = z.object({
  id: categoryId.optional(),
  name: z.string().trim().min(1).max(100),
  description: z.string().trim().max(1000),
  parent_id: categoryId.nullable(),
  display_order: positiveOrder,
});
const fail = (): never => redirect("/admin/categories?error=save");

export async function saveCategoryAction(form: FormData) {
  const { supabase } = await assertAdmin();
  const input = schema.safeParse({
    id: form.get("id") || undefined,
    name: form.get("name"),
    description: form.get("description") ?? "",
    parent_id: form.get("parent_id") || null,
    display_order: form.get("display_order"),
  });
  if (!input.success) return fail();
  if (!input.data.id && !slugFor(input.data.name)) fail();
  if (input.data.id) {
    const current = await supabase
      .from("categories")
      .select("parent_id")
      .eq("id", input.data.id)
      .single();
    if (current.error || current.data.parent_id !== input.data.parent_id)
      return fail();
  }
  const row = {
    name: input.data.name,
    description: input.data.description,
    parent_id: input.data.parent_id,
    display_order: input.data.display_order,
    is_active: checked(form, "is_active"),
  };
  const result = input.data.id
    ? await supabase
        .from("categories")
        .update(row)
        .eq("id", input.data.id)
        .select("id")
        .single()
    : await supabase
        .from("categories")
        .insert({
          ...row,
          id: crypto.randomUUID(),
          slug: slugFor(input.data.name),
          image_path: null,
        })
        .select("id")
        .single();
  if (result.error || !result.data) fail();
  revalidatePath("/", "layout");
  revalidatePath("/menu", "layout");
  revalidatePath("/", "page");
  redirect("/admin/categories?status=saved");
}

export async function setCategoryActiveAction(form: FormData) {
  const { supabase } = await assertAdmin();
  const id = categoryId.safeParse(form.get("id"));
  const active = form.get("active") === "true";
  if (!id.success) fail();
  const { error } = await supabase
    .from("categories")
    .update({ is_active: active })
    .eq("id", id.data);
  if (error) fail();
  revalidatePath("/", "layout");
  revalidatePath("/menu", "layout");
  revalidatePath("/", "page");
  redirect("/admin/categories?status=saved");
}

export async function deleteCategoryAction(form: FormData) {
  const { supabase } = await assertAdmin();
  if (form.get("confirm") !== "DELETE") fail();
  const id = categoryId.safeParse(form.get("id"));
  if (!id.success) fail();
  const [products, children] = await Promise.all([
    supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .or(`category_id.eq.${id.data},subcategory_id.eq.${id.data}`),
    supabase
      .from("categories")
      .select("id", { count: "exact", head: true })
      .eq("parent_id", id.data),
  ]);
  if (products.error || children.error || products.count || children.count)
    redirect("/admin/categories?error=in-use");
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id.data);
  if (error) fail();
  revalidatePath("/", "layout");
  revalidatePath("/menu", "layout");
  revalidatePath("/", "page");
  redirect("/admin/categories?status=deleted");
}
