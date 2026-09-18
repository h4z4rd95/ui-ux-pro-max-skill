# Brand Discovery Wizard Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ساخت یک پلتفرم مستقل داخل repo که قبل از طراحی، نوع محصول، استک فنی، سلیقه بصری، هویت برند، ساختار صفحات، موشن، 3D، محتوا و محدودیت‌های اجرا را از کاربر بگیرد و در انتها یک brief ساخت‌یافته و prompt نهایی برای coding agent تولید کند.

**Architecture:** یک app استاتیک و ماژولار در `apps/brand-discovery-wizard/` ساخته می‌شود تا بدون build step سنگین قابل توسعه و preview باشد. داده‌های موجود repo از `src/ui-ux-pro-max/data/` با یک اسکریپت Node به کاتالوگ مصرفی app تبدیل می‌شوند؛ منطق branching، page strategy و prompt assembly در ماژول‌های pure JavaScript قرار می‌گیرد و با تست‌های `node:test` پوشش داده می‌شود.

**Tech Stack:** HTML, CSS, Vanilla JavaScript Modules, Node.js built-in test runner, Node scripts, existing CSV data in repo

---

## File Map

### New Application
- Create: `apps/brand-discovery-wizard/index.html`
- Create: `apps/brand-discovery-wizard/styles.css`
- Create: `apps/brand-discovery-wizard/app.js`
- Create: `apps/brand-discovery-wizard/lib/catalog-loader.js`
- Create: `apps/brand-discovery-wizard/lib/brief-engine.js`
- Create: `apps/brand-discovery-wizard/lib/ui-state.js`
- Create: `apps/brand-discovery-wizard/lib/renderers.js`
- Create: `apps/brand-discovery-wizard/data/generated-catalog.js`

### Tooling
- Create: `apps/brand-discovery-wizard/scripts/build-catalog.mjs`
- Create: `apps/brand-discovery-wizard/package.json`

### Tests
- Create: `apps/brand-discovery-wizard/tests/brief-engine.test.mjs`
- Create: `apps/brand-discovery-wizard/tests/catalog-build.test.mjs`

### Docs
- Create: `apps/brand-discovery-wizard/README.md`
- Modify: `README.md`

---

### Task 1: Scaffold App Shell

**Files:**
- Create: `apps/brand-discovery-wizard/index.html`
- Create: `apps/brand-discovery-wizard/styles.css`
- Create: `apps/brand-discovery-wizard/app.js`
- Create: `apps/brand-discovery-wizard/package.json`

- [ ] **Step 1: ساخت اسکلت فایل‌ها و package محلی**

حداقل ساختار:

```json
{
  "name": "brand-discovery-wizard",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test tests/*.test.mjs",
    "build:catalog": "node scripts/build-catalog.mjs"
  }
}
```

- [ ] **Step 2: ساخت صفحه اولیه با layout ماژولار**

اسکلت `index.html`:

```html
<main class="app-shell">
  <aside id="step-nav"></aside>
  <section id="wizard-panel"></section>
  <aside id="live-preview"></aside>
</main>
```

- [ ] **Step 3: ساخت state اولیه در `app.js`**

state پایه:

```js
const wizardState = {
  productMode: "landing",
  productType: "",
  stackFamilies: [],
  stackChoices: [],
  styleChoices: [],
  motionLevel: "medium",
  threeDLevel: "none",
  pages: [],
  contentSections: [],
  prompt: ""
};
```

- [ ] **Step 4: اجرای smoke test دستی**

Run:

```bash
python3 -m http.server 4173
```

Expected:
- فایل app بدون error باز شود
- layout سه‌ستونه پایه رندر شود

- [ ] **Step 5: Commit**

```bash
git add apps/brand-discovery-wizard
git commit -m "feat: scaffold brand discovery wizard shell"
```

### Task 2: Build Catalog Pipeline From Existing Repo Data

**Files:**
- Create: `apps/brand-discovery-wizard/scripts/build-catalog.mjs`
- Create: `apps/brand-discovery-wizard/data/generated-catalog.js`
- Test: `apps/brand-discovery-wizard/tests/catalog-build.test.mjs`

- [ ] **Step 1: نوشتن تست شکست‌خورده برای ساخت کاتالوگ**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { buildCatalog } from "../scripts/build-catalog.mjs";

