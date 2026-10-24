import type { Metadata } from "next";
import { MenuPageContent } from "@/components/menu/MenuPageContent";

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
  return <MenuPageContent query={q} />;
}
