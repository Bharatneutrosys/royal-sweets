import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { chicagoToUtc, dollarsToCents } from "../src/lib/admin/validation.ts";
import { validImageFile } from "../src/lib/admin/imageValidation.ts";

test("prices are stored as exact integer cents", () => {
  assert.equal(dollarsToCents("2.50"), 250);
  assert.equal(dollarsToCents("10.99"), 1099);
  assert.throws(() => dollarsToCents("2.999"));
  assert.throws(() => dollarsToCents("-1"));
});

test("Chicago schedule conversion handles DST boundaries", () => {
  assert.equal(chicagoToUtc("2026-01-10T12:00"), "2026-01-10T18:00:00.000Z");
  assert.equal(chicagoToUtc("2026-07-10T12:00"), "2026-07-10T17:00:00.000Z");
  assert.throws(() => chicagoToUtc("2026-03-08T02:30"));
  assert.throws(() => chicagoToUtc("2026-11-01T01:30"));
  assert.throws(() => chicagoToUtc("2026-02-31T12:00"));
});

test("image upload rejects mismatched file signatures", async () => {
  const fake = new File([new Uint8Array(20)], "fake.png", {
    type: "image/png",
  });
  assert.equal(await validImageFile(fake), false);
  const png = new File(
    [new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 0])],
    "real.png",
    { type: "image/png" },
  );
  assert.equal(await validImageFile(png), true);
});

test("seed and RLS scaffolding have the required tables and counts", () => {
  const sql = readFileSync(
    new URL("../supabase/seed.sql", import.meta.url),
    "utf8",
  );
  const migration = readFileSync(
    new URL("../supabase/migrations/202610240001_initial.sql", import.meta.url),
    "utf8",
  );
  assert.equal(
    (sql.match(/insert into public\.products \(/g) ?? []).length,
    47,
  );
  assert.equal(
    (sql.match(/insert into public\.product_price_options \(/g) ?? []).length,
    47,
  );
  assert.match(sql, /on conflict do nothing/i);
  for (const table of [
    "admin_users",
    "categories",
    "products",
    "product_images",
    "product_price_options",
    "homepage_sections",
    "promotions",
    "todays_specials",
  ])
    assert.match(
      migration,
      new RegExp(`alter table public\\.${table} enable row level security`),
    );
  assert.doesNotMatch(migration, /disable row level security/i);
  assert.match(migration, /create policy royal_asset_insert/);
});
