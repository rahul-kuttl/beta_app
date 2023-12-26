import { Worker } from "@temporalio/worker";
import {
  generateOtpActivity,
  sendSmsActivity,
  checkUserExistsActivity,
  createNewUserActivity,
} from "../activities";

async function runWorker() {
  const worker = await Worker.create({
    workflowsPath: require.resolve("./workflows"), // Path to the compiled workflows
    activities: {
      generateOtpActivity,
      sendSmsActivity,
      checkUserExistsActivity,
      createNewUserActivity,
    },
    taskQueue: process.env.TEMPORAL_USER_TASK_QUEUE || "ll",
  });

  // Start listening for tasks from the Temporal service
  await worker.run();

  console.log("Worker started");
}

runWorker().catch((err) => {
  console.error(err);
  process.exit(1);
});
