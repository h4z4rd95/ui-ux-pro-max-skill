import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(appRoot, "..", "..");
const sourceDataRoot = path.join(repoRoot, "src", "ui-ux-pro-max", "data");
const outputFile = path.join(appRoot, "data", "generated-catalog.js");

function parseCsv(text) {
  const rows = [];
  let current = "";
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }

      row.push(current);
      current = "";

      if (row.some((cell) => cell.trim() !== "")) {
        rows.push(row);
      }

      row = [];
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current);
    if (row.some((cell) => cell.trim() !== "")) {
      rows.push(row);
    }
  }

  if (rows.length === 0) {
    return [];
  }

  const [header, ...body] = rows;
  return body.map((cells) => {
    const record = {};
    header.forEach((column, index) => {
      record[column.trim()] = (cells[index] ?? "").trim();
    });
    return record;
  });
}

function splitTags(value) {
  return String(value ?? "")
    .split(/[,+]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function readCsv(relativePath) {
  const filePath = path.join(sourceDataRoot, relativePath);
  return parseCsv(fs.readFileSync(filePath, "utf8"));
}

function readStackFamilies() {
  const stackDir = path.join(sourceDataRoot, "stacks");
  const files = fs
    .readdirSync(stackDir)
    .filter((file) => file.endsWith(".csv"))
    .sort((a, b) => a.localeCompare(b));

  return files.map((file) => {
    const family = file.replace(".csv", "");
    const rules = parseCsv(fs.readFileSync(path.join(stackDir, file), "utf8"));

    return {
      id: family,
      label: family.replace(/-/g, " "),
      count: rules.length,
      sampleGuidelines: rules.slice(0, 8).map((rule) => ({
        category: rule.Category ?? "",
        guideline: rule.Guideline ?? "",
        description: rule.Description ?? "",
        severity: rule.Severity ?? ""
      }))
    };
  });
}

function mapProducts(rows) {
  return rows.map((row) => ({
    id: row.No,
    name: row["Product Type"],
    keywords: splitTags(row.Keywords),
    primaryStyle: row["Primary Style Recommendation"],
    secondaryStyles: splitTags(row["Secondary Styles"]),
    landingPattern: row["Landing Page Pattern"],
    dashboardStyle: row["Dashboard Style (if applicable)"],
    colorFocus: row["Color Palette Focus"],
    considerations: row["Key Considerations"]
  }));
}

function mapPatterns(rows) {
  return rows.map((row) => ({
    id: row.No,
    name: row["Pattern Name"],
    keywords: splitTags(row.Keywords),
    sectionOrder: splitTags(row["Section Order"]),
    ctaPlacement: row["Primary CTA Placement"],
    colorStrategy: row["Color Strategy"],
    effects: splitTags(row["Recommended Effects"]),
    optimization: row["Conversion Optimization"]
  }));
}

function mapStyles(rows) {
  return rows.map((row) => ({
    id: row.No,
    category: row["Style Category"],
    type: row.Type,
    keywords: splitTags(row.Keywords),
    primaryColors: splitTags(row["Primary Colors"]),
    secondaryColors: splitTags(row["Secondary Colors"]),
    effects: splitTags(row["Effects & Animation"]),
    bestFor: splitTags(row["Best For"]),
    avoidFor: splitTags(row["Do Not Use For"]),
    performance: row.Performance,
    accessibility: row.Accessibility,
    mobileFriendly: row["Mobile-Friendly"],
    conversionFocused: row["Conversion-Focused"],
    frameworkCompatibility: row["Framework Compatibility"],
    complexity: row.Complexity,
    promptKeywords: row["AI Prompt Keywords"],
    implementationChecklist: splitTags(row["Implementation Checklist"])
  }));
}

export function buildCatalog() {
  const products = mapProducts(readCsv("products.csv"));
  const patterns = mapPatterns(readCsv("landing.csv"));
  const styles = mapStyles(readCsv("styles.csv"));
  const stacks = readStackFamilies();

  return {
    generatedAt: new Date().toISOString(),
    counts: {
      products: products.length,
      patterns: patterns.length,
      styles: styles.length,
      stacks: stacks.length
    },
    products,
    patterns,
    styles,
    stacks
  };
}

export function writeCatalogModule(catalog = buildCatalog()) {
  const contents = `export const generatedCatalog = ${JSON.stringify(catalog, null, 2)};\n`;
  fs.writeFileSync(outputFile, contents, "utf8");
  return outputFile;
}

if (import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const catalog = buildCatalog();
  const filePath = writeCatalogModule(catalog);
  console.log(`Catalog written to ${filePath}`);
}
