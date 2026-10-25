export const siteLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Catering", href: "/catering" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

import { primaryCategories } from "@/lib/menuCategories";

export const menuCategories = [
  { label: "All Menu", href: "/menu", slug: null },
  ...primaryCategories.map(({ name, slug }) => ({
    label: name,
    href: `/menu/${slug}`,
    slug,
  })),
];

export type MenuNavigationItem = {
  label: string;
  href: string;
  slug: string | null;
};

export function isNavigationActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}
