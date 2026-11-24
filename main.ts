import { mkdirSync, writeFileSync } from "node:fs";

// Fortune in a Pot — a kind, funny fortune for a houseplant on the windowsill.
// Gate (competition.yaml): /output/entry.txt must be UTF-8 text of 1 to 120
// characters, not only white space, a single line.
const LINE =
  "Soon the sun will linger longer on your leaves, and your keeper will tell a guest you are the easiest thing they own.";
const MAX_CODE_POINTS = 120;

function codePoints(s: string): number {
  return [...s].length;
}

function validate(line: string): void {
  const count = codePoints(line);
  if (count < 1 || count > MAX_CODE_POINTS) {
    throw new Error(
      `line is ${count} code points, must be 1-${MAX_CODE_POINTS}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

function main(): void {
  validate(LINE);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LINE, "utf8");
  console.log(`Wrote ${codePoints(LINE)} code point(s) to /output/entry.txt`);
}

main();
