import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseConfig } from "@/lib/supabase/config";
import { imageUrl } from "@/lib/supabase/catalog";
import {
  homepageSections,
  promotions,
  todaysSpecials,
} from "@/lib/homeContent";
import type { HomepageSection, Promotion, TodaysSpecial } from "@/types/menu";

export type PublicHomepage = {
  sections: HomepageSection[];
  promotions: Promotion[];
  specials: TodaysSpecial[];
  source: "seed" | "database";
};

export const getPublicHomepage = cache(async (): Promise<PublicHomepage> => {
  if (!supabaseConfig())
    return {
      sections: homepageSections,
      promotions,
      specials: todaysSpecials,
      source: "seed",
    };
  await connection();
  const supabase = await createSupabaseServerClient();
  const [sectionsResult, promotionsResult, specialsResult] = await Promise.all([
    supabase
      .from("homepage_sections")
      .select("*")
      .eq("is_visible", true)
      .order("display_order"),
    supabase
      .from("promotions")
      .select("*")
      .eq("is_published", true)
      .order("display_order"),
    supabase
      .from("todays_specials")
      .select("*")
      .eq("is_published", true)
      .order("display_order"),
  ]);
  if (sectionsResult.error || promotionsResult.error || specialsResult.error)
    throw new Error("Homepage content is temporarily unavailable");
  const now = Date.now();
  const active = (start: string | null, end: string | null) =>
    (!start || Date.parse(start) <= now) && (!end || Date.parse(end) > now);
  const sections: HomepageSection[] = await Promise.all(
    (sectionsResult.data ?? []).map(async (row) => ({
      id: row.id,
      type: row.section_type,
      heading: row.heading,
      eyebrow: row.eyebrow,
      description: row.description,
      image: await imageUrl(row.image_path, supabase),
      imageAlt: row.image_alt,
      isVisible: row.is_visible,
      displayOrder: row.display_order,
      startAt: null,
      endAt: null,
      subheading: row.subheading,
    })),
  );
  const activePromotions: Promotion[] = await Promise.all(
    (promotionsResult.data ?? [])
      .filter((row) => active(row.starts_at, row.ends_at))
      .map(async (row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        image: await imageUrl(row.image_path, supabase),
        imageAlt: row.image_alt,
        discount:
          row.discount_type && row.discount_value
            ? { kind: row.discount_type, value: row.discount_value }
            : null,
        startAt: row.starts_at,
        endAt: row.ends_at,
        isPublished: row.is_published,
      })),
  );
  const specials: TodaysSpecial[] = (specialsResult.data ?? [])
    .filter((row) => active(row.starts_at, row.ends_at))
    .map((row) => ({
      id: row.id,
      productId: row.product_id,
      message: row.promotional_message,
      startAt: row.starts_at,
      endAt: row.ends_at,
      isPublished: row.is_published,
      displayOrder: row.display_order,
    }));
  return {
    sections,
    promotions: activePromotions,
    specials,
    source: "database",
  };
});
