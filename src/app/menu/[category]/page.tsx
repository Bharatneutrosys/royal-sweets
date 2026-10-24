import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";
import { menuCategories } from "@/lib/siteNavigation";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return menuCategories.flatMap(({ slug }) =>
    slug ? [{ category: slug }] : [],
  );
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const menuCategory = menuCategories.find(({ slug }) => slug === category);

  return {
    title: `${menuCategory?.label ?? "Menu"} | Royal Sweets & Fast Food`,
    robots: { index: false, follow: false },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const menuCategory = menuCategories.find(({ slug }) => slug === category);

  if (!menuCategory) {
    notFound();
  }

  return <PlaceholderPage title={menuCategory.label} />;
}
