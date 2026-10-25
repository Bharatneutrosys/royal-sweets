import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import { menuCategories, type MenuNavigationItem } from "@/lib/siteNavigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseConfig } from "@/lib/supabase/config";

export const getMenuNavigation = cache(
  async (): Promise<MenuNavigationItem[]> => {
    if (!supabaseConfig()) return menuCategories;
    await connection();
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("categories")
      .select("name,slug")
      .is("parent_id", null)
      .eq("is_active", true)
      .order("display_order");
    if (error) return [{ label: "All Menu", href: "/menu", slug: null }];
    return [
      { label: "All Menu", href: "/menu", slug: null },
      ...(data ?? []).map((row) => ({
        label: row.name,
        href: `/menu/${row.slug}`,
        slug: row.slug,
      })),
    ];
  },
);
