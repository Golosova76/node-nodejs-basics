import {pipeline} from "node:stream/promises";
import { Transform } from "node:stream";


const transform = async () => {
    const reverseStream = new Transform({
        transform(chunk, encoding, callback) {
            const reversed = chunk.toString().split("").reverse().join("");
            callback(null, reversed);
        },
    });

    await pipeline(process.stdin, reverseStream, process.stdout);
};

await transform();
