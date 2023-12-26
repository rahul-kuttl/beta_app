import { Connection, WorkflowClient } from "@temporalio/client";

export function getTemporalClient() {
  let workflowClient: WorkflowClient | undefined;

  return async () => {
    if (workflowClient === undefined) {
      const connection = await Connection.connect();
      const namespace = "default"; // Replace with your Temporal namespace if different
      workflowClient = new WorkflowClient({ connection, namespace });
    }

    return workflowClient;
  };
}
