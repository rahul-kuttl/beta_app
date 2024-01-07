"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const worker_1 = require("@temporalio/worker");
const activities_1 = require("../activities");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config/config"));
async function runWorker() {
    // Connect to MongoDB
    await mongoose_1.default.connect(config_1.default.mongodb.dbURI);
    mongoose_1.default.connection.on("connected", () => {
        console.log("Connected to MongoDB");
    });
    const worker = await worker_1.Worker.create({
        workflowsPath: require.resolve("../workflows/login_workflow"), // Path to the compiled workflows
        activities: {
            generateOtpActivity: activities_1.generateOtpActivity,
            sendSmsActivity: activities_1.sendSmsActivity,
            checkUserExistsActivity: activities_1.checkUserExistsActivity,
            createNewUserActivity: activities_1.createNewUserActivity,
            generateTokenActivity: activities_1.generateTokenActivity,
            getCurrentTimeActivity: activities_1.getCurrentTimeActivity,
        },
        taskQueue: process.env.TEMPORAL_USER_TASK_QUEUE || "kk",
    });
    // Start listening for tasks from the Temporal service
    await worker.run();
    console.log("Worker started");
}
runWorker().catch((err) => {
    console.error(err);
    // process.exit(1);
});
//# sourceMappingURL=worker.js.map