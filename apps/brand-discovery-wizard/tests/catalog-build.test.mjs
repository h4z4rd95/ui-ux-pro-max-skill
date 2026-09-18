import test from "node:test";
import assert from "node:assert/strict";

import { buildCatalog } from "../scripts/build-catalog.mjs";

test("buildCatalog returns stacks, products, patterns, and styles", () => {
  const catalog = buildCatalog();

  assert.ok(Array.isArray(catalog.stacks));
  assert.ok(Array.isArray(catalog.products));
  assert.ok(Array.isArray(catalog.patterns));
  assert.ok(Array.isArray(catalog.styles));

  assert.ok(catalog.stacks.length > 0);
  assert.ok(catalog.products.length > 0);
  assert.ok(catalog.patterns.length > 0);
  assert.ok(catalog.styles.length > 0);
});
