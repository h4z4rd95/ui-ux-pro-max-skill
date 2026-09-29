import { getCatalog, getFeaturedStackCards, getPatternRecord, getProductRecord, getStyleSuggestions } from "./lib/catalog-loader.js";
import { decidePageStrategy, generateMasterPrompt, getVisibleQuestions } from "./lib/brief-engine.js";
import { createInitialState, steps, toggleArrayValue } from "./lib/ui-state.js";
import { renderLivePreview, renderStepNav, renderWizardPanel } from "./lib/renderers.js";

const catalog = getCatalog();
const state = createInitialState(catalog);

const refs = {
  stepNav: document.querySelector("#step-nav"),
  wizardPanel: document.querySelector("#wizard-panel"),
  livePreview: document.querySelector("#live-preview")
};

function deriveState() {
  const product = getProductRecord(state.productType);
  const pattern = getPatternRecord(product?.landingPattern);
  const stackCards = getFeaturedStackCards(state.stackFamilies);
  const styleSuggestions = getStyleSuggestions(state.productType);
  const visibleQuestions = getVisibleQuestions(state);
  const pageStrategy = decidePageStrategy(state);
  const prompt = generateMasterPrompt({
    brand: {
      name: state.brandName,
      tone: state.brandTone
    },
    stackChoices: stackCards.map((stack) => stack.label),
    pageStrategy,
    motionLevel: state.motionLevel,
    threeDLevel: state.threeDLevel
  });

  return {
    product,
    pattern,
    stackCards,
    styleSuggestions,
    visibleQuestions,
    pageStrategy,
    prompt
  };
}

function syncDerivedSections(pageStrategy) {
  if (state.productMode === "landing") {
    state.contentSections = [...new Set([...state.contentSections, ...pageStrategy.sections])];
  }
}

function renderApp() {
  const derived = deriveState();
  syncDerivedSections(derived.pageStrategy);

  renderStepNav(refs.stepNav, steps, state.activeStep);
  renderWizardPanel(refs.wizardPanel, {
    state,
    steps,
    catalog,
    stackCards: derived.stackCards,
    styleSuggestions: derived.styleSuggestions,
    visibleQuestions: derived.visibleQuestions,
    pageStrategy: derived.pageStrategy,
    derived
  });
  renderLivePreview(refs.livePreview, {
    state,
    product: derived.product,
    pattern: derived.pattern,
    stackCards: derived.stackCards,
    styleSuggestions: derived.styleSuggestions,
    visibleQuestions: derived.visibleQuestions,
    pageStrategy: derived.pageStrategy,
    derived
  });
}

function setField(field, value) {
  if (field === "productMode") {
    state.productMode = value;
    if (value === "landing") {
      state.pageStyleConsistency = "consistent";
    }
    return;
  }

  state[field] = value;
}

function handleClick(event) {
  const target = event.target.closest("[data-action]");
  if (!target) {
    return;
  }

  if (suppressRender) {
    return;
  }

  const action = target.dataset.action;
  const value = target.dataset.value;
  const field = target.dataset.field || target.dataset.group;

  if (action === "go-step") {
    state.activeStep = Number(target.dataset.stepIndex);
  }

  if (action === "next-step") {
    state.activeStep = Math.min(state.activeStep + 1, steps.length - 1);
  }

  if (action === "prev-step") {
    state.activeStep = Math.max(state.activeStep - 1, 0);
  }

  if (action === "toggle-chip" || action === "toggle-array") {
    if (target.tagName === "INPUT" && target.type === "checkbox") {
      return;
    }
    state[field] = toggleArrayValue(state[field], value);
  }

  if (action === "set-boolean") {
    state[field] = value === "true";
  }

  if (action === "set-field-value") {
    state[field] = value;
  }

  if (action === "copy-prompt") {
    const prompt = deriveState().prompt;
    navigator.clipboard.writeText(prompt).catch(() => {});
  }

  renderApp();
}

let suppressRender = false;

function handleChange(event) {
  const target = event.target;
  const action = target.dataset.action;
  if (!action) {
    return;
  }

  if (action === "set-field") {
    setField(target.dataset.field, target.value);
  }

  if (action === "toggle-array" && target.type === "checkbox") {
    state[target.dataset.field] = toggleArrayValue(state[target.dataset.field], target.value);
  }

  if (action === "set-field-value") {
    state[target.dataset.field] = target.dataset.value;
  }

  renderApp();
}

document.addEventListener("click", handleClick);
document.addEventListener("change", handleChange);
document.addEventListener("input", handleChange);

const selectShield = (event) => {
  const select = event.target.closest?.("select[data-action='set-field']");
  if (!select) {
    suppressRender = false;
    return;
  }
  suppressRender = true;
};

document.addEventListener("pointerdown", selectShield, true);
window.addEventListener("blur", () => { suppressRender = false; });

renderApp();
