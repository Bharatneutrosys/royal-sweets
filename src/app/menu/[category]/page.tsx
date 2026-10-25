import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuPageContent } from "@/components/menu/MenuPageContent";
import { primaryCategories } from "@/lib/menuCategories";
import { getPublicCatalog } from "@/lib/supabase/catalog";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q?: string; subcategory?: string }>;
};

export function generateStaticParams() {
  return primaryCategories.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const catalog = await getPublicCatalog().catch(() => null);
  const menuCategory = catalog?.categories.find(
    ({ slug, parentId, isActive }) =>
      slug === category && parentId === null && isActive,
  );

  return {
    title: `${menuCategory?.name ?? "Menu"} | Royal Sweets & Fast Food`,
    description: menuCategory?.description,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const [{ category }, { q, subcategory }] = await Promise.all([
    params,
    searchParams,
  ]);
  const catalog = await getPublicCatalog().catch(() => null);
  if (!catalog)
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
  const menuCategory = catalog.categories.find(
    ({ slug, parentId, isActive }) =>
      slug === category && parentId === null && isActive,
  );

  if (!menuCategory) {
    notFound();
  }

  return (
    <MenuPageContent
      categoryId={menuCategory.id}
      catalog={catalog}
      subcategory={subcategory}
      query={q}
    />
  );
}
