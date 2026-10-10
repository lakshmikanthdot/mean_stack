// buffers - raw binary data
// binary data means - when u have stored data in the form of bytes
// Bit (0 or 1): A single drop of water.
// Byte: A cup containing 8 drops.
// Buffer: A tray carrying a fixed number of those cups.
// strings are good with noraml text data but not good with binary data

// places where we can use buffers -
// reading files
// receiving htts req bodies
// working with streams
// handling images, pdf files, videos
// encrypt and hashing

// string - humans readable text
// buffer - raw byts

// text to buffer
const textBuffer = Buffer.from("Hello Lucky");
// hexadecimal format of the buffer
// each value is one byte and represented in hexadecimal format
// H - 48
// e - 65
// l - 6c
// l - 6c
// o - 6f
//   - 20
// L - 4c
// u - 75
// c - 63
// k - 6b
// y - 79
console.log(textBuffer); // <Buffer 48 65 6c 6c 6f 20 4c 75 63 6b 79>

// buffer to text
const text = textBuffer.toString("utf-8");
console.log(text); // Hello Lucky

// buffer to json
const json = JSON.stringify(textBuffer);
console.log(json); // {"type":"Buffer","data":[72,101,108,108,111,32,76,117,99,107,121]}

// json to buffer
const parsedBuffer = Buffer.from(JSON.parse(json).data);
console.log(parsedBuffer); // <Buffer 48 65 6c 6c 6f 20 4c 75 63 6b 79>

// buffer to base64
const base64 = textBuffer.toString("base64");
console.log(base64); // SGVsbG8gTHVja3k=

// base64 to buffer
const base64Buffer = Buffer.from(base64, "base64");
console.log(base64Buffer); // <Buffer 48 65 6c 6c 6f 20 4c 75 63 6b 79>

// buffer length
const helloBuffer = Buffer.from("Hello");
console.log(helloBuffer.length); // 5
// 5 characters is equal to 5 bytes because each character is 1 byte in utf-8 encoding

// buffer alloc - is create the buffer with fixed number of bytes
const bufferAlloc = Buffer.alloc(10); // 10 bytes
console.log("empty fixed buffer", bufferAlloc); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// add data to the buffer using buffer.write method
bufferAlloc.write("API");
console.log("fixed buffer with data", bufferAlloc);
// fixed buffer with data <Buffer 41 50 49 00 00 00 00 00 00 00>
console.log("fixed buffer as text -> ", bufferAlloc.toString("utf-8"));
// fixed buffer as text ->  API

// data in chunks - when we are working with streams,
// we receive data in chunks and we can store those chunks in buffers
// then combine them to get the complete data

const chunks = [Buffer.from("Hello "), Buffer.from("Node "), Buffer.from("JS")];

// combine the chunks to get the complete data use buffer.concat method
const combineBuffer = Buffer.concat(chunks);
console.log(combineBuffer.toString("utf-8")); // Hello Node JS
