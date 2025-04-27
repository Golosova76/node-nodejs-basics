import { writeFile, access } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const filePath = join(__dirname, "files", "fresh.txt");
  const content = "I am fresh and young";

  try {
    await access(filePath);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code === "ENOENT") {
      await writeFile(filePath, content);
    } else {
      throw new Error("FS operation failed");
    }
  }
};

await create();
