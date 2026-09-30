import crypto from "node:crypto";

// console.log(crypto); // will give the crypto module object with all the methods and properties

// crypto.randomUUID
// unique ID
// user id, order id, session id, transaction id, product id, etc
const requestId = crypto.randomUUID();
console.log(requestId); // 36 character string with 32 alphanumeric characters and 4 hyphens(-)

// crypto.randomBytes
// secure random bytes
// password reset token, email verification token
// session token, api token, etc
const resetToken = crypto.randomBytes(16).toString("hex");
console.log(resetToken); // (32 char will give in the console)32 character string with 16 bytes of random data represented in hexadecimal format

// crypto.createHash
// hello -> hash
// hash -> hello not possible
const text = "hello node";
const hash = crypto.createHash("sha256").update(text).digest("hex"); // (64 char will give in the console) 64 character string with 32 bytes of hash data represented in hexadecimal format
console.log(hash);

//crypto.createHmac
// normal hash: data -> hash
// HMAC hash: data + secret -> signed hash
// used in authentication and data integrity verification
// webhook, signed token, etc
const secretKey = "my-super-secret-key";
const message = "user_id=1";
const signature = crypto
  .createHmac("sha256", secretKey)
  .update(message)
  .digest("hex");
console.log(signature); // (64 char will give in the console) 64 character string with 32 bytes of hash data represented in hexadecimal format
const signatureVerify = crypto
  .createHmac("sha256", secretKey)
  .update(message)
  .digest("hex"); // it will come from the request header in real world application
if (signature === signatureVerify) {
  console.log("Signature is valid");
} else {
  console.log("Signature is invalid");
}
