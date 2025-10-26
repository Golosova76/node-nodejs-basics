import {fileURLToPath} from "node:url";
import {dirname, join} from "node:path";
import {createReadStream, createWriteStream} from "node:fs";
import { createGzip } from "node:zlib";
import {pipeline} from "node:stream/promises";

const dirName = "files";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const nameSourceFile = "fileToCompress.txt";
const archiveNameFile = 'archive.gz';
const fileSourcePath = join(__dirname, dirName, nameSourceFile);
const fileArchivePath = join(__dirname, dirName, archiveNameFile);

const compress = async () => {
    const gzip = createGzip();
    const source = createReadStream(fileSourcePath);
    const destination = createWriteStream(fileArchivePath);

    try {
        await pipeline(source, gzip, destination);
    } catch {
        throw new Error("Compression failed");
    }
};

await compress();
