import { spawn, spawnSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const uploadInputDir = path.resolve("uploads/originals");
const mediaDir = path.resolve("public/media");
const contentDir = path.resolve("src/content");
const allowedInput = /\.(png|jpe?g)$/i;
const contentFile = /\.(md|ya?ml|toml)$/i;

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function findImages(dir) {
  const found = [];

  if (!(await exists(dir))) return found;

  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      found.push(...(await findImages(fullPath)));
      continue;
    }

    if (entry.isFile() && allowedInput.test(entry.name)) {
      found.push(fullPath);
    }
  }

  return found;
}

async function findFiles(dir, predicate) {
  const found = [];

  if (!(await exists(dir))) return found;

  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      found.push(...(await findFiles(fullPath, predicate)));
    } else if (entry.isFile() && predicate(fullPath)) {
      found.push(fullPath);
    }
  }

  return found;
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited with code ${code}`));
      }
    });
  });
}

function findImageMagickCommand() {
  for (const command of ["magick", "convert"]) {
    const result = spawnSync(command, ["-version"], { stdio: "ignore" });

    if (result.status === 0) {
      return command;
    }
  }

  throw new Error("ImageMagick is required. Install it so either `magick` or `convert` is available.");
}

async function removeEmptyDirs(dir) {
  if (!(await exists(dir))) return;

  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      await removeEmptyDirs(path.join(dir, entry.name));
    }
  }

  if (dir !== uploadInputDir && (await fs.readdir(dir)).length === 0) {
    await fs.rmdir(dir);
  }
}

async function rewriteContentReferences(rewrites) {
  const files = await findFiles(contentDir, (file) => contentFile.test(file));

  for (const file of files) {
    let text = await fs.readFile(file, "utf8");
    const original = text;

    for (const [from, to] of rewrites) {
      text = text.split(from).join(to);
    }

    if (text !== original) {
      await fs.writeFile(file, text);
      console.log(`Updated references in ${path.relative(process.cwd(), file)}`);
    }
  }
}

const uploadImages = await findImages(uploadInputDir);
const mediaImages = await findImages(mediaDir);
const images = [
  ...uploadImages.map((source) => ({ root: uploadInputDir, source })),
  ...mediaImages.map((source) => ({ root: mediaDir, source })),
];

if (images.length === 0) {
  console.log("No PNG/JPEG source images found in public/media or uploads/originals.");
  process.exit(0);
}

const rewrites = new Map();
const imageMagickCommand = findImageMagickCommand();

for (const { root, source } of images) {
  const relative = path.relative(root, source);
  const target = path.join(mediaDir, relative).replace(/\.(png|jpe?g)$/i, ".webp");
  const sourcePublicPath = `/media/${relative.replaceAll(path.sep, "/")}`;
  const targetPublicPath = sourcePublicPath.replace(/\.(png|jpe?g)$/i, ".webp");

  await fs.mkdir(path.dirname(target), { recursive: true });
  await run(imageMagickCommand, [source, "-auto-orient", "-resize", "1920x1920>", "-quality", "85", target]);
  await fs.unlink(source);
  rewrites.set(sourcePublicPath, targetPublicPath);

  console.log(`Converted ${path.relative(process.cwd(), source)} -> ${path.relative(process.cwd(), target)}`);
}

await rewriteContentReferences(rewrites);
await removeEmptyDirs(uploadInputDir);
