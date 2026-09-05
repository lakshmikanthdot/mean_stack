// env Vaiables
// command line arguments
// exit code
// process lifecycle events

// read backend port from env variable
// read secret from env variable - db urls, api keys, passwords, google auth secret, etc

// read CLI arguments from process.argv
// process.env

//dotenv

import process from "node:process";

// console.log(process.env);
const nodeEnv = process.env.NODE_ENV ?? "development";
// process.env values are alwyas string or undefined. So we need to convert them to number or boolean if needed

// process.argv ->  [
//     "path/to/node", // path to node
//     "src/01-process-objects.ts", // path to ur file
//     "arg1(custom argument)",
// ]

const command = process.argv[2] ?? "start";

// fail flag
// crash flag
const shouldFail = process.argv.includes("--fail");
const shouldCrash = process.argv.includes("--crash");

// dont start async here
// node is already shutting down
// final cleanup / final log
process.on("exit", (code) => {
  console.log(`Process exit with code ${code}`);
});

function runApp(): void {
  console.log({
    command,
  });
  if (shouldFail) {
    console.error(" Manual failure triggered with --fail flag");
    process.exit(1);
  }
  if (shouldCrash) {
    console.error(" `Manual crash triggered with --crash flag");
    process.exit(1);
  }
}
runApp();
console.log("test commit test1")
