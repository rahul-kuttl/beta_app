import { Request, Response } from "express";
import { temporalClient } from "../temporal_app/temporal_client";
import { LoginWorkflow } from "../temporal_app/workflows/login_workflow";
import { UserInputError } from "../utils/errors";

export const loginController = async (req: Request, res: Response) => {
  const { mobileNumber, dialCode, otp } = req.body;

  // Validate input
  if (!mobileNumber || !dialCode) {
    throw new UserInputError("Mobile number and dial code are required.");
  }

  // Workflow ID to maintain idempotency
  const workflowId = `${dialCode}${mobileNumber}`;

  try {
    const workflow = await temporalClient.getHandle(workflowId);

    // If the workflow is already running, and OTP is provided
    if (workflow && otp) {
      await workflow.signal.continueWithOtp({ inputOtp: otp });
      const result = await workflow.result();
      return res.status(200).json(result);
    }

    // If the workflow is not running, start a new one
    if (!workflow) {
      const loginWorkflow = await temporalClient.start(LoginWorkflow, {
        args: [{ mobileNumber, dialCode }],
        workflowId,
        taskQueue: "login-task-queue",
      });

      // Await the first return from the workflow
      const message = await loginWorkflow.result();
      return res.status(200).json(message);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
