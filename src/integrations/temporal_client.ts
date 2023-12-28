import {
  WorkflowClient,
  WorkflowHandle,
  Workflow,
  WorkflowIdReusePolicy,
} from "@temporalio/client";

export enum WorkflowStatus {
  Running = "RUNNING",
  Completed = "COMPLETED",
  Failed = "FAILED",
  NotFound = "NOT_FOUND",
}
// Initialize the WorkflowClient
const client = new WorkflowClient();

export namespace temporalClient {
  // Function to start a workflow
  export async function startWorkflow<T extends object>(
    workflow: (args: T) => Promise<any>,
    args: T,
    workflowId: string
  ): Promise<WorkflowHandle> {
    return await client.start(workflow, {
      args: [args],
      workflowId,
      taskQueue: process.env.TEMPORAL_USER_TASK_QUEUE || "kk",
    });
  }
  // Function to start a workflow
  export async function startDuplicateWorkflow<T extends object>(
    workflow: (args: T) => Promise<any>,
    args: T,
    workflowId: string
  ): Promise<WorkflowHandle> {
    return await client.start(workflow, {
      args: [args],
      workflowId,
      taskQueue: process.env.TEMPORAL_USER_TASK_QUEUE || "kk",
      workflowIdReusePolicy:
        WorkflowIdReusePolicy.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE,
    });
  }

  // Function to signal a workflow
  export async function signalWorkflow(
    workflowId: string,
    signalName: string,
    args: object
  ): Promise<void> {
    const handle = await client.getHandle(workflowId);
    await handle.signal(signalName, args);
  }

  // Function to check if a workflow exists
  export async function checkWorkflowExists(
    workflowId: string
  ): Promise<boolean> {
    try {
      const handle = await client.getHandle(workflowId);
      await handle.describe();
      return true;
    } catch (error) {
      return false;
    }
  }

  // Function to wait for the result of a workflow
  export async function getWorkflowResult<T>(workflowId: string): Promise<T> {
    const handle = await client.getHandle(workflowId);
    return (await handle.result()) as T;
  }

  export const clientInstance = client;

  export async function checkWorkflowStatus(
    workflowId: string
  ): Promise<string> {
    try {
      const handle = await client.getHandle(workflowId);
      const description = await handle.describe();

      return description.status.name;
    } catch (error) {
      return "not found";
      console.error("Error checking workflow status:", error);
    }
  }
}
