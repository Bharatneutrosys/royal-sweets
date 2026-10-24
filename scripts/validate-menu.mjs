import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { filterProducts, products } from "../src/lib/menuCatalog.ts";
import {
  categories,
  primaryCategories,
  subcategoriesFor,
} from "../src/lib/menuCategories.ts";

const expectedCounts = {
  sweets: 7,
  "indian-food": 22,
  chaat: 10,
  snacks: 4,
  "hot-mix": 0,
  beverages: 4,
};
const expectedPrices = {
  Rasmalai: 499,
  Julie: 499,
  Jalebi: 250,
  "Gulab Jamun": 299,
  Rasgulla: 299,
  "Gajar Halwa": 299,
  Ladoo: 299,
  "Samosa Chaat": 725,
  "Papdi Chaat": 650,
  "Pani Puri": 699,
  "Bhel Puri": 649,
  "Sev Puri": 649,
  "Dahi Vada": 649,
  "Mixed Chaat": 699,
  "Hot Samosa Chaat": 799,
  "Hot Kachori Chaat": 799,
  "Aloo Tikki Chaat": 799,
  Samosa: 175,
  Kachori: 175,
  "Mirchi Pakoda": 175,
  "Batata Vada": 175,
  Water: 100,
  "Canned Soda": 150,
  "Mango Lassi": 599,
  "Sweet Lassi": 550,
  "Plain Dosa": 999,
  "Masala Dosa": 1099,
  "Mysore Masala Dosa": 1099,
  "Cheese Dosa": 1099,
  "Onion Dosa": 1099,
  "Paneer Dosa": 1099,
  "Chole Bhature": 1099,
  "Pav Bhaji": 999,
  "Aloo Paratha with Paneer Bhurji": 1099,
  "Aloo Paratha": 899,
  "Punjabi Kadhi Rice": 999,
  "Rajma Rice": 999,
  "Idli Sambar": 899,
  "Veggie Burger": 899,
  "Samosa Sandwich": 699,
  "Vada Pav": 699,
  "Extra Bhatura": 299,
  "Extra Pav": 299,
  "Paneer Bhurji": 699,
  Chole: 599,
  Rajma: 599,
  Sambar: 499,
};

assert.equal(products.length, 47);
assert.equal(Object.keys(expectedPrices).length, 47);
assert.equal(new Set(products.map((item) => item.id)).size, 47);
assert.deepEqual(
  new Set(products.map((item) => item.name)),
  new Set(Object.keys(expectedPrices)),
);
assert.equal(primaryCategories.length, 6);
for (const [categoryId, count] of Object.entries(expectedCounts)) {
  assert.equal(filterProducts(categoryId).length, count, categoryId);
}
for (const item of products) {
  assert.equal(item.priceOptions.length, 1, item.name);
  assert.equal(
    item.priceOptions[0].priceCents,
    expectedPrices[item.name],
    item.name,
  );
  assert.equal(item.priceOptions[0].unit, null, item.name);
  assert.equal(item.stockStatus, "unknown", item.name);
  assert.equal(item.priceVerifiedAt, null, item.name);
  assert.ok(
    primaryCategories.some((category) => category.id === item.categoryId),
  );
  assert.ok(
    subcategoriesFor(item.categoryId).some(
      (category) => category.id === item.subcategoryId,
    ),
  );
  if (item.image) {
    assert.ok(
      existsSync(join(process.cwd(), "public", item.image.slice(1))),
      item.image,
    );
    assert.ok(item.imageAlt, item.name);
  }
}
assert.equal(
  filterProducts(undefined, undefined, "rAsMaLaI")[0]?.name,
  "Rasmalai",
);
assert.equal(filterProducts("chaat", "hot-chaat").length, 3);
assert.equal(filterProducts("chaat", "cold-chaat").length, 7);
assert.ok(
  categories.every(
    (category) =>
      !category.image ||
      existsSync(join(process.cwd(), "public", category.image.slice(1))),
  ),
);
assert.equal(products.find((item) => item.name === "Julie")?.description, null);
console.log(
  "Menu seed validated: 47 unique products, 6 categories, prices, grouping, filters, and image paths.",
);
