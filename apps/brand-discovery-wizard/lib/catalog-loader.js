import { generatedCatalog } from "../data/generated-catalog.js";

export function getCatalog() {
  return generatedCatalog;
}

export function getProductRecord(productType) {
  return generatedCatalog.products.find((item) => item.name === productType) ?? null;
}

export function getPatternRecord(patternName) {
  return generatedCatalog.patterns.find((item) => item.name === patternName) ?? null;
}

export function getStackFamily(stackId) {
  return generatedCatalog.stacks.find((item) => item.id === stackId) ?? null;
}

export function getStyleSuggestions(productType) {
  const product = getProductRecord(productType);
  if (!product) {
    return generatedCatalog.styles.slice(0, 8);
  }

  const preferred = [product.primaryStyle, ...product.secondaryStyles]
    .flatMap((entry) => String(entry ?? "").split("+"))
    .map((entry) => entry.trim())
    .filter(Boolean);

  const matches = generatedCatalog.styles.filter((style) =>
    preferred.some((token) => style.category.includes(token))
  );

  return (matches.length ? matches : generatedCatalog.styles).slice(0, 8);
}

export function getFeaturedStackCards(selectedIds = []) {
  const base = selectedIds.length
    ? generatedCatalog.stacks.filter((stack) => selectedIds.includes(stack.id))
    : generatedCatalog.stacks;

  return base.slice(0, 6);
}
