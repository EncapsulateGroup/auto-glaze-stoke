import { access, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const root = path.join(projectRoot, "public");
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
const report = (message) => {
  console.error(message);
  failed = true;
};

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

for (const file of files.filter((file) => /\.(html|css|js|xml|txt)$/i.test(file))) {
  const text = await readFile(file, "utf8");
  for (const pattern of banned) {
    if (pattern.test(text)) {
      report(`Found banned reference ${pattern} in ${path.relative(projectRoot, file)}`);
    }
  }

  if (file.endsWith(".html")) {
    const relative = path.relative(projectRoot, file);
    for (const tag of ["title", "h1", "main"]) {
      const count = [...text.matchAll(new RegExp(`<${tag}\\b`, "gi"))].length;
      if (count !== 1) report(`${relative} must contain exactly one <${tag}>; found ${count}`);
    }

    for (const match of text.matchAll(/(?:src|href)=["']([^"']+)["']/gi)) {
      const reference = match[1].split(/[?#]/)[0];
      if (!reference || /^(?:https?:|tel:|mailto:)/i.test(reference) || reference.startsWith("/api/")) continue;
      let target = reference.startsWith("/")
        ? path.join(root, reference)
        : path.resolve(path.dirname(file), reference);
      if (await exists(target) && (await stat(target)).isDirectory()) target = path.join(target, "index.html");
      if (!(await exists(target))) report(`${relative} contains a broken local reference: ${match[1]}`);
    }
  }

  if (file.endsWith(".css")) {
    const opens = (text.match(/{/g) || []).length;
    const closes = (text.match(/}/g) || []).length;
    if (opens !== closes) report(`${path.relative(projectRoot, file)} has unbalanced braces: ${opens} opening, ${closes} closing`);

    for (const match of text.matchAll(/url\(["']?([^"')]+)["']?\)/gi)) {
      const reference = match[1].split(/[?#]/)[0];
      if (!reference || /^(?:data:|https?:)/i.test(reference)) continue;
      const target = reference.startsWith("/")
        ? path.join(root, reference)
        : path.resolve(path.dirname(file), reference);
      if (!(await exists(target))) report(`${path.relative(projectRoot, file)} contains a missing asset: ${match[1]}`);
    }
  }
}

if (failed) throw new Error("Site regression checks failed.");
console.log(`Checked ${files.length} files: page structure, local links, assets, CSS balance and legacy references all passed.`);
