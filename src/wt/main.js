import {fileURLToPath} from "node:url";
import {dirname} from "node:path";
import {join} from "node:path";
import { Worker } from 'node:worker_threads';
import os from "node:os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const nameWorkerFile = "worker.js";
const workerPath = join(__dirname, nameWorkerFile);

const runWorker = (n) => {
    return new Promise((resolve) => {
        const worker = new Worker(workerPath, { workerData: n });

        worker.once("message", async (msg) => {
            await worker.terminate(); // дождались остановки потока
            resolve(msg);             // msg = { status, data }
        });

        worker.once("error", async () => {
            await worker.terminate();
            resolve({ status: "error", data: null });
        });
    });
};

const performCalculations = async () => {
    const cores =
        typeof os.availableParallelism === "function"
            ? os.availableParallelism()
            : os.cpus().length;

    const baseNumber = 10;
    const numbers = Array.from({ length: cores }, (_, i) => baseNumber + i);

    const results = await Promise.all(numbers.map((n) => runWorker(n)));
    console.log(results);
};

await performCalculations();
