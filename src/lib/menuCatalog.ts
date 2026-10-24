import type { Product } from "@/types/menu";

// Owner-provided snapshot of an external listing, received 2026-10-24.
// The listing blocked direct HTTP verification. These are not checkout prices.
export const menuReferenceUrl =
  "https://order.online/store/royal-sweets-fast-food-west-belt-line-road-303445";

type SeedEntry = readonly [
  name: string,
  cents: number,
  description?: string,
  image?: string,
  imageAlt?: string,
];
type SeedGroup = {
  categoryId: string;
  subcategoryId: string;
  entries: readonly SeedEntry[];
};

const seedGroups: SeedGroup[] = [
  {
    categoryId: "sweets",
    subcategoryId: "traditional-sweets",
    entries: [
      [
        "Rasmalai",
        499,
        "Soft cheese-based sweets traditionally served in sweetened milk.",
        "/images/products/rasmalai.webp",
        "Illustrative rasmalai in sweetened milk",
      ],
      ["Julie", 499],
      [
        "Jalebi",
        250,
        "Crisp, syrup-soaked spirals with a golden finish.",
        "/images/products/jalebi.webp",
        "Illustrative golden jalebi spirals",
      ],
      [
        "Gulab Jamun",
        299,
        "Soft dumplings traditionally enjoyed in fragrant sugar syrup.",
        "/images/products/gulab-jamun.webp",
        "Illustrative gulab jamun in syrup",
      ],
      [
        "Rasgulla",
        299,
        "Light, spongy sweets traditionally served in sugar syrup.",
        "/images/products/rasgulla.webp",
        "Illustrative rasgulla sweets",
      ],
      [
        "Gajar Halwa",
        299,
        "A comforting Indian carrot dessert with warming sweetness.",
        "/images/products/gajar-halwa.webp",
        "Illustrative gajar halwa",
      ],
      [
        "Ladoo",
        299,
        "A classic round Indian sweet often shared at celebrations.",
        "/images/products/ladoo.webp",
        "Illustrative ladoo sweets",
      ],
    ],
  },
  {
    categoryId: "chaat",
    subcategoryId: "cold-chaat",
    entries: [
      [
        "Samosa Chaat",
        725,
        "Samosa served in the lively, layered style of Indian chaat.",
      ],
      [
        "Papdi Chaat",
        650,
        "Crisp papdi traditionally paired with tangy chaat flavors.",
      ],
      [
        "Pani Puri",
        699,
        "Crisp puris enjoyed with tangy, seasoned water.",
        "/images/categories/chaat-street-food.webp",
        "Illustrative pani puri and chaat accompaniments",
      ],
      [
        "Bhel Puri",
        649,
        "A light, crunchy Indian street-food mixture with tangy flavor.",
      ],
      [
        "Sev Puri",
        649,
        "A crisp street-food favorite traditionally finished with sev.",
      ],
      [
        "Dahi Vada",
        649,
        "Soft vada traditionally served with a cooling yogurt accompaniment.",
      ],
      ["Mixed Chaat", 699, "A mix of savory and tangy chaat flavors."],
    ],
  },
  {
    categoryId: "chaat",
    subcategoryId: "hot-chaat",
    entries: [
      [
        "Hot Samosa Chaat",
        799,
        "Warm samosa in a vibrant chaat-style combination.",
        "/images/products/hot-samosa-chaat.webp",
        "Illustrative hot samosa chaat",
      ],
      [
        "Hot Kachori Chaat",
        799,
        "Warm kachori in a savory, tangy chaat-style presentation.",
      ],
      [
        "Aloo Tikki Chaat",
        799,
        "Potato patties traditionally served with layered chaat flavors.",
      ],
    ],
  },
  {
    categoryId: "snacks",
    subcategoryId: "savory-snacks",
    entries: [
      [
        "Samosa",
        175,
        "A crisp pastry snack traditionally filled with a savory mixture.",
        "/images/categories/savory-samosas.webp",
        "Illustrative golden samosas",
      ],
      ["Kachori", 175, "A flaky, savory Indian snack with a crisp exterior."],
      [
        "Mirchi Pakoda",
        175,
        "A savory chili fritter with a satisfying crunch.",
      ],
      ["Batata Vada", 175, "A golden potato fritter, a beloved Indian snack."],
    ],
  },
  {
    categoryId: "beverages",
    subcategoryId: "other-beverages",
    entries: [
      ["Water", 100, "Drinking water."],
      ["Canned Soda", 150, "A canned soft drink."],
    ],
  },
  {
    categoryId: "beverages",
    subcategoryId: "lassi",
    entries: [
      [
        "Mango Lassi",
        599,
        "A refreshing mango-and-yogurt drink.",
        "/images/products/mango-lassi.webp",
        "Illustrative mango lassi drink",
      ],
      [
        "Sweet Lassi",
        550,
        "A sweetened yogurt drink traditionally served chilled.",
      ],
    ],
  },
  {
    categoryId: "indian-food",
    subcategoryId: "dosas",
    entries: [
      ["Plain Dosa", 999, "A classic crisp South Indian crepe."],
      [
        "Masala Dosa",
        1099,
        "A crisp dosa traditionally filled with seasoned potato.",
        "/images/categories/masala-dosa.webp",
        "Illustrative masala dosa with accompaniments",
      ],
      [
        "Mysore Masala Dosa",
        1099,
        "A regional masala dosa style known for its savory flavor.",
      ],
      ["Cheese Dosa", 1099, "A dosa variation with cheese."],
      ["Onion Dosa", 1099, "A crisp dosa variation featuring onion."],
      ["Paneer Dosa", 1099, "A dosa variation featuring paneer."],
    ],
  },
  {
    categoryId: "indian-food",
    subcategoryId: "royal-specials",
    entries: [
      [
        "Chole Bhature",
        1099,
        "A North Indian pairing of spiced chickpeas and fried bread.",
        "/images/products/chole-bhature.webp",
        "Illustrative chole bhature",
      ],
      [
        "Pav Bhaji",
        999,
        "Spiced vegetable bhaji traditionally served with soft bread rolls.",
        "/images/products/pav-bhaji.webp",
        "Illustrative pav bhaji",
      ],
      [
        "Aloo Paratha with Paneer Bhurji",
        1099,
        "A potato-stuffed flatbread paired with paneer bhurji.",
      ],
      ["Aloo Paratha", 899, "A classic potato-stuffed Indian flatbread."],
      [
        "Punjabi Kadhi Rice",
        999,
        "A traditional Punjabi kadhi-and-rice pairing.",
      ],
      [
        "Rajma Rice",
        999,
        "A comforting combination of kidney bean curry and rice.",
      ],
      ["Idli Sambar", 899, "Steamed idli traditionally paired with sambar."],
      ["Veggie Burger", 899, "A savory vegetable burger."],
      [
        "Samosa Sandwich",
        699,
        "A sandwich featuring the familiar flavors of samosa.",
      ],
      ["Vada Pav", 699, "A potato vada tucked into a soft bread roll."],
    ],
  },
  {
    categoryId: "indian-food",
    subcategoryId: "add-ons",
    entries: [
      [
        "Extra Bhatura",
        299,
        "Additional bhatura; quantity pending confirmation.",
      ],
      [
        "Extra Pav",
        299,
        "Additional pav bread; quantity pending confirmation.",
      ],
      [
        "Paneer Bhurji",
        699,
        "A savory paneer preparation; recipe details pending confirmation.",
      ],
      ["Chole", 599, "Spiced chickpeas in a traditional North Indian style."],
      ["Rajma", 599, "A comforting kidney bean preparation."],
      ["Sambar", 499, "A savory South Indian lentil-based preparation."],
    ],
  },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const products: Product[] = seedGroups.flatMap(
  ({ categoryId, subcategoryId, entries }) =>
    entries.map(([name, priceCents, description, image, imageAlt], index) => {
      const id = slugify(name);
      return {
        id,
        slug: id,
        name,
        categoryId,
        subcategoryId,
        description: description ?? null,
        detailedDescription: null,
        image: image ?? null,
        imageAlt: imageAlt ?? null,
        galleryImages: [],
        priceOptions: [
          {
            id: `${id}-reference`,
            productId: id,
            label: "Reference price",
            unit: null,
            quantity: null,
            priceCents,
            isActive: true,
          },
        ],
        priceSource: menuReferenceUrl,
        priceVerifiedAt: null,
        stockStatus: "unknown" as const,
        isPublished: true,
        isFeatured: false,
        displayOrder: index + 1,
        createdAt: "2026-10-24",
        updatedAt: "2026-10-24",
      };
    }),
);

export function filterProducts(
  categoryId?: string,
  subcategoryId?: string,
  query?: string,
) {
  const normalized = query?.trim().toLocaleLowerCase("en-US") ?? "";
  return products.filter(
    (product) =>
      product.isPublished &&
      (!categoryId || product.categoryId === categoryId) &&
      (!subcategoryId || product.subcategoryId === subcategoryId) &&
      (!normalized ||
        product.name.toLocaleLowerCase("en-US").includes(normalized)),
  );
}
