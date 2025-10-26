import { fileURLToPath, pathToFileURL } from 'node:url';
import { join, sep, dirname } from 'node:path';
import { release, version } from 'node:os';
import { createServer as createServerHttp } from 'node:http';
import './files/c.cjs';

const dirName = "files";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileA = join(__dirname, dirName, 'a.json');
const fileB = join(__dirname, dirName, 'b.json');

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    const spec = pathToFileURL(fileA).href;
    unknownObject = (await import(spec, { with: { type: 'json' } })).default;
} else {
    const spec = pathToFileURL(fileB).href;
    unknownObject = (await import(spec, { with: { type: 'json' } })).default;
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };

