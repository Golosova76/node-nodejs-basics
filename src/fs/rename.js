import { access, rename as fsRename } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const sourceFile = join(__dirname, "files", "wrongFilename.txt");
  const renameFile = join(__dirname, "files", "properFilename.md");

  try {
    await access(sourceFile);

    try {
      await access(renameFile);
      throw new Error("FS operation failed");
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw new Error("FS operation failed");
      }
    }

    await fsRename(sourceFile, renameFile);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await rename();
