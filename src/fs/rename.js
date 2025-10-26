import { access, rename as fsRename } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const dirName = "files";
const oldNameFile = "wrongFilename.txt";
const newNameFile = "properFilename.md";
const errorMessage = "FS operation failed";

const fileExists = async (filePath) => {
    try {
        await access(filePath);
        return true;
    } catch {
        return false;
    }
};

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const sourceFile = join(__dirname, dirName, oldNameFile);
  const renameFile = join(__dirname, dirName, newNameFile);

    const sourceExists = await fileExists(sourceFile);
    const targetExists = await fileExists(renameFile);

    if (!sourceExists || targetExists) {
        throw new Error(errorMessage);
    }

    await fsRename(sourceFile, renameFile);
};

await rename();
