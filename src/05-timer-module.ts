// some thing after delay
// code repeatedly after some intervals - 2 seconds

// settimeout
// setinterval
// clearTimeout
// clearInterval
// setImmediate

import { setTimeout as sleep } from "node:timers/promises";

function runSetTimeoutExample(): void {
  console.log("1. setTimeout example started.");
  setTimeout(() => {
    console.log("2. This message is displayed after a 2-second delay.");
  }, 2000);
  console.log("3. this run immediately. node doesn't wait");
}

// clearTimeout -> cancels a previously scheduled timeout
function runClearTimeoutExample(): void {
  const timerId = setTimeout(() => {
    console.log("this message will not be displayed");
  }, 2000);
  //   console.log(timerId); // timer object
  clearTimeout(timerId);
  console.log("4. clearTimeout cancelled the 2 second timer.");
}

// setInterval -> executes a function repeatedly at specified intervals after a fixed delay
// setinterval is going to run the callback again and again after the fixed delay
function runSetIntervalExample(): void {
  let count = 0;
  const intervalId = setInterval(() => {
    count++;
    console.log(`5. setInterval tick: ${count}`);
    if (count === 3) {
      clearInterval(intervalId);
      console.log("6. setinterval stopped after 3 ticks.");
    }
  }, 1000);
}

// setImmediate -> executes a function immediately after the current synchronous code has finished executing
function runSetImmmediateExample() {
  setImmediate(() => {
    console.log("7. setImmediate callback");
  });
  console.log(
    "8. synchronous code finished executing, setImmediate will run next.",
  );
}

// promise based timer
async function runPromiseTimerExample(): Promise<void> {
  console.log("9. waiting for promise based timer");
  // we dont want to use the setTimeout here, we want to use promise based timer
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   console.log("10. promise based timer completed after 2 seconds");
  await sleep(5500);
  console.log("10. promise based interval timer completed after 5.5 seconds");
}

function runTimerDemo(): void {
  runSetTimeoutExample();
  runClearTimeoutExample();
  runSetIntervalExample();
  runSetImmmediateExample();
}
runTimerDemo();
runPromiseTimerExample().catch((err) => {
  console.error("imer based demo failed with an error:", err);
});

// 1. setTimeout example started.
// 3. this run immediately. node doesn't wait
// 4. clearTimeout cancelled the 2 second timer.
// 8. synchronous code finished executing, setImmediate will run next.
// 9. waiting for promise based timer
// 7. setImmediate callback
// 5. setInterval tick: 1
// 2. This message is displayed after a 2-second delay.
// 5. setInterval tick: 2
// 5. setInterval tick: 3
// 6. setinterval stopped after 3 ticks.
// 10. promise based interval timer completed after 5.5 seconds
