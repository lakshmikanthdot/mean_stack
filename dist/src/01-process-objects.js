"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = __importDefault(require("node:process"));
const nodeEnv = node_process_1.default.env.NODE_ENV ?? "development";
const command = node_process_1.default.argv[2] ?? "start";
const shouldFail = node_process_1.default.argv.includes("--fail");
const shouldCrash = node_process_1.default.argv.includes("--crash");
node_process_1.default.on("exit", (code) => {
    console.log(`Process exit with code ${code}`);
});
function runApp() {
    console.log({
        command,
    });
    if (shouldFail) {
        console.error(" Manual failure triggered with --fail flag");
    }
    shouldCrash;
    if (shouldFail) {
        console.error(" Manual crash triggered with --crash flag");
    }
}
//# sourceMappingURL=01-process-objects.js.map