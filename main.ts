import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const POEM: string = "The Stop Bath\n\nThe flatbed scanner can invert a negative\nbefore the lamp has cooled,\nerasing every speck of dust with infrared.\nIt never fogs a corner. It has an undo button.\n\nStill, every Friday midnight I close the door,\nwait for my eyes to find the amber safelight,\nand slide the paper into the tray.\nFor twenty seconds the rectangle floats blank.\nThen the developer takes hold:\nthe pier line, the dark water, then her face\nturning toward the boat light just as we drifted.\n\nThe darkroom has only the yellow plastic tongs\nand the acid bath waiting in the next tray.\nPull it too soon, her eyes are milk.\nWait five seconds too long, the night swallows her coat.\n\nI count twelve, thirteen, fourteen,\nand plunge the print under the vinegar smell of the stop.\nIt is slightly too dark.\nIt cannot be undone.\nThat is why it looks like her.";

function main(): void {
  const codePoints = [...POEM].length;
  if (codePoints < 1 || codePoints > 1000 || !POEM.trim()) {
    throw new Error(`Invalid poem length: ${codePoints}`);
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(join(OUTPUT_DIR, "entry.txt"), POEM, "utf-8");
}

main();
