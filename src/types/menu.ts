export type KnownPriceUnit =
  "piece" | "half-pound" | "pound" | "two-pounds" | "plate" | "pack" | "box";
export type PriceUnit = KnownPriceUnit | (string & {}) | null;

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  imageAlt?: string | null;
  parentId: string | null;
  displayOrder: number;
  isActive: boolean;
};

export type PriceOption = {
  id: string;
  productId: string;
  label: string;
  unit: PriceUnit;
  quantity: number | null;
  priceCents: number;
  priceKind: "reference" | "direct";
  isActive: boolean;
};

export type StockStatus = "unknown" | "available" | "out-of-stock";

export type Product = {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  subcategoryId: string;
  description: string | null;
  detailedDescription: string | null;
  image: string | null;
  imageAlt: string | null;
  galleryImages: string[];
  priceOptions: PriceOption[];
  priceSource: string;
  priceVerifiedAt: string | null;
  stockStatus: StockStatus;
  isPublished: boolean;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type HomepageSection = {
  id: string;
  type: "hero" | "categories" | "specials" | "offers" | "visit";
  heading: string;
  eyebrow?: string | null;
  subheading?: string | null;
  description: string | null;
  image: string | null;
  imageAlt?: string | null;
  isVisible: boolean;
  displayOrder: number;
  startAt: string | null;
  endAt: string | null;
};

export type Promotion = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  imageAlt?: string | null;
  discount: { kind: "percent" | "amount"; value: number } | null;
  startAt: string | null;
  endAt: string | null;
  isPublished: boolean;
};

export type TodaysSpecial = {
  id: string;
  productId: string;
  message: string | null;
  startAt: string | null;
  endAt: string | null;
  isPublished: boolean;
  displayOrder: number;
};
