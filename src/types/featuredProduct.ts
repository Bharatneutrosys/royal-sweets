import type { menuCategories } from "@/lib/siteNavigation";

export type MenuCategoryId = Exclude<
  (typeof menuCategories)[number]["slug"],
  null
>;
export type FeaturedSectionId = "sweets" | "favorites";

export type ProductImageCredit = {
  title: string;
  creator: string;
  sourceUrl: string;
  license: "Unsplash License" | "CC BY-SA 4.0";
  licenseUrl: string;
};

export type FeaturedProduct = {
  id: string;
  slug: string;
  name: string;
  categoryId: MenuCategoryId;
  shortDescription: string;
  image: string;
  imageAlt: string;
  imageCredit: ProductImageCredit;
  onlinePriceCents: number;
  priceSource: string;
  priceLastVerified: string | null;
  priceUnit: null;
  featuredSection: FeaturedSectionId;
  displayOrder: number;
};
