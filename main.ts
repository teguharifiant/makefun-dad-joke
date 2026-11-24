import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One dad joke for make.fun "Dad Joke Showdown": a father offers to
// fix the Wi-Fi, his daughter points out he is not a router, and he
// answers with the pun — he is just trying to make a connection.
// Written from scratch in this session; not copied from any other
// entry, and not a recycled classic.
const text =
  "I told my daughter I'd fix the Wi-Fi. She said, 'Dad, you're not a router.' I said, 'I know — I'm just trying to make a connection.'";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate: the entry must be UTF-8 text of 1-200 characters, exactly one
// line (no newline characters inside), and not only white space.
const MAX_ENTRY_CHARS = 200;
const length = [...text].length;
if (length < 1 || length > MAX_ENTRY_CHARS) {
  throw new Error(`entry must be 1-${MAX_ENTRY_CHARS} characters, got ${length}`);
}
const trimmed = text.trim();
if (trimmed.length === 0) {
  throw new Error("entry must not be only white space");
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry must be exactly one line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
