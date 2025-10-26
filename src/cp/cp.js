import {fileURLToPath} from "node:url";
import {dirname} from "node:path";
import {join} from "node:path";
import { spawn } from "node:child_process";

const dirName = "files";
const nameFile = "script.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const scriptPath = join(__dirname, dirName, nameFile);

const spawnChildProcess = async (args) => {
    const child = spawn(process.execPath, [scriptPath, ...args], {
        stdio: ["pipe", "pipe", "inherit"],
    });

    process.stdin.pipe(child.stdin);

    child.stdout.pipe(process.stdout);

    await new Promise((resolve) => child.on("close", resolve));
};

// Put your arguments in function call to test this functionality
spawnChildProcess( ["a", "b", "c", "d"]).catch(console.error);
