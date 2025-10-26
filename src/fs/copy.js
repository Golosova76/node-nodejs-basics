import { join, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "node:fs/promises";

const sourceDirName = "files";
const copyDirName = "files_copy";

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const sourceDir = join(__dirname, sourceDirName);
  const copyDir = join(__dirname, copyDirName);

  try {
      await fs.cp(sourceDir, copyDir, {
          recursive: true,
          errorOnExist: true,
          force: false,
      });
  } catch {
      throw new Error("FS operation failed");
  }
};

await copy();
