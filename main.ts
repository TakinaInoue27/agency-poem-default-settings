import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STANZA_MAP = new Map<number, readonly string[]>([
  [0, ["Factory Defaults"]],
  [
    1,
    [
      "First you let it pick the alarm for seven-fifteen,",
      "then the fastest route past the bridge with two lights,",
      "then the phrasing of the note you owed your brother—",
      "nothing large, only friction shaved off the morning.",
    ],
  ],
  [
    2,
    [
      "Nobody came with handcuffs or a decree.",
      "A pale blue button simply stayed highlighted",
      "three seconds longer than your patience lasted,",
      "and clicking Enter felt almost like deciding.",
    ],
  ],
  [
    3,
    [
      "By November, your calendar was full of someone else's weather,",
      "your replies sounded strangely courteous and smooth,",
      "and when the box finally asked what you wanted kept,",
      "you caught yourself reaching for Recommended.",
    ],
  ],
]);

function encodeChecked(): Uint8Array {
  const ordered = [...STANZA_MAP.keys()].sort((a, b) => a - b);
  const full = ordered.map((k) => STANZA_MAP.get(k)!.join("\n")).join("\n\n");
  const codePoints = Array.from(full).length;
  if (codePoints < 1 || codePoints > 1000) {
    throw new Error(`Invalid length ${codePoints}`);
  }
  const bytes = new TextEncoder().encode(full);
  // Compute deterministic digest to verify repeatable build
  const digest = createHash("sha256").update(bytes).digest("hex");
  if (digest.length !== 64) {
    throw new Error("Unexpected digest");
  }
  return bytes;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), encodeChecked());
