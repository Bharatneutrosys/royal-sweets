"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { assertAdmin } from "@/lib/admin/auth";
import { checked, chicagoToUtc, positiveOrder } from "@/lib/admin/validation";

const uuid = z.string().uuid();
const id = z.string().regex(/^[a-z0-9-]{1,140}$/);
const refresh = () => {
  revalidatePath("/", "layout");
  revalidatePath("/", "page");
  revalidatePath("/menu", "layout");
};

function schedule(form: FormData) {
  const startsAt = chicagoToUtc(String(form.get("starts_at") || "") || null);
  const endsAt = chicagoToUtc(String(form.get("ends_at") || "") || null);
  if (startsAt && endsAt && Date.parse(endsAt) <= Date.parse(startsAt))
    throw new Error("End must follow start");
  return { starts_at: startsAt, ends_at: endsAt };
}

export async function saveSpecialAction(form: FormData) {
  const { supabase } = await assertAdmin();
  const parsed = z
    .object({
      id: uuid.optional(),
      product_id: id,
      promotional_message: z.string().trim().max(300),
      display_order: positiveOrder,
    })
    .safeParse({
      id: form.get("id") || undefined,
      product_id: form.get("product_id"),
      promotional_message: form.get("promotional_message") ?? "",
      display_order: form.get("display_order"),
    });
  if (!parsed.success) redirect("/admin/specials?error=save");
  let dates: ReturnType<typeof schedule>;
  try {
    dates = schedule(form);
  } catch {
    redirect("/admin/specials?error=date");
  }
  const { id: specialId, ...fields } = parsed.data;
  const row = {
    ...fields,
    promotional_message: fields.promotional_message || null,
    ...dates,
    is_published: checked(form, "is_published"),
  };
  const result = specialId
    ? await supabase.from("todays_specials").update(row).eq("id", specialId)
    : await supabase.from("todays_specials").insert(row);
  if (result.error) redirect("/admin/specials?error=save");
  refresh();
  redirect("/admin/specials?status=saved");
}

export async function deleteSpecialAction(form: FormData) {
  const { supabase } = await assertAdmin();
  const parsed = uuid.safeParse(form.get("id"));
  if (!parsed.success || form.get("confirm") !== "DELETE")
    redirect("/admin/specials?error=save");
  const { error } = await supabase
    .from("todays_specials")
    .delete()
    .eq("id", parsed.data);
  if (error) redirect("/admin/specials?error=save");
  refresh();
  redirect("/admin/specials?status=deleted");
}

export async function savePromotionAction(form: FormData) {
  const { supabase } = await assertAdmin();
  const parsed = z
    .object({
      id: uuid.optional(),
      title: z.string().trim().min(1).max(140),
      description: z.string().trim().max(1200),
      display_order: positiveOrder,
      discount_type: z.enum(["percent", "amount"]).nullable(),
      discount_value: z.coerce.number().int().positive().nullable(),
    })
    .safeParse({
      id: form.get("id") || undefined,
      title: form.get("title"),
      description: form.get("description") ?? "",
      display_order: form.get("display_order"),
      discount_type: form.get("discount_type") || null,
      discount_value: form.get("discount_value") || null,
    });
  if (!parsed.success) redirect("/admin/promotions?error=save");
  const { id: promotionId, ...fields } = parsed.data;
  if (
    (fields.discount_type === null) !== (fields.discount_value === null) ||
    (fields.discount_type === "percent" && fields.discount_value! > 100)
  )
    redirect("/admin/promotions?error=save");
  let dates: ReturnType<typeof schedule>;
  try {
    dates = schedule(form);
  } catch {
    redirect("/admin/promotions?error=date");
  }
  const row = {
    ...fields,
    ...dates,
    is_published: checked(form, "is_published"),
  };
  const result = promotionId
    ? await supabase.from("promotions").update(row).eq("id", promotionId)
    : await supabase.from("promotions").insert(row);
  if (result.error) redirect("/admin/promotions?error=save");
  refresh();
  redirect("/admin/promotions?status=saved");
}

export async function deletePromotionAction(form: FormData) {
  const { supabase } = await assertAdmin();
  const parsed = uuid.safeParse(form.get("id"));
  if (!parsed.success || form.get("confirm") !== "DELETE")
    redirect("/admin/promotions?error=save");
  const { error } = await supabase
    .from("promotions")
    .delete()
    .eq("id", parsed.data);
  if (error) redirect("/admin/promotions?error=save");
  refresh();
  redirect("/admin/promotions?status=deleted");
}

export async function saveHomepageSectionAction(form: FormData) {
  const { supabase } = await assertAdmin();
  const parsed = z
    .object({
      id,
      heading: z.string().trim().max(180),
      eyebrow: z.string().trim().max(180),
      subheading: z.string().trim().max(400),
      description: z.string().trim().max(1500),
      display_order: positiveOrder,
    })
    .safeParse({
      id: form.get("id"),
      heading: form.get("heading") ?? "",
      eyebrow: form.get("eyebrow") ?? "",
      subheading: form.get("subheading") ?? "",
      description: form.get("description") ?? "",
      display_order: form.get("display_order"),
    });
  if (!parsed.success) redirect("/admin/homepage?error=save");
  const { id: sectionId, ...fields } = parsed.data;
  const row = {
    ...fields,
    eyebrow: fields.eyebrow || null,
    subheading: fields.subheading || null,
    description: fields.description || null,
    is_visible: checked(form, "is_visible"),
  };
  const { data, error } = await supabase
    .from("homepage_sections")
    .update(row)
    .eq("id", sectionId)
    .select("id")
    .single();
  if (error || !data) redirect("/admin/homepage?error=save");
  refresh();
  redirect("/admin/homepage?status=saved");
}
