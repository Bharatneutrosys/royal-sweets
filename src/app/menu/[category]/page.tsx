import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuPageContent } from "@/components/menu/MenuPageContent";
import { primaryCategories } from "@/lib/menuCategories";

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
  const menuCategory = primaryCategories.find(({ slug }) => slug === category);

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
  const menuCategory = primaryCategories.find(({ slug }) => slug === category);

  if (!menuCategory) {
    notFound();
  }

  return (
    <MenuPageContent
      categoryId={menuCategory.id}
      subcategory={subcategory}
      query={q}
    />
  );
}
