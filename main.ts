// Everyday Wonder, Two Days to Find the Line
// Writes a single sentence (<= 200 chars) about a small everyday moment
// of wonder to /output/entry.txt. Node 22 stdlib only, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one sentence, written for this bounty. A shadow that seems to
// know the way home before its owner does — ordinary pavement, made strange
// by half a step.
const ENTRY =
  "My shadow on the wet pavement walked half a step ahead of me all the way home, as if it already knew the way and was only waiting for me to catch up.";

const MAX_CHARS = 200;

// Count characters the way the gate does: Unicode code points, not
// UTF-16 code units, so a non-ASCII character counts once.
function charCount(text: string): number {
  return [...text].length;
}

function validate(text: string): void {
  if (typeof text !== "string" || text.length === 0) {
    throw new Error("entry must not be empty");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  const n = charCount(text);
  if (n > MAX_CHARS) {
    throw new Error(`entry is ${n} characters, over the ${MAX_CHARS} limit`);
  }
  // One sentence: exactly one sentence-ending mark, at the very end.
  const endings = text.match(/[.!?]/g) ?? [];
  if (endings.length !== 1 || !text.endsWith(".")) {
    throw new Error("entry must be exactly one sentence ending in a period");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Never remove the output dir itself: the grader may mount it.
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(`wrote ${charCount(ENTRY)} chars to ${outPath}`);
}

main();
