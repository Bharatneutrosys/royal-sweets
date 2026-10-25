// Deliberate setup only. Never run this during application startup or deployment.
import { writeFileSync } from "node:fs";
import { categories } from "../src/lib/menuCategories.ts";
import { products } from "../src/lib/menuCatalog.ts";
import { homepageSections } from "../src/lib/homeContent.ts";

function sql(value) {
  if (value === null || value === undefined) return "null";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error("Invalid seed number");
    return String(value);
  }
  return `'${String(value).replaceAll("'", "''")}'`;
}

function insert(table, columns, values) {
  return `insert into public.${table} (${columns.join(", ")}) values (${values.map(sql).join(", ")}) on conflict do nothing;`;
}

const lines = [
  "-- Generated from the versioned local catalog. Run once after the migration.",
  "-- ON CONFLICT DO NOTHING protects owner edits on subsequent deliberate runs.",
  "begin;",
];
for (const category of categories) {
  lines.push(
    insert(
      "categories",
      [
        "id",
        "name",
        "slug",
        "description",
        "image_path",
        "parent_id",
        "display_order",
        "is_active",
      ],
      [
        category.id,
        category.name,
        category.slug,
        category.description,
        category.image,
        category.parentId,
        category.displayOrder,
        category.isActive,
      ],
    ),
  );
}
for (const product of products) {
  lines.push(
    insert(
      "products",
      [
        "id",
        "category_id",
        "subcategory_id",
        "name",
        "slug",
        "short_description",
        "detailed_description",
        "primary_image_path",
        "image_alt",
        "stock_status",
        "is_published",
        "is_featured",
        "display_order",
        "price_source",
        "price_verified_at",
      ],
      [
        product.id,
        product.categoryId,
        product.subcategoryId,
        product.name,
        product.slug,
        product.description,
        product.detailedDescription,
        product.image,
        product.imageAlt,
        product.stockStatus,
        product.isPublished,
        product.isFeatured,
        product.displayOrder,
        product.priceSource,
        product.priceVerifiedAt,
      ],
    ),
  );
  for (const option of product.priceOptions) {
    lines.push(
      insert(
        "product_price_options",
        [
          "id",
          "product_id",
          "label",
          "unit",
          "quantity",
          "price_cents",
          "price_kind",
          "is_active",
          "display_order",
        ],
        [
          option.id,
          product.id,
          option.label,
          option.unit,
          option.quantity,
          option.priceCents,
          option.priceKind,
          option.isActive,
          1,
        ],
      ),
    );
  }
}
for (const section of homepageSections) {
  lines.push(
    insert(
      "homepage_sections",
      [
        "id",
        "section_key",
        "section_type",
        "heading",
        "eyebrow",
        "subheading",
        "description",
        "image_path",
        "image_alt",
        "is_visible",
        "display_order",
      ],
      [
        section.id,
        section.id,
        section.type,
        section.heading,
        section.eyebrow,
        section.subheading,
        section.description,
        section.image,
        section.imageAlt,
        section.isVisible,
        section.displayOrder,
      ],
    ),
  );
}
lines.push("commit;", "");
writeFileSync(
  new URL("../supabase/seed.sql", import.meta.url),
  lines.join("\n"),
  "utf8",
);
console.log(
  `Wrote ${categories.length} categories, ${products.length} products, ${products.length} reference prices, and ${homepageSections.length} homepage sections.`,
);
