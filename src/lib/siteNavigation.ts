export const siteLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Catering", href: "/catering" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const menuCategories = [
  { label: "All Menu", href: "/menu", slug: null },
  { label: "Traditional Indian Sweets", href: "/menu/sweets", slug: "sweets" },
  { label: "Chaat & Street Food", href: "/menu/chaat", slug: "chaat" },
  { label: "Snacks", href: "/menu/snacks", slug: "snacks" },
  { label: "Hot Mix & Namkeen", href: "/menu/hot-mix", slug: "hot-mix" },
  {
    label: "Indian Food & Dosas",
    href: "/menu/indian-food",
    slug: "indian-food",
  },
  { label: "Lassi & Beverages", href: "/menu/beverages", slug: "beverages" },
] as const;

export function isNavigationActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}
