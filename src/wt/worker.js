import { parentPort, workerData } from 'node:worker_threads';
// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  // This function sends result of nthFibonacci computations to main thread
    try {
        const result = nthFibonacci(Number(workerData));
        parentPort.postMessage({ status: 'resolved', data: result });
    } catch {
        parentPort.postMessage({ status: 'error', data: null });
    }
};

sendResult();
