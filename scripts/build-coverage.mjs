#!/usr/bin/env node
/**
 * Converts the RingSphere Coverage Areas workbook into per-service JSON
 * files under data/coverage/. Run this any time the source spreadsheet
 * is updated: `npm run build:coverage [path/to/workbook.xlsx]`.
 *
 * This script is a build-time/dev-time tool only — it is never imported
 * by the running website, and the `xlsx` package is a devDependency for
 * exactly this reason. Only run it against workbooks you trust.
 */
import XLSX from "xlsx";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const defaultSource = path.join(
  rootDir,
  "src/data/source/RingSphere_Coverage_Areas.xlsx",
);
const sourcePath = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : defaultSource;
const outDir = path.join(rootDir, "src/data/coverage");

// Sheet name -> service slug used throughout the app (config/services.ts).
const SHEET_TO_SLUG = {
  Plumbing: "plumbing",
  HVAC: "hvac",
  Electrician: "electrician",
  "Appliance Repair": "appliance-repair",
  Roofing: "roofing",
  Locksmith: "locksmith",
  "Garage Door Repair": "garage-door-repair",
};

function normalizeZip(rawZip) {
  const digits = String(rawZip).trim().replace(/\D/g, "");
  if (!digits) return null;
  return digits.padStart(5, "0").slice(0, 5);
}

function titleCase(str) {
  return str
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bMc(\w)/g, (_, c) => `Mc${c.toUpperCase()}`);
}

if (!fs.existsSync(sourcePath)) {
  console.error(`Coverage workbook not found at: ${sourcePath}`);
  process.exit(1);
}

const workbook = XLSX.readFile(sourcePath);
fs.mkdirSync(outDir, { recursive: true });

let totalRecords = 0;
const summary = [];

for (const [sheetName, slug] of Object.entries(SHEET_TO_SLUG)) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    console.warn(`Sheet "${sheetName}" not found in workbook, skipping.`);
    continue;
  }

  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
  const seen = new Set();
  const records = [];

  for (const row of rows) {
    const rawZip = row["Zip Code"] ?? row["ZIP Code"] ?? row["Zip"];
    const rawCity = row["City Name"] ?? row["City"];
    const rawState = row["State "] ?? row["State"];

    const zip = normalizeZip(rawZip);
    const city = String(rawCity ?? "").trim();
    const state = String(rawState ?? "").trim().toUpperCase();

    if (!zip || !city || !state) continue;

    const key = `${zip}|${state}`;
    if (seen.has(key)) continue;
    seen.add(key);

    records.push({ zip, city: titleCase(city), state });
  }

  records.sort((a, b) => a.zip.localeCompare(b.zip));

  fs.writeFileSync(
    path.join(outDir, `${slug}.json`),
    JSON.stringify(records),
  );

  totalRecords += records.length;
  summary.push({ slug, count: records.length });
}

console.log("Coverage data build complete:");
for (const { slug, count } of summary) {
  console.log(`  ${slug.padEnd(20)} ${count} ZIP records`);
}
console.log(`  ${"TOTAL".padEnd(20)} ${totalRecords} ZIP records`);
