import path from "node:path";
import fs from "node:fs";
// import for the promise based fs apis
import fsPromises from "node:fs/promises";

// creating a folder path and file path for demo
const DEMO_FOLDER_PATH = path.join(process.cwd(), "file-system", "fs-demo");
const SYNC_FILE_PATH = path.join(DEMO_FOLDER_PATH, "sync-note.txt");
const CALLBACK_FILE_PATH = path.join(DEMO_FOLDER_PATH, "callback-note.txt");
const PROMISE_FILE_PATH = path.join(DEMO_FOLDER_PATH, "promise-note.txt");

type FileResult = {
  fileCreatedByUsing: string;
  fileName: string;
  content: string;
  sizeInBytes: number;
};

// fs means file system module
// fs is allowed to work with files and directories in nodejs
// create Folders
// write files
// read files
// check file information
// delete files

// 3 ways of fs module apis
// 1. synchronous apis -> fs.readFileSync
// 2. callback apis -> fs.readFile
// 3. promise apis -> fs.promises.readFile

// use
// when we have created
// small startup scripts
// build scripts
// local demo

// not to use bad practice
// http req handlers
// high traffic apis
// background jobs

// sync example
function ensureDemoFolderExists(): void {
  if (!fs.existsSync(DEMO_FOLDER_PATH)) {
    fs.mkdirSync(DEMO_FOLDER_PATH, { recursive: true });
    // create the full folder path if path is not exists
    // if parent folder is not exits still we can create the full path using recursive:true
  }
}

function runSyncExample(): FileResult {
  // write content to a file
  fs.writeFileSync(
    SYNC_FILE_PATH,
    "created using the sync filesysytem api",
    "utf-8",
  );

  fs.appendFileSync(
    SYNC_FILE_PATH,
    " Appended using sync fs added at the end",
    "utf-8",
  );

  const contentData = fs.readFileSync(SYNC_FILE_PATH, "utf-8");

  const stats = fs.statSync(SYNC_FILE_PATH);

  return {
    fileCreatedByUsing: "sync",
    content: contentData,
    fileName: path.basename(SYNC_FILE_PATH),
    sizeInBytes: stats.size,
  };
}

// callback example (error, result)
function runCallbackExaple(): Promise<FileResult> {
  return new Promise((reslove, reject) => {
    fs.writeFile(
      CALLBACK_FILE_PATH,
      "created using the callback filesystem api",
      "utf-8",
      (writeError) => {
        if (writeError) {
          reject(writeError);
          return;
        }
        fs.appendFile(
          CALLBACK_FILE_PATH,
          " Appended using callback fs added at the end",
          "utf-8",
          (appendError) => {
            if (appendError) {
              reject(appendError);
              return;
            }
            fs.readFile(
              CALLBACK_FILE_PATH,
              "utf-8",
              (readError, contentData) => {
                if (readError) {
                  reject(readError);
                  return;
                }
                fs.stat(CALLBACK_FILE_PATH, (statError, statsData) => {
                  if (statError) {
                    reject(statError);
                    return;
                  }
                  reslove({
                    fileCreatedByUsing: "callback",
                    content: contentData,
                    fileName: path.basename(CALLBACK_FILE_PATH),
                    sizeInBytes: statsData.size,
                  });
                });
              },
            );
          },
        );
      },
    );
  });
}

// using promise example -> we are using in node
async function runPromiseExample(): Promise<FileResult> {
  await fsPromises.writeFile(
    PROMISE_FILE_PATH,
    "created using the promise filesystem api",
    "utf-8",
  );
  await fsPromises.appendFile(
    PROMISE_FILE_PATH,
    " Appended using promise fs added at the end",
    "utf-8",
  );
  const contentData = await fsPromises.readFile(PROMISE_FILE_PATH, "utf-8");
  const statsData = await fsPromises.stat(PROMISE_FILE_PATH);
  return {
    fileCreatedByUsing: "Promise",
    content: contentData,
    fileName: path.basename(PROMISE_FILE_PATH),
    sizeInBytes: statsData.size,
  };
}

// calling the main function to run the example
async function main(): Promise<void> {
  try {
    ensureDemoFolderExists();
    const syncResult = runSyncExample();
    const callbackResult = await runCallbackExaple();
    const promiseResult = await runPromiseExample();
    console.log([syncResult, callbackResult, promiseResult]);
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("file system error", message);
  }
}
main();
