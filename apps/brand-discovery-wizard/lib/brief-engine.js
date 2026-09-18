const FULL_SITE_PAGE_PRESETS = {
  "Knowledge Base/Documentation": ["Home", "Docs", "Pricing", "Changelog", "Contact"],
  "Design System/Component Library": ["Home", "Components", "Patterns", "Docs", "Contact"],
  "SaaS (General)": ["Home", "Product", "Pricing", "Docs", "Contact"],
  "AI/Chatbot Platform": ["Home", "Product", "Use Cases", "Pricing", "Contact"]
};

const LANDING_SECTION_PRESETS = {
  "AI/Chatbot Platform": ["Hero", "Interactive Demo", "Features", "Use Cases", "FAQ", "CTA"],
  "SaaS (General)": ["Hero", "Value Proposition", "Features", "Social Proof", "FAQ", "CTA"],
  "Design System/Component Library": ["Hero", "Component Preview", "Features", "Documentation Teaser", "CTA"]
};

export function decidePageStrategy(input) {
  const siteType = input.productMode === "full-site" ? "full-site" : "landing";
  const productType = input.productType || "SaaS (General)";

  if (siteType === "full-site") {
    const pages = FULL_SITE_PAGE_PRESETS[productType] ?? ["Home", "Features", "Pricing", "Contact"];
    return {
      siteType,
      pages,
      sections: ["Hero", "Overview", "CTA"]
    };
  }

  const sections = [...(LANDING_SECTION_PRESETS[productType] ?? ["Hero", "Features", "FAQ", "CTA"])];

  if (input.motionLevel === "high" && !sections.includes("Interactive Demo")) {
    sections.splice(1, 0, "Interactive Demo");
  }

  return {
    siteType,
    pages: ["Home"],
    sections
  };
}

export function generateMasterPrompt(input) {
  const brandName = input.brand?.name ?? "Unnamed Brand";
  const tone = (input.brand?.tone ?? []).join(", ") || "clear, modern";
  const stacks = (input.stackChoices ?? []).join(", ") || "No stack selected";
  const pages = (input.pageStrategy?.pages ?? []).join(", ");
  const sections = (input.pageStrategy?.sections ?? []).join(", ");
  const motionLevel = input.motionLevel ?? "medium";
  const threeDLevel = input.threeDLevel ?? "none";

  return [
    `Build a ${input.pageStrategy?.siteType ?? "landing"} website for ${brandName}.`,
    `Brand tone: ${tone}.`,
    `Preferred stack: ${stacks}.`,
    `Required pages: ${pages || "Home"}.`,
    `Required sections: ${sections || "Hero, Features, CTA"}.`,
    `Motion level: ${motionLevel}.`,
    `3D level: ${threeDLevel}.`,
    "Keep the information architecture clear, conversion-aware, and implementation-ready."
  ].join("\n");
}

export function getVisibleQuestions(state) {
  const visible = [
    "product-type",
    "product-mode",
    "stack-family",
    "style-direction",
    "page-goals"
  ];

  if (state.wantsLoader) {
    visible.push("loader-type");
  }

  if (state.needsMascot) {
    visible.push("mascot-style");
  }

  if (state.threeDLevel && state.threeDLevel !== "none") {
    visible.push("three-d-objects", "three-d-placement");
  }

  if (state.productMode === "full-site") {
    visible.push("page-style-consistency", "supporting-pages");
  } else {
    visible.push("hero-vs-slider", "landing-focus");
  }

  return visible;
}
