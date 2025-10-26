import {fileURLToPath} from "node:url";
import {dirname, join} from "node:path";
import { createWriteStream } from 'node:fs';
import {pipeline} from "node:stream/promises";

const dirName = "files";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const nameFile = "fileToWrite.txt";
const filePath = join(__dirname, dirName, nameFile);


const write = async () => {
    const writeStream = createWriteStream(filePath);
    await pipeline(process.stdin, writeStream);
};

await write();
