import {fileURLToPath} from "node:url";
import {dirname, join} from "node:path";
import {createReadStream} from "node:fs";
import {pipeline} from "node:stream/promises";

const dirName = "files";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const nameFile = "fileToRead.txt";
const filePath = join(__dirname, dirName, nameFile);

const read = async () => {
    const readStream = createReadStream(filePath);
    await pipeline(readStream, process.stdout);
};

await read();
