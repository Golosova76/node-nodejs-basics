import {fileURLToPath} from "url";
import {dirname, join} from "path";
import { unlink, access } from "fs/promises";


const dirName = "files";
const nameFile = "fileToRemove.txt";
const errorMessage = "FS operation failed";

const remove = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const filePath = join(__dirname, dirName, nameFile);

    try {
        await access(filePath);
        await unlink(filePath);
    } catch {
        throw new Error(errorMessage);
    }
};

await remove();