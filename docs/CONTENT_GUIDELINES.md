# Content Guidelines

## Editorial voice

Write with warmth, clarity, and specific sensory detail. Keep product descriptions concise and culturally accurate. Use the restaurant's own spelling for item names until the owner approves a correction. Avoid unsupported superlatives, awards, origin stories, freshness guarantees, and dietary claims.

## Menu references and prices

The ordering reference supplied for this project is https://order.online/store/royal-sweets-fast-food-west-belt-line-road-303445. The owner-provided Task 4.1 list includes sweets, chaat, snacks, Indian food, and lassi, which supports the hero's broad category language. A non-browser HTTP request to the ordering page returned 403 on 2026-10-24, so its live content and prices could not be independently checked during this task. No item or price from that list is published in the hero.

Task 4.3 publishes only the twelve owner-supplied featured item names and online prices in a clearly labeled homepage snapshot. The ordering page again returned HTTP 403 to a terminal request on 2026-10-24; current live prices could not be independently verified, so `priceLastVerified` remains null. Cards direct customers to confirm current amounts on the ordering platform and note that in-store prices may differ.

Before Stage 5 publishes a full catalog, confirm each name, description, availability, price, currency, and source date. Do not infer serving size, count, weight, or per-pound units. Ask the owner to clarify unfamiliar names such as “Julie” before writing a description.

## Product descriptions

The examples below describe traditional dishes in general. They are **not confirmed descriptions of Royal Sweets recipes**.

| Dish        | General editorial example                                                          |
| ----------- | ---------------------------------------------------------------------------------- |
| Gulab Jamun | Soft, golden dumplings soaked in fragrant sugar syrup, a beloved Indian dessert.   |
| Rasmalai    | Delicate, soft cheese-based sweets served in rich, sweetened milk.                 |
| Jalebi      | Crisp, golden spirals soaked in sweet syrup, known for their irresistible texture. |

Use these as writing guidance only. Verify the restaurant's preparation, flavors, garnishes, and presentation before publishing product-specific copy.

## Ingredients, allergens, and dietary labels

Keep these three categories separate in future product data and customer-facing copy:

1. **Typical traditional ingredients:** Background research or culinary knowledge, clearly labeled as general. Gulab jamun, for example, is traditionally associated with milk solids, flour, sugar syrup, and flavorings. This does not establish the restaurant's recipe.
2. **Restaurant-confirmed ingredients:** Publish only after the owner or kitchen supplies the current recipe and approves the disclosure.
3. **Restaurant-confirmed allergens:** Publish only after the owner verifies ingredients and cross-contact practices. Ingredients alone do not establish allergen safety.

Until confirmed, mark ingredients and allergens as pending internally. Do not claim gluten-free, nut-free, dairy-free, vegan, certified vegetarian, or allergen-safe status. Do not invent ingredients for unclear product names.

## Photography

Use restaurant-owned imagery only with permission, or licensed stock imagery with recorded source and license. Label stock photography as illustrative and do not imply it depicts Royal Sweets products. The current hero image is recorded in [IMAGE_SOURCES.md](IMAGE_SOURCES.md). Replace it with approved restaurant photography when available, preserving meaningful alt text and local optimization.

The six Task 4.2 category images are also illustrative. The beverage photo depicts a mango drink but is not verified as lassi; the savory mix is a general snack-mix photo and does not establish any Royal Sweets hot-mix product. Category text describes broad cuisines, not specific in-house preparations or availability. Confirm hot-mix inventory and obtain approved restaurant photography before using product-specific claims.

Task 4.3 product descriptions explain traditional dishes in general. They do not verify Royal Sweets ingredients, preparation, portions, or presentation. Product photography is also illustrative, and some licensed photographs depict food from other kitchens. The homepage credits disclosure identifies creators and licenses; the source ledger records local processing. Do not add recipe-specific claims, allergen badges, dietary labels, or nutritional data until the restaurant confirms them.

## Brand and business copy

The Task 4.4 homepage story uses only the verified Richardson identity, location, and published menu categories. It is an editorial introduction, not a factual business history. Do not add owners, founding dates, awards, preparation guarantees, or statements taken from similarly named Dallas-area businesses. Celebration copy should invite questions by phone without asserting that catering packages or event services are currently offered. The visit section reads address, phone, and hours from `src/lib/business.ts`; keep unknown hours labeled as such until the owner confirms them.
