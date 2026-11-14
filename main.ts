import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const VERSES: readonly (readonly string[])[] = [
  [
    "Stop Sharing"
  ],
  [
    "Since ninth grade the family map stayed open on my screen:",
    "Arrived at band. Left the library. Battery 12%.",
    "Not spying—just a quiet roof I kept over her nights,",
    "so even across town I knew which street she walked."
  ],
  [
    "The week we unpacked boxes in her dorm,",
    "the app offered a new rule:",
    "Alert if off campus after midnight."
  ],
  [
    "Through the third-floor window I watched her",
    "cross the quad with two strangers, laughing,",
    "looking up at buildings she hadn't named yet."
  ],
  [
    "I knew how easy it would be to leave the dot on,",
    "to check at one a.m. and call it love."
  ],
  [
    "I opened Settings, tapped Leave Circle,",
    "and locked my screen before the elevator came back up—",
    "handing her the whole dark city",
    "with nobody watching her turn the wrong corner."
  ]
];

function assembleText(groups: readonly (readonly string[])[]): string {
  const text = groups.map((g) => g.join("\n")).join("\n\n");
  const count = Array.from(text).length;
  if (count < 1 || count > 1000 || text.trim().length === 0) {
    throw new RangeError(`Code points out of bounds: ${count}`);
  }
  return text;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), assembleText(VERSES), { encoding: "utf8" });
