import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rawOutputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputDir = isAbsolute(rawOutputDir) ? rawOutputDir : resolve(scriptDir, rawOutputDir);
const entry = "Attached is the final version, fueled entirely by cold brew, panic, and a prayer that nobody checks the formulas in column D.";
const expectedLength = 125;
const expectedByteLength = 125;
const expectedWordCount = 22;

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), entry, "utf8");
const writtenText = readFileSync(join(outputDir, "entry.txt"), "utf8");
const actualLength = [...writtenText].length;
const actualWordCount = writtenText.trim() ? writtenText.trim().split(/\s+/u).length : 0;
const actualLineCount = writtenText.split(/\r\n|\r|\n/u).length;
if (actualLength !== expectedLength || Buffer.byteLength(writtenText, "utf8") !== expectedByteLength || actualWordCount !== expectedWordCount || actualLineCount !== 1 || writtenText !== entry) {
  throw new Error(`Entry self-check failed: length expected ${expectedLength}, actual ${actualLength}; byte length expected ${expectedByteLength}, actual ${Buffer.byteLength(writtenText, "utf8")}; words expected ${expectedWordCount}, actual ${actualWordCount}; lines expected 1, actual ${actualLineCount}; exact match expected true, actual ${writtenText === entry}`);
}
