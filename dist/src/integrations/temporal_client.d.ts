import { WorkflowClient, WorkflowHandle } from "@temporalio/client";
export declare enum WorkflowStatus {
    Running = "RUNNING",
    Completed = "COMPLETED",
    Failed = "FAILED",
    NotFound = "NOT_FOUND"
}
export declare namespace temporalClient {
    function startWorkflow<T extends object>(workflow: (args: T) => Promise<any>, args: T, workflowId: string): Promise<WorkflowHandle>;
    function startDuplicateWorkflow<T extends object>(workflow: (args: T) => Promise<any>, args: T, workflowId: string): Promise<WorkflowHandle>;
    function signalWorkflow(workflowId: string, signalName: string, args: object): Promise<void>;
    function checkWorkflowExists(workflowId: string): Promise<boolean>;
    function getWorkflowResult<T>(workflowId: string): Promise<T>;
    const clientInstance: WorkflowClient;
    function checkWorkflowStatus(workflowId: string): Promise<string>;
}
//# sourceMappingURL=temporal_client.d.ts.map