import { Worker } from "@temporalio/worker";
import {
  generateOtpActivity,
  sendSmsActivity,
  checkUserExistsActivity,
  createNewUserActivity,
  generateTokenActivity,
  getCurrentTimeActivity,
} from "../activities";
import mongoose from "mongoose";
import config from "../../config/config";

async function runWorker() {
  // Connect to MongoDB
  await mongoose.connect(config.mongodb.dbURI);
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });
  const worker = await Worker.create({
    workflowsPath: require.resolve("../workflows/login_workflow"), // Path to the compiled workflows
    activities: {
      generateOtpActivity,
      sendSmsActivity,
      checkUserExistsActivity,
      createNewUserActivity,
      generateTokenActivity,
      getCurrentTimeActivity,
    },
    taskQueue: process.env.TEMPORAL_USER_TASK_QUEUE || "ll",
  });

  // Start listening for tasks from the Temporal service
  await worker.run();

  console.log("Worker started");
}

runWorker().catch((err) => {
  console.error(err);
  // process.exit(1);
});
