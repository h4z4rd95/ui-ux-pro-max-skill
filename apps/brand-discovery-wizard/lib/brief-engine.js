const FULL_SITE_PAGE_PRESETS = {
  "Knowledge Base/Documentation": ["Home", "Docs", "Pricing", "Changelog", "Contact"],
  "Design System/Component Library": ["Home", "Components", "Patterns", "Docs", "Contact"],
  "SaaS (General)": ["Home", "Product", "Pricing", "Docs", "Contact"],
  "AI/Chatbot Platform": ["Home", "Product", "Use Cases", "Pricing", "Contact"],
  "E-commerce": ["Home", "Shop", "Product Detail", "Cart", "Checkout", "About", "Contact"],
  "E-commerce Luxury": ["Home", "Collection", "Product Detail", "Cart", "Checkout", "Atelier", "Contact"],
  "Gaming": ["Home", "Games", "Game Detail", "Store", "Community", "Support"],
  "Micro SaaS": ["Home", "Product", "Pricing", "Contact"],
  "Fintech/Crypto": ["Home", "Product", "Security", "Pricing", "Support"],
  "Social Media App": ["Home", "Feed", "Profile", "Communities", "Create", "Notifications", "Settings"],
  "Portfolio/Personal": ["Home", "Work", "About", "Journal", "Contact"],
  "Creative Agency": ["Home", "Work", "Services", "About", "Contact"]
};

const LANDING_SECTION_PRESETS = {
  "AI/Chatbot Platform": ["Hero", "Interactive Demo", "Features", "Use Cases", "FAQ", "CTA"],
  "SaaS (General)": ["Hero", "Value Proposition", "Features", "Social Proof", "FAQ", "CTA"],
  "Design System/Component Library": ["Hero", "Component Preview", "Features", "Documentation Teaser", "CTA"],
  "E-commerce": ["Hero", "Featured Products", "Benefits", "Trust Signals", "CTA"],
  "E-commerce Luxury": ["Hero", "Hero Product", "Craftsmanship", "Exclusivity", "CTA"],
  "Gaming": ["Hero", "Gameplay Preview", "Features", "Trailers/Media", "CTA"],
  "Micro SaaS": ["Hero", "Problem/Solution", "Features", "ROI Calculator", "CTA"],
  "Fintech/Crypto": ["Hero", "Trust Signals", "Features", "Security", "CTA"],
  "Social Media App": ["Hero", "App Preview", "Features", "Download", "CTA"],
  "Portfolio/Personal": ["Hero", "Featured Work", "About", "Testimonials", "CTA"],
  "Creative Agency": ["Hero", "Work Showcase", "Services", "Process", "CTA"]
};

export function decidePageStrategy(input) {
  const siteType = input.productMode === "full-site" ? "full-site" : "landing";
  const productType = input.productType || "SaaS (General)";

  if (siteType === "full-site") {
    const pages = FULL_SITE_PAGE_PRESETS[productType] ?? ["Home", "Features", "Pricing", "Contact"];
    return {
      siteType,
      productType,
      pages,
      sections: ["Hero", "Overview", "CTA"],
      goals: input.goals ?? [],
      styleChoices: input.styleChoices ?? []
    };
  }

  const sections = [...(LANDING_SECTION_PRESETS[productType] ?? ["Hero", "Features", "FAQ", "CTA"])];

  if (input.motionLevel === "high" && !sections.includes("Interactive Demo")) {
    sections.splice(1, 0, "Interactive Demo");
  }

  return {
    siteType,
    productType,
    pages: ["Home"],
    sections,
    goals: input.goals ?? [],
    styleChoices: input.styleChoices ?? []
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
  const productType = input.pageStrategy?.productType ?? "SaaS (General)";
  const goals = (input.pageStrategy?.goals ?? []).join(", ") || "conversion-focused";
  const styleChoices = (input.styleChoices ?? []).join(", ") || "modern";
  const smoothScroll = input.smoothScroll ? "enabled" : "disabled";
  const sliderMode = input.sliderMode ?? "hero";
  const loaderType = input.loaderType ?? "none";
  const threeDObjects = input.threeDObjects ?? [];
  const threeDPlacement = input.threeDPlacement ?? "";
  const pageStyleConsistency = input.pageStyleConsistency ?? "consistent";
  const supportingPages = (input.supportingPages ?? []).join(", ");

  let motionNotes = `Motion level: ${motionLevel}.`;
  if (threeDLevel !== "none" && threeDLevel !== "") {
    motionNotes += ` 3D level: ${threeDLevel}.`;
    if (threeDObjects.length > 0) {
      motionNotes += ` 3D objects: ${threeDObjects.join(", ")}.`;
    }
    if (threeDPlacement) {
      motionNotes += ` 3D placement: ${threeDPlacement}.`;
    }
  }
  if (loaderType && loaderType !== "none") {
    motionNotes += ` Loader: ${loaderType}.`;
  }
  motionNotes += ` Smooth scroll: ${smoothScroll}. Slider mode: ${sliderMode}.`;

  let structureNotes = `Required pages: ${pages || "Home"}.`;
  if (input.pageStrategy?.siteType === "full-site") {
    structureNotes += ` Page style consistency: ${pageStyleConsistency}.`;
    if (supportingPages) {
      structureNotes += ` Supporting pages: ${supportingPages}.`;
    }
  }

  return [
    `Build a ${input.pageStrategy?.siteType ?? "landing"} website for the "${productType}" product "${brandName}".`,
    `Brand personality: ${tone}.`,
    `Primary goal: ${goals}.`,
    `Preferred stack: ${stacks}.`,
    `Visual style: ${styleChoices}.`,
    motionNotes,
    structureNotes,
    `Required sections: ${sections || "Hero, Features, CTA"}.`,
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
