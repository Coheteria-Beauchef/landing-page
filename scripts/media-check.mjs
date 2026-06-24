import { execFile } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const disallowedSource = /\.(png|jpe?g)$/i;
const contentFile = /\.(md|ya?ml|toml)$/i;
const contentDir = path.resolve("src/content");
const generatedMediaDir = path.resolve("public/media");
const temporaryUploadDirs = ["uploads/originals", "src/assets/uploads/originals", "public/media"];
const maxGeneratedWebpBytes = 500 * 1024;

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const found = [];

  if (!(await exists(dir))) return found;

  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      found.push(...(await walk(fullPath)));
    } else if (entry.isFile()) {
      found.push(fullPath);
    }
  }

  return found;
}

async function trackedFiles() {
  const { stdout } = await execFileAsync("git", ["ls-files"]);
  return stdout.split("\n").filter(Boolean);
}

const errors = [];

for (const file of await walk(contentDir)) {
  if (!contentFile.test(file)) continue;

  const text = await fs.readFile(file, "utf8");
  const sourceMatches = text.match(/\/?[\w./-]+\.(png|jpe?g)/gi) ?? [];

  for (const match of sourceMatches) {
    errors.push(`${path.relative(process.cwd(), file)} references source image "${match}". Use WebP in committed content.`);
  }
}

for (const file of await walk(generatedMediaDir)) {
  const relative = path.relative(process.cwd(), file);

  if (disallowedSource.test(file)) {
    errors.push(`${relative} is a generated media source image. Commit WebP output instead.`);
    continue;
  }

  if (file.endsWith(".webp")) {
    const stat = await fs.stat(file);
    if (stat.size > maxGeneratedWebpBytes) {
      errors.push(`${relative} is ${Math.round(stat.size / 1024)}KB. Keep generated WebP files under 500KB.`);
    }
  }
}

const tracked = await trackedFiles();
for (const file of tracked) {
  if (!temporaryUploadDirs.some((dir) => file.startsWith(`${dir}/`))) continue;
  if (disallowedSource.test(file)) {
    if (!(await exists(path.resolve(file)))) continue;
    errors.push(`${file} is a tracked temporary source upload. Run pnpm media:build and commit the generated WebP plus the source deletion.`);
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log("Media checks passed.");
