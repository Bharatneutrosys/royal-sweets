import type { Metadata } from "next";
import { MenuPageContent } from "@/components/menu/MenuPageContent";
import { getPublicCatalog } from "@/lib/supabase/catalog";

export const metadata: Metadata = {
  title: "Menu | Royal Sweets & Fast Food",
  description:
    "Browse sweets, Indian food, chaat, snacks, and beverages at Royal Sweets & Fast Food in Richardson.",
};

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const catalog = await getPublicCatalog().catch(() => null);
  if (!catalog) {
    return (
      <main id="main-content" tabIndex={-1} className="page-container py-20">
        <h1 className="font-display text-page text-primary">
          Menu temporarily unavailable
        </h1>
        <p className="mt-4 text-muted">
          Please call the restaurant for current menu information.
        </p>
      </main>
    );
  }
  return <MenuPageContent catalog={catalog} query={q} />;
}
