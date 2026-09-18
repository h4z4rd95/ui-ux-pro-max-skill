export const steps = [
  { id: "product", label: "محصول" },
  { id: "stack", label: "استک" },
  { id: "style", label: "استایل" },
  { id: "brand", label: "برند" },
  { id: "motion", label: "موشن" },
  { id: "content", label: "صفحات و محتوا" },
  { id: "output", label: "خروجی" }
];

export function createInitialState(catalog) {
  const defaultProduct = catalog.products.find((item) => item.name === "AI/Chatbot Platform") ?? catalog.products[0];

  return {
    activeStep: 0,
    productMode: "landing",
    productType: defaultProduct?.name ?? "",
    goals: ["lead-gen", "demo"],
    stackFamilies: ["nextjs", "shadcn", "react"],
    styleChoices: [],
    brandName: "NovaOps",
    brandTone: ["precise", "technical", "confident"],
    wantsLoader: true,
    loaderType: "overlay-reveal",
    smoothScroll: true,
    sliderMode: "hero",
    motionLevel: "medium",
    threeDLevel: "none",
    needsMascot: false,
    mascotStyle: "abstract",
    pageStyleConsistency: "consistent",
    contentSections: ["Hero", "Features", "FAQ", "CTA"],
    notes: ""
  };
}

export function toggleArrayValue(items, value) {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
}
