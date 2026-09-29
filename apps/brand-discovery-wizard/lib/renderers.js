import {
  loaderVisuals,
  mascotStyleVisuals,
  motionLevelVisuals,
  pickStyleVisual,
  productModeVisuals,
  renderLayoutVisual,
  renderLoaderVisual,
  renderMascotVisual,
  renderMotionVisual,
  renderSwatchVisual,
  renderThreeDVisual,
  sliderModeVisuals,
  styleVisuals,
  threeDVisuals
} from "./visual-library.js";

const QUESTION_LABELS = {
  "product-type": "نوع محصول",
  "product-mode": "حالت پروژه (لندینگ / سایت کامل)",
  "stack-family": "استک، زبان و کتابخانه",
  "style-direction": "جهت بصری و استایل",
  "page-goals": "هدف صفحات",
  "loader-type": "نوع لودر",
  "mascot-style": "سبک کاراکتر برند",
  "three-d-objects": "کدام آبجکت‌های سه‌بعدی",
  "three-d-placement": "سه‌بعدی کجای سایت",
  "page-style-consistency": "استایل صفحات داخلی",
  supportingPages: "صفحات پشتیبان",
  "hero-vs-slider": "هیرو یا اسلایدر",
  "landing-focus": "تمرکز لندینگ"
};

function renderQuestionTags(visibleQuestions) {
  return visibleQuestions
    .map((key) => `<span>${QUESTION_LABELS[key] ?? key}</span>`)
    .join("");
}

function renderOptionCard(options) {
  const {
    uid,
    title,
    whatItDoes,
    useWhen,
    doesNotDo,
    reference,
    visual,
    active = false,
    action = "toggle-array",
    field = "",
    value = ""
  } = options;

  return `
    <button
      type="button"
      class="option-card ${active ? "is-picked" : ""}"
      data-action="${action}"
      data-field="${field}"
      data-value="${value}"
    >
      ${visual}
      <span class="option-body">
        <span class="option-title">${title}</span>
        <span class="option-what">${whatItDoes}</span>
        <span class="option-when"><b>مناسب وقتی:</b> ${useWhen}</span>
        <span class="option-not"><b>نمی‌تواند:</b> ${doesNotDo}</span>
        <span class="option-ref"><b>ref</b> · ${reference}</span>
      </span>
    </button>
  `;
}

function renderVisualSelect(options) {
  const { uid, visual, items, value } = options;
  return `
    <div class="option-card static">
      ${visual}
      <span class="option-body">
        <label class="field" style="display:grid;gap:6px">
          <span>${options.label}</span>
          <select data-action="set-field" data-field="${options.field}">
            ${items.map(
              (item) => `
                <option value="${item.value}" ${item.value === value ? "selected" : ""}>
                  ${item.label}
                </option>
              `
            ).join("")}
          </select>
        </label>
        <span class="option-when"><b>مناسب وقتی:</b> ${options.useWhen}</span>
        <span class="option-not"><b>نمی‌تواند:</b> ${options.doesNotDo}</span>
        <span class="option-ref"><b>ref</b> · ${options.reference}</span>
      </span>
    </div>
  `;
}

function renderStepItem(step, index, activeStep) {
  const status = index === activeStep ? "active" : index < activeStep ? "done" : "";
  return `
    <button class="step-item ${status}" data-action="go-step" data-step-index="${index}" title="${step.description ?? step.label}">
      <span class="step-index">${String(index + 1).padStart(2, "0")}</span>
      <span class="step-label">${step.label}</span>
      <span class="step-sub">${step.subtitle ?? ""}</span>
    </button>
  `;
}

function renderChip(options) {
  const {
    label,
    value,
    active = false,
    action = "toggle-chip",
    group = "",
    kind = "neutral"
  } = options;

  return `
    <button
      type="button"
      class="chip ${active ? "is-active" : ""} ${kind}"
      data-action="${action}"
      data-group="${group}"
      data-value="${value}"
    >
      ${label}
    </button>
  `;
}

