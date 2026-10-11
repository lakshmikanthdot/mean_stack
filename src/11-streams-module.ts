// use
// data handle -> piece by piece
// not loading the data eveerything at once

// best example
// reading large files
// uploading files
// downloading files
// video/audio processing
// compression

// streams does not give the data immediately, it gives the data piece by piece
// CHUNKS
// small data we call it as chunks, we can process the data in chunks

// here is my full 500mb file
// here is chunk 1
// here is chunk 2
// here is chunk 3
// here is chunk 4
// here is chunk 5

// memory efficient -> we are not handling all data at once
// so there will be not to much over loading on memory

// streams types
// readable streams -> source of data : where we have some data (read some data in big file, http req body etc..)
// writable streams -> destination where the data is written
// transform streams -> read the data, change it also, pass that stream to forward to next destination (compressing the data, text to uppercase, encrypting the data etc..)
// duplex streams -> read and write the data (read the data, change it, write it to some destination)

import { Readable, Transform, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

// each iteam in the array will be treated as a chunk
const readableStream = Readable.from([
  "hello ",
  "from ",
  "node.js ",
  "streams",
]);

// callback(error, result) -> result is the transformed data
const upperCaseTransform = new Transform({
  transform(chunkData, encodingData, callbackFunction) {
    const text = chunkData.toString();
    callbackFunction(null, text.toUpperCase());
  },
});

// write data to a particular file or
// it possible to to send the data http server also
// upload the data to cloud also
const writableStream = new Writable({
  write(chunkDataWrite, encodingData, callbackFunctionWrite) {
    console.log("received chunk", chunkDataWrite.toString());
    callbackFunctionWrite(); // tell node to send to next one
  },
});

// combine all into one particular concept
// that we called as pipeline
// readableStream.pipe(upperCaseTransform).pipe(writableStream);
async function main(): Promise<void> {
  try {
    await pipeline(readableStream, upperCaseTransform, writableStream);
    console.log("stream completed");
  } catch (error) {
    const msg = error instanceof Error ? error.message : "unknown error";
    console.error("stream failed: ", msg);
  }
}
main();

// received chunk HELLO
// received chunk FROM
// received chunk NODE.JS
// received chunk STREAMS
// stream completed
