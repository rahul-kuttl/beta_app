import fs from 'fs';
import {
  WorkflowHandle,
  Workflow,
  WorkflowIdReusePolicy,
} from '@temporalio/client';
import { Client, Connection, WorkflowClient } from '@temporalio/client';
import config from '../config/config';

export enum WorkflowStatus {
  Running = 'RUNNING',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  NotFound = 'NOT_FOUND',
}

let client: Client | null = null;

export async function getClient(): Promise<Client> {
  if (!client) {
    // Path to your certificate files
    const certPath = '../../temporal_certificates/temporal-ca-cert-x509';
    const keyPath = '../../temporal_certificates/temporal-ca-cert-x509-key';
    const caPath = '../../temporal_certificates/temporal-ca-cert';

    // Load certificates
    const cert = fs.readFileSync(certPath);
    const key = fs.readFileSync(keyPath);
    const ca = fs.readFileSync(caPath);

    // Create a connection with TLS configuration
    const connection = await Connection.connect({
      address: config.temporalCloudAddress, // Replace with your Temporal Cloud address
      tls: {
        clientCertPair: {
          crt: cert,
          key,
        },
      },
    });

    client = new Client({
      connection,
      namespace: config.temporalNamespace,
    });
  }

  return client;
}

export namespace temporalClient {
  // Function to start a workflow
  export async function startWorkflow<T extends object>(
    workflow: (args: T) => Promise<any>,
    args: T,
    workflowId: string,
  ): Promise<WorkflowHandle> {
    return await client.workflow.start(workflow, {
      args: [args],
      workflowId,
      taskQueue: process.env.TEMPORAL_USER_TASK_QUEUE || 'kk',
    });
  }
  // Function to start a workflow
  export async function startDuplicateWorkflow<T extends object>(
    workflow: (args: T) => Promise<any>,
    args: T,
    workflowId: string,
  ): Promise<WorkflowHandle> {
    return await client.workflow.start(workflow, {
      args: [args],
      workflowId,
      taskQueue: process.env.TEMPORAL_USER_TASK_QUEUE || 'kk',
      workflowIdReusePolicy:
        WorkflowIdReusePolicy.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE,
    });
  }

  // Function to signal a workflow
  export async function signalWorkflow(
    workflowId: string,
    signalName: string,
    args: object,
  ): Promise<void> {
    const handle = await client.workflow.getHandle(workflowId);
    await handle.signal(signalName, args);
  }

  // Function to check if a workflow exists
  export async function checkWorkflowExists(
    workflowId: string,
  ): Promise<boolean> {
    try {
      const handle = await client.workflow.getHandle(workflowId);
      await handle.describe();
      return true;
    } catch (error) {
      return false;
    }
  }

  // Function to wait for the result of a workflow
  export async function getWorkflowResult<T>(workflowId: string): Promise<T> {
    const handle = await client.workflow.getHandle(workflowId);
    return (await handle.result()) as T;
  }

  export const clientInstance = client;

  export async function checkWorkflowStatus(
    workflowId: string,
  ): Promise<string> {
    try {
      const handle = await client.workflow.getHandle(workflowId);
      const description = await handle.describe();

      return description.status.name;
    } catch (error) {
      console.error('Error checking workflow status:', error);
      return 'not found';
    }
  }
}
