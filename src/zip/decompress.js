import {fileURLToPath} from "node:url";
import {dirname, join} from "node:path";
import {createReadStream, createWriteStream} from "node:fs";
import { createGunzip } from "node:zlib";
import {pipeline} from "node:stream/promises";

const dirName = "files";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const nameDecompressedFile = "fileToCompress.txt";
const archiveNameFile = 'archive.gz';
const fileSourcePath = join(__dirname, dirName, archiveNameFile);
const fileDecompressedPath = join(__dirname, dirName, nameDecompressedFile);

const decompress = async () => {
    const gunzip = createGunzip();
    const source = createReadStream(fileSourcePath);
    const destination = createWriteStream(fileDecompressedPath);

    try {
        await pipeline(source, gunzip, destination);
        console.log("Decompression complete");
    } catch {
        throw new Error("Decompression failed");
    }
};

await decompress();
