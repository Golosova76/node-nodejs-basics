import {fileURLToPath} from "url";
import {dirname, join} from "path";
import { readFile } from "fs/promises";

const dirName = "files";
const encoding = 'utf8';
const nameFile = "fileToRead.txt";
const errorMessage = "FS operation failed";

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, dirName, nameFile);

    try {
        const files = await readFile(filePath, encoding);
        console.log(files);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error(errorMessage);
        }
        throw error;
    }
};

await read();