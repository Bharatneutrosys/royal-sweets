import { menuCategories } from "@/lib/siteNavigation";

type CategorySlug = Exclude<(typeof menuCategories)[number]["slug"], null>;

type CategoryEditorial = {
  title?: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

const categoryEditorial: Record<CategorySlug, CategoryEditorial> = {
  sweets: {
    subtitle: "A little sweetness, a lot of tradition.",
    description:
      "Explore timeless Indian favorites, from rich milk-based delicacies to syrup-soaked treats and festive mithai.",
    image: "/images/categories/traditional-indian-sweets.webp",
    imageAlt:
      "Diamond-shaped Indian sweets garnished with nuts on a serving board",
  },
  chaat: {
    subtitle: "Bold flavors. Irresistible cravings.",
    description:
      "Discover the vibrant flavors of Indian street food, from tangy pani puri to savory chaat favorites.",
    image: "/images/categories/chaat-street-food.webp",
    imageAlt: "Pani puri and chaat accompaniments arranged on a round tray",
  },
  snacks: {
    title: "Savory Snacks",
    subtitle: "Crispy, savory, unforgettable.",
    description:
      "Enjoy beloved Indian snacks, including golden samosas, kachori, and other savory favorites.",
    image: "/images/categories/savory-samosas.webp",
    imageAlt: "Golden fried samosas with a green chili on a serving board",
  },
  "hot-mix": {
    subtitle: "The perfect savory crunch.",
    description:
      "Explore the world of crunchy Indian savory mixtures and namkeen.",
    image: "/images/categories/namkeen-mixture.webp",
    imageAlt: "Illustrative namkeen mixture with sev and peanuts in a bowl",
  },
  "indian-food": {
    subtitle: "Comfort food with authentic flavor.",
    description:
      "Explore Indian favorites, from crispy dosas and chole bhature to hearty traditional meals.",
    image: "/images/categories/masala-dosa.webp",
    imageAlt: "Crispy dosa served with several chutneys and accompaniments",
  },
  beverages: {
    subtitle: "A refreshing taste of tradition.",
    description:
      "Refresh your day with classic Indian lassis and satisfying beverages.",
    image: "/images/categories/mango-drink.webp",
    imageAlt: "Tall glass of a pale yellow mango drink beside fresh mango",
  },
};

export const homeCategories = menuCategories
  .filter(
    (category): category is typeof category & { slug: CategorySlug } =>
      category.slug !== null,
  )
  .map((category, index) => ({
    id: category.slug,
    title: categoryEditorial[category.slug].title ?? category.label,
    subtitle: categoryEditorial[category.slug].subtitle,
    description: categoryEditorial[category.slug].description,
    image: categoryEditorial[category.slug].image,
    imageAlt: categoryEditorial[category.slug].imageAlt,
    href: category.href,
    displayOrder: index + 1,
    featured: categoryEditorial[category.slug].featured ?? false,
  }));
