import { copyFile, access, mkdir, readdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const sourceDir = join(__dirname, "files");
  const copyDir = join(__dirname, "files_copy");

  try {
    await access(sourceDir);

    try {
      await access(copyDir);
      throw new Error("FS operation failed");
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw new Error("FS operation failed");
      }
    }

    await mkdir(copyDir);

    const files = await readdir(sourceDir);

    for (const file of files) {
      const srcPath = join(sourceDir, file);
      const destPath = join(copyDir, file);
      await copyFile(srcPath, destPath);
    }
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await copy();