function renderSelect(options) {
  return `
    <label class="field">
      <span>${options.label}</span>
      <select data-action="set-field" data-field="${options.field}">
        ${options.items
          .map(
            (item) => `
              <option value="${item.value}" ${item.value === options.value ? "selected" : ""}>
                ${item.label}
              </option>
            `
          )
          .join("")}
      </select>
    </label>
  `;
}

function renderCheckboxCard(options) {
  const { label, value, checked, field, description = "" } = options;
  return `
    <label class="check-card ${checked ? "checked" : ""}">
      <input type="checkbox" data-action="toggle-array" data-field="${field}" value="${value}" ${checked ? "checked" : ""}>
      <span class="check-title">${label}</span>
      <span class="check-description">${description}</span>
    </label>
  `;
}

function renderProductStep(state, catalog) {
  const goalOptions = [
    {
      value: "lead-gen",
      label: "Lead Gen",
      description: "هدف: گرفتن اطلاعات تماس — فرم، CTA و نرخ تبدیل در پرانت اولویت پیدا می‌کنند."
    },
    {
      value: "demo",
      label: "Demo",
      description: "هدف: نشان دادن محصول — سکشن‌های اسکرین‌شات، ویدیو و قابلیت‌ها در پرانت برجسته می‌شوند."
    },
    {
      value: "trust",
      description: "هدف: اعتمادسازی — لوگو مشتری‌ها، نظر کاربران و نشان‌های امنیتی وارد پرانت می‌شوند.",
      label: "Trust"
    },
    {
      value: "education",
      label: "Education",
      description: "هدف: آموزش — سکشن‌های راهنما، FAQ و ساختار محتوا در پرانت اولویت می‌گیرند."
    }
  ];

  const productModeItems = [
    { value: "landing", label: "Landing Page" },
    { value: "full-site", label: "Full Website" }
  ];

  const modeVisual = state.productMode === "full-site"
    ? renderSwatchVisual(productModeVisuals["full-site"].swatch, "pm-full")
    : renderSwatchVisual(productModeVisuals.landing.swatch, "pm-landing");

  const modeMeta = productModeVisuals[state.productMode] ?? productModeVisuals.landing;

  const productItems = catalog.products.slice(0, 60).map((item) => ({
    value: item.name,
    label: item.name
  }));
  const productMeta = productItems.find((item) => item.value === state.productType) ?? productItems[0];
  const productVisual = renderSwatchVisual(
    ["#0e1116", "#141b24", "#1d2734", "#91f2c8"],
    "ptype"
  );

  return `
    <section class="step-screen">
      <div class="section-head">
        <p class="eyebrow">گام ۱</p>
        <h2>نوع محصول و دامنه سایت</h2>
        <p>اول مشخص کن داریم برای یک landing page هدفمند طراحی می‌کنیم یا یک full website چندصفحه‌ای. هر کدام مسیر سوالات بعدی را عوض می‌کند.</p>
      </div>
      <div class="control-grid">
        ${renderVisualSelect({
          uid: "product-mode",
          label: "حالت پروژه",
          field: "productMode",
          value: state.productMode,
          items: productModeItems,
          visual: modeVisual,
          useWhen: modeMeta.useWhen,
          doesNotDo: modeMeta.doesNotDo,
          reference: modeMeta.reference
        })}
        ${renderVisualSelect({
          uid: "product-type",
          label: "نوع محصول",
          field: "productType",
          value: productMeta.value,
          items: productItems,
          visual: productVisual,
          useWhen: "پرامپت بر اساس نوع محصول، پترن پیشنهادی لندینگ و استایل‌های مرتبط را تنظیم می‌کند.",
          doesNotDo: "نوع محصول به‌تنهایی کل طراحی را تعیین نمی‌کند؛ استایل گام بعدی هم با آن ترکیب می‌شود.",
          reference: "data/generated-catalog.js · ۱۶۱ محصول"
        })}
      </div>
      <div class="group-block">
        <div class="group-title">هدف‌های اصلی — این موارد چه تغییری در فایل نهایی ایجاد می‌کنند؟</div>
        <div class="card-grid">
          ${goalOptions
            .map((goal) =>
              renderCheckboxCard({
                ...goal,
                field: "goals",
                checked: state.goals.includes(goal.value)
              })
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderStackStep(state, stackCards) {
  const stackOptions = stackCards.map((stack) =>
    renderChip({
      label: `${stack.label} · ${stack.count}`,
      value: stack.id,
      group: "stackFamilies",
      active: state.stackFamilies.includes(stack.id)
    })
  );

  return `
    <section class="step-screen">
      <div class="section-head">
        <p class="eyebrow">گام ۲</p>
        <h2>استک، زبان و کتابخانه</h2>
        <p>این بخش برای تعیین familyهای فنی است که prompt نهایی باید بر اساس آن‌ها محدود و دقیق شود.</p>
      </div>
      <div class="chip-wall">${stackOptions.join("")}</div>
      <div class="note-card">
        <h3>نکته</h3>
        <p>در MVP، familyها از datasetهای موجود repo خوانده می‌شوند و بعداً می‌توان language/runtime/library matrix را گسترده‌تر کرد.</p>
      </div>
    </section>
  `;
}

function renderStyleStep(state, styleSuggestions) {
  return `
    <section class="step-screen">
      <div class="section-head">
        <p class="eyebrow">گام ۳</p>
        <h2>جهت بصری و رفرنس‌ها</h2>
        <p>به‌جای شروع سریع طراحی، اول یک نمونه‌ی واقعی از هر استایل را ببین و آن را انتخاب کن. هر کارت می‌گوید آن استایل چه اتفاقی می‌اندازد، کجا خوب جنسه و کجا بد. چند گزینه می‌توانی انتخاب کنی.</p>
      </div>
      <div class="option-list">
        ${styleSuggestions
          .map((style) => {
            const visual = pickStyleVisual(style.category);
            const fallback = {
              title: style.category,
              whatItDoes: `استایل ${style.type} با حال‌وهوای ${style.effects?.slice(0, 2).join(" و ") || "کلاسیک"}.`,
              useWhen: "موقعی که همین حس با برندت می‌خواند.",
              doesNotDo: "تنها در صورت تناقض با هویت برند آن را انتخاب نکن.",
              reference: "land-book.com · godly.website · awwwards.com",
              swatch: ["#161a21", "#91f2c8", "#ff8f5c"]
            };
            const meta = visual ?? fallback;

            return renderOptionCard({
              uid: `style-${style.category}`,
              title: meta.title,
              whatItDoes: meta.whatItDoes,
              useWhen: meta.useWhen,
              doesNotDo: meta.doesNotDo,
              reference: meta.reference,
              visual: renderSwatchVisual(meta.swatch, `style-${style.category}`.replace(/\s/g, "-")),
              active: state.styleChoices.includes(style.category),
              action: "toggle-array",
              field: "styleChoices",
              value: style.category
            });
          })
          .join("")}
      </div>
      <div class="option-hint">
        <b>چرا نمونه‌ی بصری؟</b> چون کلمه‌ی «مینیمال» برای هر آدمی یک معنی دارد اما تصویرش یک معنی. این کارت‌ها ذهن تو و ذهن ایجنت کدنویس را روی یک تصویر واحد قفل می‌کنند و خطر سوءتفاهم را کم می‌کنند. اگر هیچ‌کدام مطابق سلیقه‌ات نبود، در یادداشت‌های تکمیلی (گام ۶) یک رفرنس واقعی پیست کن.
      </div>
    </section>
  `;
}

function renderBrandStep(state) {
  const toneOptions = [
    { value: "precise", label: "precise — دقیق", description: "جملات کوتاه، عدد و مستند. برای ابزارهای فنی." },
    { value: "technical", label: "technical — فنی", description: "واژگان تخصصی و توضیح مکانیزم‌ها." },
    { value: "confident", label: "confident — مطمئن", description: "جملات قاطع و بدون تردید." },
    { value: "playful", label: "playful — شوخ", description: "طنز، لحن دوستانه و غیررسمی." },
    { value: "luxury", label: "luxury — لوکس", description: "کلمات نجیب، فاصله و پرستیژ." },
    { value: "warm", label: "warm — گرم", description: "انسانی، همدل و نزدیک." },
    { value: "bold", label: "bold — جسور", description: "شعارها و ادعاهای بزرگ." },
    { value: "minimal", label: "minimal — مینیمال", description: "کمترین کلمات، بیشتر فضا." }
  ];

  const mascotMeta = mascotStyleVisuals[state.mascotStyle] ?? mascotStyleVisuals.abstract;

  return `
    <section class="step-screen">
      <div class="section-head">
        <p class="eyebrow">گام ۴</p>
        <h2>هویت برند</h2>
        <p>نام برند، لحن و نیاز به کاراکتر باید قبل از طراحی تثبیت شوند تا خروجی نهایی فقط زیبا نباشد، بلکه برندمحور باشد.</p>
      </div>
      <label class="field">
        <span>نام برند</span>
        <input type="text" value="${state.brandName}" data-action="set-field" data-field="brandName" placeholder="مثلاً NovaOps">
      </label>
      <div class="group-block">
        <div class="group-title">لحن برند — سایت با چه صدایی حرف می‌زند</div>
        <div class="card-grid">
          ${toneOptions
            .map((tone) =>
              renderCheckboxCard({
                ...tone,
                field: "brandTone",
                checked: state.brandTone.includes(tone.value)
              })
            )
            .join("")}
        </div>
      </div>
      <div class="group-block">
        <div class="group-title">آیا برند یک کاراکتر (mascot) لازم دارد؟</div>
        <div class="inline-split">
          ${renderChip({
            label: "کاراکتر برند لازم است",
            value: "true",
            action: "set-boolean",
            group: "needsMascot",
            active: state.needsMascot,
            kind: "accent"
          })}
          ${renderChip({
            label: "بدون کاراکتر",
            value: "false",
            action: "set-boolean",
            group: "needsMascot",
            active: !state.needsMascot
          })}
        </div>
        <div class="option-hint">
          <b>کاراکتر یعنی چه؟</b> یک موجود برند که در hero، states خالی و illustrations ظاهر می‌شود و برند را به یاد ماندنی می‌کند (مثل ربات Notion یا پرنده‌ی Duolingo). اگر برند جدی/اینترپرایز است، معمولاً لازم نیست.
        </div>
        ${
          state.needsMascot
            ? renderVisualSelect({
                uid: "mascot-style",
                label: "سبک کاراکتر",
                field: "mascotStyle",
                value: state.mascotStyle,
                items: [
                  { value: "abstract", label: "Abstract — مجرد" },
                  { value: "robotic", label: "Robotic — ربات" },
                  { value: "organic", label: "Organic — ارگانیک" },
                  { value: "playful", label: "Playful — شوخ" }
                ],
                visual: renderMascotVisual(mascotMeta.face, "mascot-style"),
                useWhen: mascotMeta.useWhen,
                doesNotDo: mascotMeta.doesNotDo,
                reference: mascotMeta.reference
              })
            : ""
        }
      </div>
    </section>
  `;
}

function renderMotionStep(state, visibleQuestions) {
  const motionMeta = motionLevelVisuals[state.motionLevel] ?? motionLevelVisuals.medium;
  const threeDMeta = threeDVisuals[state.threeDLevel] ?? threeDVisuals.none;
  const loaderMeta = loaderVisuals[state.loaderType] ?? loaderVisuals["overlay-reveal"];
  const sliderMeta = sliderModeVisuals[state.sliderMode] ?? sliderModeVisuals.hero;

  return `
    <section class="step-screen">
      <div class="section-head">
        <p class="eyebrow">گام ۵</p>
        <h2>موشن، لودر، اسلایدر و 3D</h2>
        <p>اینجا تعیین می‌شود سایت چقدر زنده باشد. هر کارت را با تصویرش ببین: نشان می‌دهد آن گزینه دقیقاً روی صفحه چه ظاهری دارد و چه می‌کند.</p>
      </div>
      <div class="option-list">
        ${renderVisualSelect({
          uid: "motion-level",
          label: "Motion Level — میزان زنده بودن سایت",
          field: "motionLevel",
          value: state.motionLevel,
          items: [
            { value: "low", label: "Low — فقط ظریف" },
            { value: "medium", label: "Medium — حرفه‌ای" },
            { value: "high", label: "High — روایی و پرتحرک" }
          ],
          visual: renderMotionVisual(motionMeta.gradient, motionMeta.motion, "motion-level"),
          useWhen: motionMeta.useWhen,
          doesNotDo: motionMeta.doesNotDo,
          reference: motionMeta.reference
        })}
        ${renderVisualSelect({
          uid: "three-d-level",
          label: "سطح 3D — چقدر از سایت سه‌بعدی باشد",
          field: "threeDLevel",
          value: state.threeDLevel,
          items: [
            { value: "none", label: "هیچ 3D نداریم" },
            { value: "low", label: "فقط یک عنصر کوچک 3D" },
            { value: "medium", label: "چند بخش 3D" },
            { value: "high", label: "کل قالب همه‌جانبه 3D" }
          ],
          visual: renderThreeDVisual(threeDMeta.shape, "three-d-level"),
          useWhen: threeDMeta.useWhen,
          doesNotDo: threeDMeta.doesNotDo,
          reference: threeDMeta.reference
        })}
      </div>
      <div class="group-block">
        <div class="group-title">اسکرول و لودر</div>
        <div class="chip-wall">
          ${renderChip({
            label: "Smooth Scroll فعال",
            value: "true",
            action: "set-boolean",
            group: "smoothScroll",
            active: state.smoothScroll,
            kind: "accent"
          })}
          ${renderChip({
            label: "Smooth Scroll غیرفعال",
            value: "false",
            action: "set-boolean",
            group: "smoothScroll",
            active: !state.smoothScroll
          })}
        </div>
        <div class="option-hint">
          <b>Smooth Scroll یعنی چه؟</b> زمانی که کاربر پیمایش می‌کند، حرکت نرم و کند می‌شود (مثل Lenis) و بخش‌ها مثل یک تایم‌لاین می‌لغزند. روی موبایل گاهی حالت طبیعی پیمایش را خراب می‌کند.
        </div>
      </div>
      <div class="group-block">
        <div class="group-title">نوع لودر</div>
        <div class="chip-wall">
          ${renderChip({
            label: "سایت لودر می‌خواهد",
            value: "true",
            action: "set-boolean",
            group: "wantsLoader",
            active: state.wantsLoader,
            kind: "accent"
          })}
          ${renderChip({
            label: "بدون لودر",
            value: "false",
            action: "set-boolean",
            group: "wantsLoader",
            active: !state.wantsLoader
          })}
        </div>
        ${
          state.wantsLoader
            ? renderVisualSelect({
                uid: "loader-type",
                label: "نوع لودر — کاربر اولین بار چه می‌بیند",
                field: "loaderType",
                value: state.loaderType,
                items: [
                  { value: "overlay-reveal", label: "Overlay Reveal — لایه روی صفحه" },
                  { value: "skeleton", label: "Skeleton — ساختار خاکستری" },
                  { value: "hard-gate", label: "Show after ready — بعد از آماده‌شدن" }
                ],
                visual: renderLoaderVisual(loaderMeta.pattern, "loader-type"),
                useWhen: loaderMeta.useWhen,
                doesNotDo: loaderMeta.doesNotDo,
                reference: loaderMeta.reference
              })
            : ""
        }
      </div>
      <div class="group-block">
        <div class="group-title">هیرو یا اسلایدر</div>
        <div class="option-list">
          ${renderOptionCard({
            uid: "slider-hero",
            title: sliderModeVisuals.hero.title,
            whatItDoes: sliderModeVisuals.hero.whatItDoes,
            useWhen: sliderModeVisuals.hero.useWhen,
            doesNotDo: sliderModeVisuals.hero.doesNotDo,
            reference: sliderModeVisuals.hero.reference,
            visual: renderLayoutVisual("hero", "slider-hero"),
            active: state.sliderMode === "hero",
            action: "set-field-value",
            field: "sliderMode",
            value: "hero"
          })}
          ${renderOptionCard({
            uid: "slider-slider",
            title: sliderModeVisuals.slider.title,
            whatItDoes: sliderModeVisuals.slider.whatItDoes,
            useWhen: sliderModeVisuals.slider.useWhen,
            doesNotDo: sliderModeVisuals.slider.doesNotDo,
            reference: sliderModeVisuals.slider.reference,
            visual: renderLayoutVisual("slider", "slider-slider"),
            active: state.sliderMode === "slider",
            action: "set-field-value",
            field: "sliderMode",
            value: "slider"
          })}
        </div>
      </div>
      ${
        state.threeDLevel && state.threeDLevel !== "none"
          ? `
            <div class="group-block">
              <div class="group-title">آبجکت‌های سه‌بعدی</div>
              <div class="chip-wall">
                ${["استخر", "کیهان", "پارامید", "کره", "لوزی", "ستاره", "تمرین"].map((obj) =>
                  renderChip({
                    label: obj,
                    value: obj,
                    group: "threeDObjects",
                    action: "toggle-array",
                    active: state.threeDObjects.includes(obj),
                    kind: "neutral"
                  })
                ).join("")}
              </div>
              <div class="option-hint">
                <b>این آبجکت‌ها چه کار می‌کنند؟</b> در لندینگ یا فول‌سایت، یک یا چند آبجکت 3D انتخاب کنید. فقط در صورتی که بودجه‌ی رندر داشته باشید استفاده کنید؛ ترجیحاً توی hero یا یک بخش features تعبیه شوند.
              </div>
            </div>
            <div class="group-block">
              <div class="group-title">جایگذاری سه‌بعدی</div>
              ${renderVisualSelect({
                uid: "three-d-placement",
                label: "3D کجای سایت قرار بگیرد",
                field: "threeDPlacement",
                value: state.threeDPlacement || "hero",
                items: [
                  { value: "hero", label: "فقط در بخش Hero" },
                  { value: "features", label: "در بخش Features/کارت‌ها" },
                  { value: "full", label: "همه‌ی صفحه — فول 3D" }
                ],
                visual: renderThreeDVisual(threeDMeta.shape, "three-d-placement"),
                useWhen: "استفاده از 3D برای جلب توجه در نقطه‌ی بصری کلیدی.",
                doesNotDo: "تمام صفحه را 3D نکن — باعث کاهش سرعت و گیج‌کنندگی می‌شود.",
                reference: "threejs.org · drei examples"
              })}
            </div>
          `
          : ""
      }
      <div class="group-block">
        <div class="group-title">سوالاتی که سیستم تا الان فعال کرده</div>
        <div class="question-tags">${renderQuestionTags(visibleQuestions)}</div>
        <div class="option-hint">
          <b>این لیست چیست؟</b> این برچسب‌ها نشان می‌دهند بر اساس جواب‌هایت کدام سوالات لازم شده‌اند. مثلاً چون 3D را انتخاب کردی، سوال «کدام آبجکت‌های سه‌بعدی» و «سه‌بعدی کجای سایت» در پرامپت نهایی لحاظ می‌شوند.
        </div>
      </div>
    </section>
  `;
}

function renderContentStep(state, pageStrategy) {
  const contentOptions = [
    { value: "Hero", description: "بخش اول: جمله‌ی اصلی ارزش + دکمه‌ی CTA." },
    { value: "Features", description: "لیست قابلیت‌ها، معمولاً گرید کارت‌ها." },
    { value: "Use Cases", description: "برای چه کسانی و چه مشکلی حل می‌شود." },
    { value: "Pricing", description: "جدول قیمت‌گذاری و مقایسه پلن‌ها." },
    { value: "FAQ", description: "پرسش‌های متداول برای رفع تردید خرید." },
    { value: "Testimonials", description: "نظر مشتری‌ها و case study کوتاه." },
    { value: "CTA", description: "فراخوان نهایی برای ثبت‌نام یا خرید." },
    { value: "Footer", description: "لینک‌ها، شبکه‌های اجتماعی و کپی‌رایت." }
  ];

  const consistencyOptions = [
    {
      value: "consistent",
      label: "مشابه سایت اصلی",
      description: "همه‌ی صفحات از همان گرید، رنگ و فونت خانه‌ی اصلی پیروی می‌کنند. حس یکپارچه و امن."
    },
    {
      value: "adaptive",
      label: "سازگار ولی متفاوت",
      description: "اسکلت اصلی یکی است ولی هر صفحه有小 تغییرات (رنگ بخش، چیدمان) دارد."
    },
    {
      value: "distinct",
      label: "هر page شخصیت جدا",
      description: "هر صفحه مثل یک مینی‌سایت با حال‌وهوای خودش. پرانرژی اما خطر آشفتگی."
    }
  ];

  return `
    <section class="step-screen">
      <div class="section-head">
        <p class="eyebrow">گام ۶</p>
        <h2>صفحات، ساختار و محتوای نهایی</h2>
        <p>بر اساس mode پروژه، سیستم هم صفحه‌ها را پیشنهاد دهد، هم سکشن‌ها و هم consistency style بین صفحات را بپرسد.</p>
      </div>
      <div class="note-card">
        <h3>پیشنهاد فعلی سیستم</h3>
        <p>${pageStrategy.siteType === "landing" ? "Landing Page" : "Full Website"} · صفحات: ${pageStrategy.pages.join(" / ")} · سکشن‌ها: ${pageStrategy.sections.join(" / ")}</p>
      </div>
      <div class="group-block">
        <div class="group-title">سکشن‌هایی که در خروجی لحاظ شوند</div>
        <div class="card-grid">
          ${contentOptions
            .map((section) =>
              renderCheckboxCard({
                field: "contentSections",
                value: section.value,
                label: section.value,
                description: section.description,
                checked: state.contentSections.includes(section.value)
              })
            )
            .join("")}
        </div>
      </div>
      ${
        state.productMode === "full-site"
          ? `
            <div class="group-block">
              <div class="group-title">استایل صفحات داخلی — صفحات فرعی مثل صفحه اصلی باشند یا متفاوت</div>
              <div class="card-grid">
                ${consistencyOptions
                  .map((option) =>
                    renderCheckboxCard({
                      field: "pageStyleConsistency",
                      value: option.value,
                      label: option.label,
                      description: option.description,
                      checked: state.pageStyleConsistency === option.value
                    })
                  )
                  .join("")}
              </div>
              <div class="option-hint">
                <b>توجه:</b> این بخش فقط یکی از گزینه‌ها را می‌پذیرد. اگر گزینه‌ی دیگری انتخاب کنی، گزینه‌ی قبلی خودکار جایگزین می‌شود.
              </div>
            </div>
            <div class="group-block">
              <div class="group-title">صفحات پشتیبان اضافی — صفحات دیگری که می‌خواهید اضافه کنید؟</div>
              <div class="chip-wall">
                ${["About", "Blog", "Help Center", "Status", "Privacy Policy", "Terms", "Jobs", "API Docs"].map((page) =>
                  renderChip({
                    label: page,
                    value: page,
                    group: "supportingPages",
                    action: "toggle-array",
                    active: state.supportingPages.includes(page),
                    kind: "neutral"
                  })
                ).join("")}
              </div>
              <div class="option-hint">
                <b>این صفحات چه کمکی می‌کنند؟</b> در پرامپت نهایی، اینها به عنوان صفحات پیشنهادی اضافه می‌شوند و routing و منوی ناوبری سایت را تعریف می‌کنند.
              </div>
            </div>
          `
          : ""
      }
      <label class="field">
        <span>یادداشت‌های تکمیلی</span>
        <textarea rows="5" data-action="set-field" data-field="notes" placeholder="محدودیت‌ها، محتوای خاص، API یا چیزهایی که باید در prompt نهایی بیاید.">${state.notes}</textarea>
      </label>
    </section>
  `;
}

function renderOutputStep(derived) {
  return `
    <section class="step-screen">
      <div class="section-head">
        <p class="eyebrow">گام ۷</p>
        <h2>خروجی نهایی برای coding agent</h2>
        <p>این خروجی باید مستقیماً قابل تحویل به ایجنت کدنویس باشد و همه تصمیم‌ها را در خود داشته باشد.</p>
      </div>
      <div class="prompt-panel">
        <textarea id="prompt-output" readonly>${derived.prompt}</textarea>
      </div>
      <button class="primary-btn" data-action="copy-prompt">کپی پرامپت</button>
    </section>
  `;
}

export function renderStepNav(root, steps, activeStep) {
  root.innerHTML = `
    <div class="step-panel">
      <div class="panel-title">نقشه مراحل</div>
      <div class="step-list">${steps.map((step, index) => renderStepItem(step, index, activeStep)).join("")}</div>
    </div>
  `;
}

export function renderWizardPanel(root, params) {
  const { state, catalog, stackCards, styleSuggestions, visibleQuestions, pageStrategy } = params;
  const stepId = params.steps[state.activeStep]?.id;

  const htmlByStep = {
    product: renderProductStep(state, catalog),
    stack: renderStackStep(state, stackCards),
    style: renderStyleStep(state, styleSuggestions),
    brand: renderBrandStep(state),
    motion: renderMotionStep(state, visibleQuestions),
    content: renderContentStep(state, pageStrategy),
    output: renderOutputStep(params.derived)
  };

  root.innerHTML = `
    ${htmlByStep[stepId]}
    <div class="wizard-nav">
      <button class="ghost-btn" data-action="prev-step" ${state.activeStep === 0 ? "disabled" : ""}>مرحله قبل</button>
      <button class="primary-btn" data-action="next-step" ${state.activeStep === params.steps.length - 1 ? "disabled" : ""}>مرحله بعد</button>
    </div>
  `;
}

export function renderLivePreview(root, params) {
  const { state, product, pattern, stackCards, styleSuggestions, pageStrategy, derived, visibleQuestions } = params;

  root.innerHTML = `
    <div class="preview-stack">
      <section class="preview-card hero-card">
        <p class="eyebrow">Live Brief</p>
        <h2>${state.brandName}</h2>
        <p>${product?.name ?? "بدون انتخاب"} · ${pageStrategy.siteType}</p>
      </section>
      <section class="preview-card">
        <h3>پیشنهاد ساختار</h3>
        <ul>
          <li>Pattern: ${pattern?.name ?? product?.landingPattern ?? "Default"}</li>
          <li>Pages: ${pageStrategy.pages.join(" / ")}</li>
          <li>Sections: ${pageStrategy.sections.join(" / ")}</li>
        </ul>
      </section>
      <section class="preview-card">
        <h3>Stack Families</h3>
        <div class="mini-chips">${stackCards.map((stack) => `<span>${stack.label}</span>`).join("")}</div>
      </section>
      <section class="preview-card">
        <h3>Style Directions</h3>
        <div class="mini-chips">${(state.styleChoices.length ? state.styleChoices : styleSuggestions.map((item) => item.category).slice(0, 3)).map((style) => `<span>${style}</span>`).join("")}</div>
      </section>
      <section class="preview-card">
        <h3>Branching Questions</h3>
        <div class="mini-chips">${renderQuestionTags(visibleQuestions)}</div>
      </section>
      <section class="preview-card compact">
        <h3>Prompt Snapshot</h3>
        <pre>${derived.prompt}</pre>
      </section>
    </div>
  `;
}
