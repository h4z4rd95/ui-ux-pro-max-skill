import test from "node:test";
import assert from "node:assert/strict";

import {
  decidePageStrategy,
  generateMasterPrompt,
  getVisibleQuestions
} from "../lib/brief-engine.js";

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

test("selects full site pages for documentation-heavy platform", () => {
  const result = decidePageStrategy({
    productMode: "full-site",
    productType: "Knowledge Base/Documentation",
    goals: ["education", "support"]
  });

  assert.equal(result.siteType, "full-site");
  assert.ok(result.pages.includes("Home"));
  assert.ok(result.pages.includes("Docs"));
  assert.ok(result.pages.includes("Contact"));
});

test("generateMasterPrompt includes brand, stack, pages, motion, and content rules", () => {
  const prompt = generateMasterPrompt({
    brand: {
      name: "NovaOps",
      tone: ["precise", "technical"]
    },
    stackChoices: ["Next.js", "shadcn/ui"],
    pageStrategy: {
      siteType: "landing",
      pages: ["Home"],
      sections: ["Hero", "Features", "FAQ"]
    },
    motionLevel: "medium",
    threeDLevel: "low"
  });

  assert.match(prompt, /NovaOps/);
  assert.match(prompt, /Next\.js/);
  assert.match(prompt, /shadcn\/ui/);
  assert.match(prompt, /Hero/);
  assert.match(prompt, /FAQ/);
});

test("3d follow-up questions appear only when 3d is enabled", () => {
  const questions = getVisibleQuestions({
    threeDLevel: "high",
    productMode: "landing",
    needsMascot: true,
    wantsLoader: true
  });

  assert.ok(questions.includes("three-d-objects"));
  assert.ok(questions.includes("three-d-placement"));
  assert.ok(questions.includes("mascot-style"));
  assert.ok(questions.includes("loader-type"));
});

test("3d follow-up questions stay hidden when 3d is disabled", () => {
  const questions = getVisibleQuestions({
    threeDLevel: "none",
    productMode: "landing",
    needsMascot: false,
    wantsLoader: false
  });

  assert.ok(!questions.includes("three-d-objects"));
  assert.ok(!questions.includes("mascot-style"));
  assert.ok(!questions.includes("loader-type"));
});
