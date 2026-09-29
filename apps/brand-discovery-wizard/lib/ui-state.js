export const steps = [
  { id: "product", label: "محصول", subtitle: "دامنه و هدف", description: "لندینگ یا سایت کامل — این انتخاب مسیر بقیه‌ی سوالات را عوض می‌کند" },
  { id: "stack", label: "استک", subtitle: "زبان و کتابخانه", description: "استک‌های فنی برای محدود کردن پرامپت نهایی" },
  { id: "style", label: "استایل", subtitle: "رفرنس بصری", description: "از تصاویر واقعی انتخاب استایل — نه از کلمات" },
  { id: "brand", label: "برند", subtitle: "شخصیت و لوگو", description: "لحن، رنگ و لوگوی برند" },
  { id: "motion", label: "موشن", subtitle: "انیمیشن و حرکت", description: "لودر، اسکرول و حرکات سه‌بعدی" },
  { id: "content", label: "صفحات و محتوا", subtitle: "ساختار صفحه", description: "صفحات، بخش‌ها و سازگاری استایلی" },
  { id: "output", label: "خروجی", subtitle: "پرامپت نهایی", description: "پرامپت کامل برای ایجنت کدنویس — فقط کپی کنید" }
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
    threeDObjects: [],
    threeDPlacement: "",
    needsMascot: false,
    mascotStyle: "abstract",
    pageStyleConsistency: "consistent",
    contentSections: ["Hero", "Features", "FAQ", "CTA"],
    supportingPages: [],
    notes: ""
  };
}

export function toggleArrayValue(items, value) {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
}
