function renderStepItem(step, index, activeStep) {
  const status = index === activeStep ? "active" : index < activeStep ? "done" : "";
  return `
    <button class="step-item ${status}" data-action="go-step" data-step-index="${index}">
      <span class="step-index">${String(index + 1).padStart(2, "0")}</span>
      <span class="step-label">${step.label}</span>
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
    { value: "lead-gen", label: "Lead Gen", description: "فرم، CTA و conversion مهم است." },
    { value: "demo", label: "Demo", description: "نمایش قابلیت و proof مهم است." },
    { value: "trust", label: "Trust", description: "اعتمادسازی و social proof مهم است." },
    { value: "education", label: "Education", description: "آموزش و ساختار محتوا مهم است." }
  ];

  return `
    <section class="step-screen">
      <div class="section-head">
        <p class="eyebrow">گام ۱</p>
        <h2>نوع محصول و دامنه سایت</h2>
        <p>اول مشخص کن داریم برای یک landing page هدفمند طراحی می‌کنیم یا یک full website چندصفحه‌ای.</p>
      </div>
      <div class="control-grid">
        ${renderSelect({
          label: "حالت پروژه",
          field: "productMode",
          value: state.productMode,
          items: [
            { value: "landing", label: "Landing Page" },
            { value: "full-site", label: "Full Website" }
          ]
        })}
        ${renderSelect({
          label: "نوع محصول",
          field: "productType",
          value: state.productType,
          items: catalog.products.slice(0, 60).map((item) => ({
            value: item.name,
            label: item.name
          }))
        })}
      </div>
      <div class="group-block">
        <div class="group-title">هدف‌های اصلی</div>
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
        <p>به‌جای شروع سریع طراحی، اول preference cardها را انتخاب کن تا موتور brief از روی آن‌ها سلیقه کاربر را بفهمد.</p>
      </div>
      <div class="style-grid">
        ${styleSuggestions
          .map(
            (style) => `
              <button
                type="button"
                class="style-card ${state.styleChoices.includes(style.category) ? "is-picked" : ""}"
                data-action="toggle-array"
                data-field="styleChoices"
                data-value="${style.category}"
              >
                <span class="style-meta">${style.type}</span>
                <strong>${style.category}</strong>
                <span>${style.effects.slice(0, 2).join(" · ") || "بدون افکت شاخص"}</span>
              </button>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderBrandStep(state) {
  const toneOptions = ["precise", "technical", "confident", "playful", "luxury", "warm", "bold", "minimal"];

  return `
    <section class="step-screen">
      <div class="section-head">
        <p class="eyebrow">گام ۴</p>
        <h2>هویت برند</h2>
        <p>نام برند، tone و نیاز به کاراکتر باید قبل از طراحی تثبیت شوند تا خروجی نهایی فقط زیبا نباشد، بلکه برندمحور باشد.</p>
      </div>
      <label class="field">
        <span>نام برند</span>
        <input type="text" value="${state.brandName}" data-action="set-field" data-field="brandName" placeholder="مثلاً NovaOps">
      </label>
      <div class="group-block">
        <div class="group-title">لحن برند</div>
        <div class="chip-wall">
          ${toneOptions
            .map((tone) =>
              renderChip({
                label: tone,
                value: tone,
                group: "brandTone",
                active: state.brandTone.includes(tone)
              })
            )
            .join("")}
        </div>
      </div>
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
      ${
        state.needsMascot
          ? renderSelect({
              label: "سبک کاراکتر",
              field: "mascotStyle",
              value: state.mascotStyle,
              items: [
                { value: "abstract", label: "Abstract" },
                { value: "robotic", label: "Robotic" },
                { value: "organic", label: "Organic" },
                { value: "playful", label: "Playful" }
              ]
            })
          : ""
      }
    </section>
  `;
}

function renderMotionStep(state, visibleQuestions) {
  return `
    <section class="step-screen">
      <div class="section-head">
        <p class="eyebrow">گام ۵</p>
        <h2>موشن، لودر، اسلایدر و 3D</h2>
        <p>اینجا تعیین می‌شود سایت چقدر زنده باشد و این زنده بودن فقط در hero باشد یا در کل تجربه.</p>
      </div>
      <div class="control-grid">
        ${renderSelect({
          label: "Motion Level",
          field: "motionLevel",
          value: state.motionLevel,
          items: [
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" }
          ]
        })}
        ${renderSelect({
          label: "سطح 3D",
          field: "threeDLevel",
          value: state.threeDLevel,
          items: [
            { value: "none", label: "بدون 3D" },
            { value: "low", label: "Accent only" },
            { value: "medium", label: "Section-driven" },
            { value: "high", label: "Immersive" }
          ]
        })}
      </div>
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
        ${renderChip({
          label: "لودر می‌خواهد",
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
      ${visibleQuestions.includes("loader-type")
        ? renderSelect({
            label: "نوع لودر",
            field: "loaderType",
            value: state.loaderType,
            items: [
              { value: "overlay-reveal", label: "Overlay Reveal" },
              { value: "skeleton", label: "Skeleton + content visible" },
              { value: "hard-gate", label: "Show after ready" }
            ]
          })
        : ""}
      <div class="inline-split">
        ${renderChip({
          label: "Hero Section",
          value: "hero",
          action: "set-field-value",
          group: "sliderMode",
          active: state.sliderMode === "hero",
          kind: "accent"
        })}
        ${renderChip({
          label: "Slider Focus",
          value: "slider",
          action: "set-field-value",
          group: "sliderMode",
          active: state.sliderMode === "slider"
        })}
      </div>
      <div class="question-tags">
        ${visibleQuestions.map((question) => `<span>${question}</span>`).join("")}
      </div>
    </section>
  `;
}

function renderContentStep(state, pageStrategy) {
  const contentOptions = ["Hero", "Features", "Use Cases", "Pricing", "FAQ", "Testimonials", "CTA", "Footer"];

  return `
    <section class="step-screen">
      <div class="section-head">
        <p class="eyebrow">گام ۶</p>
        <h2>صفحات، ساختار و محتوای نهایی</h2>
        <p>بر اساس mode پروژه، سیستم باید هم صفحه‌ها را پیشنهاد دهد، هم سکشن‌ها و هم consistency style بین صفحات را بپرسد.</p>
      </div>
      <div class="note-card">
        <h3>پیشنهاد فعلی</h3>
        <p>${pageStrategy.siteType === "landing" ? "Landing Page" : "Full Website"} · ${pageStrategy.pages.join(" / ")}</p>
      </div>
      <div class="card-grid">
        ${contentOptions
          .map((section) =>
            renderCheckboxCard({
              field: "contentSections",
              value: section,
              label: section,
              description: "در brief نهایی لحاظ شود.",
              checked: state.contentSections.includes(section)
            })
          )
          .join("")}
      </div>
      ${
        state.productMode === "full-site"
          ? renderSelect({
              label: "استایل صفحات داخلی",
              field: "pageStyleConsistency",
              value: state.pageStyleConsistency,
              items: [
                { value: "consistent", label: "مشابه سایت اصلی" },
                { value: "adaptive", label: "سازگار ولی متفاوت" },
                { value: "distinct", label: "هر page شخصیت جدا" }
              ]
            })
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
        <div class="mini-chips">${visibleQuestions.map((item) => `<span>${item}</span>`).join("")}</div>
      </section>
      <section class="preview-card compact">
        <h3>Prompt Snapshot</h3>
        <pre>${derived.prompt}</pre>
      </section>
    </div>
  `;
}
