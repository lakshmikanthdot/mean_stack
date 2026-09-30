// check the information about the current operating system
// cpu information
// memory information
// home/temp directory information
import * as os from "node:os";
// console.log("CPU Information: ", os); // check the information about the current operating system ( os Object)

function runOSDemo(): void {
  console.log("platform", os.platform());
  console.log("architecture", os.arch());
  console.log("os type", os.type());
  console.log("os release", os.release());
  console.log("home directory", os.homedir());
  console.log("temp directory", os.tmpdir());

  const cups = os.cpus();
  console.log("CPU Information: ", cups.length);
  if (cups.length > 0) {
    console.log(
      "first cpu model",
      cups[0].model,
      "speed",
      cups[0].speed,
      "times",
      cups[0].times,
    );
  }
  // memory information
  console.log("total memory", os.totalmem() / 1024 ** 3, "GB");
  console.log("free memory", os.freemem() / 1024 ** 3, "GB");
}
runOSDemo();
