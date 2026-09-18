# Brand Discovery Wizard

یک app استاتیک و ماژولار برای کشف هویت برند، جهت بصری، استک فنی، ساختار صفحات و تولید prompt نهایی برای coding agent.

## What It Does

- از datasetهای موجود repo برای `products`, `patterns`, `styles`, و `stack families` کاتالوگ تولید می‌کند
- به کاربر اجازه می‌دهد بین `landing page` و `full website` تصمیم بگیرد
- سوالات branching برای `loader`, `mascot`, `motion`, `3D`, و `page consistency` نمایش می‌دهد
- در لحظه `page strategy` و `master prompt` را می‌سازد

## Run

```bash
cd /workspace/apps/brand-discovery-wizard
npm run build:catalog
python3 -m http.server 4173
```

سپس:

- `http://localhost:4173/`

## Test

```bash
cd /workspace/apps/brand-discovery-wizard
npm test
```

## Files

- `index.html` shell اپ
- `styles.css` طراحی رابط
- `app.js` orchestration و event wiring
- `lib/brief-engine.js` منطق prompt و page strategy
- `lib/catalog-loader.js` helperهای مصرف کاتالوگ
- `lib/ui-state.js` state اولیه و stepها
- `lib/renderers.js` rendererهای UI
- `scripts/build-catalog.mjs` ساخت کاتالوگ از CSVهای موجود repo

## Current Scope

- MVP بدون backend و بدون API
- catalog فعلاً از dataهای فعلی repo تغذیه می‌شود
- تحلیل لوگو و تولید palette هوشمند هنوز به مرحله بعدی موکول شده است
