"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.temporalClient = exports.WorkflowStatus = void 0;
const client_1 = require("@temporalio/client");
var WorkflowStatus;
(function (WorkflowStatus) {
    WorkflowStatus["Running"] = "RUNNING";
    WorkflowStatus["Completed"] = "COMPLETED";
    WorkflowStatus["Failed"] = "FAILED";
    WorkflowStatus["NotFound"] = "NOT_FOUND";
})(WorkflowStatus || (exports.WorkflowStatus = WorkflowStatus = {}));
// Initialize the WorkflowClient
const client = new client_1.WorkflowClient();
var temporalClient;
(function (temporalClient) {
    // Function to start a workflow
    async function startWorkflow(workflow, args, workflowId) {
        return await client.start(workflow, {
            args: [args],
            workflowId,
            taskQueue: process.env.TEMPORAL_USER_TASK_QUEUE || "kk",
        });
    }
    temporalClient.startWorkflow = startWorkflow;
    // Function to start a workflow
    async function startDuplicateWorkflow(workflow, args, workflowId) {
        return await client.start(workflow, {
            args: [args],
            workflowId,
            taskQueue: process.env.TEMPORAL_USER_TASK_QUEUE || "kk",
            workflowIdReusePolicy: client_1.WorkflowIdReusePolicy.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE,
        });
    }
    temporalClient.startDuplicateWorkflow = startDuplicateWorkflow;
    // Function to signal a workflow
    async function signalWorkflow(workflowId, signalName, args) {
        console.log(`Signaling workflow: ${workflowId} with signal: ${signalName} and args:`, args);
        try {
            const handle = await client.getHandle(workflowId);
            await handle.signal(signalName, args);
            console.log(`Signal sent successfully to workflow: ${workflowId}`);
        }
        catch (error) {
            console.error(`Error signaling workflow: ${workflowId}`, error);
        }
    }
    temporalClient.signalWorkflow = signalWorkflow;
    // Function to check if a workflow exists
    async function checkWorkflowExists(workflowId) {
        try {
            const handle = await client.getHandle(workflowId);
            await handle.describe();
            return true;
        }
        catch (error) {
            return false;
        }
    }
    temporalClient.checkWorkflowExists = checkWorkflowExists;
    // Function to wait for the result of a workflow
    async function getWorkflowResult(workflowId) {
        const handle = await client.getHandle(workflowId);
        return (await handle.result());
    }
    temporalClient.getWorkflowResult = getWorkflowResult;
    temporalClient.clientInstance = client;
    async function checkWorkflowStatus(workflowId) {
        try {
            const handle = await client.getHandle(workflowId);
            const description = await handle.describe();
            return description.status.name;
        }
        catch (error) {
            return "not found";
            console.error("Error checking workflow status:", error);
        }
    }
    temporalClient.checkWorkflowStatus = checkWorkflowStatus;
})(temporalClient || (exports.temporalClient = temporalClient = {}));
//# sourceMappingURL=temporal_client.js.map