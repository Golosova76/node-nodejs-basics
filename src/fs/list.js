import { readdir } from "fs/promises";
import {fileURLToPath} from "url";
import {dirname, join} from "path";

const dirName = "files";
const errorMessage = "FS operation failed";

const list = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const dirPath = join(__dirname, dirName);

    try {
        const files = await readdir(dirPath);
        console.log(files);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error(errorMessage);
        }
        throw error;
    }
};

await list();