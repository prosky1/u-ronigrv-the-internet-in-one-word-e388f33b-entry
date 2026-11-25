import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Captcha";

function assertSingleWord(word: string): void {
  const trimmed = word.trim();
  if (trimmed.length === 0) {
    throw new Error("entry must not be empty or only whitespace");
  }
  if (trimmed !== word) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be exactly one word");
  }
  const chars = [...word].length;
  if (chars < 1 || chars > 30) {
    throw new Error(`entry must be 1 to 30 characters, got ${chars}`);
  }
}

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (typeof fromEnv === "string" && fromEnv.trim().length > 0) {
    return fromEnv;
  }
  return "/output";
}

function main(): void {
  assertSingleWord(WORD);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), WORD, "utf8");
}

main();
