import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public");
const banned = [/wp-content/i, /wp-admin/i, /wp-includes/i, /elementor/i, /plugins/i, /themes/i];
const files = [];

async function walk(dir) {
  for (const entry of await readdir(dir)) {
    const full = path.join(dir, entry);
    const info = await stat(full);
    if (info.isDirectory()) await walk(full);
    else files.push(full);
  }
}

await walk(root);

let failed = false;
for (const file of files.filter((file) => /\.(html|css|js|xml|txt)$/i.test(file))) {
  const text = await readFile(file, "utf8");
  for (const pattern of banned) {
    if (pattern.test(text)) {
      console.error(`Found banned reference ${pattern} in ${path.relative(process.cwd(), file)}`);
      failed = true;
    }
  }
}

if (failed) process.exit(1);
console.log(`Checked ${files.length} files. No banned legacy references found in public text assets.`);
