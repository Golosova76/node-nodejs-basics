import {fileURLToPath} from "node:url";
import {dirname, join} from "node:path";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";

const dirName = "files";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const nameFile = "fileToCalculateHashFor.txt";
const filePath = join(__dirname, dirName, nameFile);
const hashFormat = 'sha256';



const calculateHash = async () => {
    const hashStream = createHash(hashFormat);

    try {
        const fileStream = createReadStream(filePath);

        await pipeline(fileStream, async function* (source) {
            for await (const chunk of source) {
                hashStream.update(chunk);
            }
        });

        const result = hashStream.digest("hex");
        console.log(result);
    } catch (err) {
        console.error("Error when calculating the hash:", err.message);
    }
};

await calculateHash();