test("buildCatalog returns stacks, products, patterns, and styles", () => {
  const catalog = buildCatalog();
  assert.ok(catalog.stacks.length > 0);
  assert.ok(catalog.products.length > 0);
  assert.ok(catalog.patterns.length > 0);
  assert.ok(catalog.styles.length > 0);
});
```

- [ ] **Step 2: اجرای تست و دیدن fail**

Run:

```bash
cd /workspace/apps/brand-discovery-wizard && npm test
```

Expected:
- FAIL چون `buildCatalog` هنوز وجود ندارد

- [ ] **Step 3: پیاده‌سازی حداقلی parser و builder**

حداقل خروجی:

```js
export function buildCatalog() {
  return {
    stacks: [],
    products: [],
    patterns: [],
    styles: []
  };
}
```

سپس parser واقعی برای CSVهای زیر:
- `/workspace/src/ui-ux-pro-max/data/products.csv`
- `/workspace/src/ui-ux-pro-max/data/landing.csv`
- `/workspace/src/ui-ux-pro-max/data/styles.csv`
- `/workspace/src/ui-ux-pro-max/data/stacks/*.csv`

- [ ] **Step 4: تولید فایل `generated-catalog.js`**

خروجی export:

```js
export const generatedCatalog = { ... };
```

- [ ] **Step 5: اجرای تست‌ها**

Run:

```bash
cd /workspace/apps/brand-discovery-wizard && npm test
```

Expected:
- PASS

- [ ] **Step 6: Commit**

```bash
git add apps/brand-discovery-wizard/scripts apps/brand-discovery-wizard/data apps/brand-discovery-wizard/tests
git commit -m "feat: generate wizard catalog from repo datasets"
```

### Task 3: Implement Core Brief Engine

**Files:**
- Create: `apps/brand-discovery-wizard/lib/brief-engine.js`
- Test: `apps/brand-discovery-wizard/tests/brief-engine.test.mjs`

- [ ] **Step 1: نوشتن تست برای page strategy**

```js
test("selects landing page sections for marketing-first product", () => {
  const result = decidePageStrategy({
    productMode: "landing",
    productType: "AI/Chatbot Platform",
    goals: ["lead-gen", "demo"],
    motionLevel: "high"
  });

  assert.equal(result.siteType, "landing");
  assert.ok(result.pages.includes("Home"));
  assert.ok(result.sections.includes("Hero"));
  assert.ok(result.sections.includes("Interactive Demo"));
});
```

- [ ] **Step 2: نوشتن تست برای full-site strategy**

```js
test("selects full site pages for documentation-heavy platform", () => {
  const result = decidePageStrategy({
    productMode: "full-site",
    productType: "Knowledge Base/Documentation",
    goals: ["education", "support"]
  });

  assert.equal(result.siteType, "full-site");
  assert.ok(result.pages.includes("Docs"));
  assert.ok(result.pages.includes("Pricing") || result.pages.includes("Contact"));
});
```

- [ ] **Step 3: نوشتن تست برای prompt assembly**

```js
test("generateMasterPrompt includes brand, stack, pages, motion, and content rules", () => {
  const prompt = generateMasterPrompt({
    brand: { name: "NovaOps", tone: ["precise", "technical"] },
    stackChoices: ["Next.js", "shadcn/ui"],
    pageStrategy: { siteType: "landing", pages: ["Home"], sections: ["Hero", "Features", "FAQ"] },
    motionLevel: "medium",
    threeDLevel: "low"
  });

  assert.match(prompt, /NovaOps/);
  assert.match(prompt, /Next\.js/);
  assert.match(prompt, /shadcn\/ui/);
  assert.match(prompt, /Hero/);
  assert.match(prompt, /FAQ/);
});
```

- [ ] **Step 4: اجرای تست و دیدن fail**

Run:

```bash
cd /workspace/apps/brand-discovery-wizard && npm test
```

Expected:
- FAIL روی import/function not found

- [ ] **Step 5: پیاده‌سازی حداقلی `decidePageStrategy` و `generateMasterPrompt`**

توابع پایه:

```js
export function decidePageStrategy(input) {
  return {
    siteType: input.productMode,
    pages: [],
    sections: []
  };
}

export function generateMasterPrompt(input) {
  return "";
}
```

سپس توسعه تا تست‌ها pass شوند.

- [ ] **Step 6: اجرای تست‌ها**

Run:

```bash
cd /workspace/apps/brand-discovery-wizard && npm test
```

Expected:
- PASS

- [ ] **Step 7: Commit**

```bash
git add apps/brand-discovery-wizard/lib apps/brand-discovery-wizard/tests
git commit -m "feat: add prompt and page strategy engine"
```

### Task 4: Implement Branching Question System

**Files:**
- Create: `apps/brand-discovery-wizard/lib/ui-state.js`
- Modify: `apps/brand-discovery-wizard/app.js`
- Test: `apps/brand-discovery-wizard/tests/brief-engine.test.mjs`

- [ ] **Step 1: نوشتن تست برای branching**

```js
test("3d follow-up questions appear only when 3d is enabled", () => {
  const questions = getVisibleQuestions({
    threeDLevel: "high",
    productMode: "landing",
    needsMascot: true
  });

  assert.ok(questions.includes("three-d-objects"));
  assert.ok(questions.includes("three-d-placement"));
});
```

- [ ] **Step 2: نوشتن تست برای hiding غیرمرتبط**

```js
test("3d follow-up questions stay hidden when 3d is disabled", () => {
  const questions = getVisibleQuestions({
    threeDLevel: "none",
    productMode: "landing",
    needsMascot: false
  });

  assert.ok(!questions.includes("three-d-objects"));
});
```

- [ ] **Step 3: اجرای تست و دیدن fail**
- [ ] **Step 4: پیاده‌سازی `getVisibleQuestions`**
- [ ] **Step 5: اتصال renderer فرم به state**
- [ ] **Step 6: اجرای تست‌ها**
- [ ] **Step 7: Commit**

### Task 5: Build High-Fidelity Wizard UI

**Files:**
- Modify: `apps/brand-discovery-wizard/index.html`
- Modify: `apps/brand-discovery-wizard/styles.css`
- Modify: `apps/brand-discovery-wizard/app.js`
- Create: `apps/brand-discovery-wizard/lib/renderers.js`

- [ ] **Step 1: ساخت step navigator**
- [ ] **Step 2: ساخت cards برای product/stack/style selection**
- [ ] **Step 3: ساخت visual preference gallery**
- [ ] **Step 4: ساخت preview panel برای brief زنده**
- [ ] **Step 5: ساخت prompt panel با copy/export**
- [ ] **Step 6: تست دستی ریسپانسیو**

Run:

```bash
python3 -m http.server 4173
```

Expected:
- desktop و mobile layout درست
- انتخاب‌ها live preview را به‌روزرسانی کنند

- [ ] **Step 7: Commit**

```bash
git add apps/brand-discovery-wizard
git commit -m "feat: build multi-step wizard interface"
```

### Task 6: Add Content Planning and Page Recommendations

**Files:**
- Modify: `apps/brand-discovery-wizard/lib/brief-engine.js`
- Modify: `apps/brand-discovery-wizard/app.js`
- Test: `apps/brand-discovery-wizard/tests/brief-engine.test.mjs`

- [ ] **Step 1: افزودن منطق landing-specific content**
- [ ] **Step 2: افزودن منطق full-site page families**
- [ ] **Step 3: افزودن سوال style consistency بین صفحات**
- [ ] **Step 4: افزودن content structure برای final prompt**
- [ ] **Step 5: اجرای تست‌ها**
- [ ] **Step 6: Commit**

### Task 7: Documentation and Integration

**Files:**
- Create: `apps/brand-discovery-wizard/README.md`
- Modify: `README.md`

- [ ] **Step 1: مستندسازی هدف app**
- [ ] **Step 2: مستندسازی نحوه regenerate catalog**
- [ ] **Step 3: مستندسازی اجرای تست و preview**
- [ ] **Step 4: لینک دادن از README اصلی**
- [ ] **Step 5: Commit**

### Task 8: QA and Handoff

**Files:**
- Review all files above

- [ ] **Step 1: اجرای تست‌ها**

```bash
cd /workspace/apps/brand-discovery-wizard && npm test
```

- [ ] **Step 2: اجرای regenerate catalog**

```bash
cd /workspace/apps/brand-discovery-wizard && npm run build:catalog
```

- [ ] **Step 3: اجرای preview دستی**

```bash
cd /workspace/apps/brand-discovery-wizard && python3 -m http.server 4173
```

- [ ] **Step 4: بازبینی خروجی prompt و branching**
- [ ] **Step 5: ثبت ریسک‌های باز**

ریسک‌های اولیه:
- تحلیل لوگو و استخراج palette فعلاً rule-based است و vision-based نیست
- gallery تصاویر reference در MVP به‌جای asset-heavy preview از metadata و UI cards استفاده می‌کند
- اگر نیاز به export JSON / Markdown / prompt templates چندگانه باشد، Task جداگانه لازم است

---

## Coverage Check

- کشف سلیقه از روی referenceها: پوشش داده شده در Task 5
- انتخاب بین landing و full-site: پوشش داده شده در Task 3 و Task 6
- پیشنهاد صفحات و ساختار سکشن‌ها: پوشش داده شده در Task 6
- انتخاب تکنولوژی/stack/library: پوشش داده شده در Task 2 و Task 5
- branching برای motion/3D/mascot/loading: پوشش داده شده در Task 4
- تولید prompt نهایی برای agent: پوشش داده شده در Task 3 و Task 6

## Placeholder Scan

- هیچ `TODO` یا `TBD` اجرایی در تسک‌ها باقی نمانده؛ تنها ریسک‌های post-MVP جداگانه ثبت شده‌اند.

## Type Consistency

- `decidePageStrategy`
- `generateMasterPrompt`
- `getVisibleQuestions`
- `generatedCatalog`

این نام‌ها در کل plan یکسان نگه داشته شده‌اند.

---

Plan complete and saved to `docs/superpowers/plans/2026-09-18-brand-discovery-wizard-platform.md`.

Execution mode already chosen by user: **Subagent-Driven**.
