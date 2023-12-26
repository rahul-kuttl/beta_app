import { Request, Response } from "express";
import { temporalClient } from "../integrations/temporal_client";
import { LoginWorkflow } from "../temporal_app/workflows/login_workflow";
import { UserInputError } from "../utils/error_util";

export const loginController = async (req: Request, res: Response) => {
  // Extract mobile number, dial code, and OTP from the request body
  const { mobileNumber, dialCode, otp } = req.body;

  // Validate input: Ensure mobile number and dial code are provided
  if (!mobileNumber || !dialCode) {
    throw new UserInputError("Mobile number and dial code are required.");
  }

  // Construct a unique workflow ID using the mobile number and dial code
  const workflowId = `${dialCode}${mobileNumber}`;

  try {
    // Check if a workflow with this ID already exists
    const workflowExists = await temporalClient.checkWorkflowExists(workflowId);

    // If the workflow exists and OTP is provided, handle OTP submission
    if (workflowExists && otp) {
      // Signal the workflow with the provided OTP
      await temporalClient.signalWorkflow(workflowId, "continueWithOtp", {
        inputOtp: otp,
      });

      // Wait for the result of the workflow (e.g., successful login or error)
      const result = await temporalClient.getWorkflowResult(workflowId);
      return res.status(200).json(result);
    }

    // If the workflow does not exist, start a new login workflow
    if (!workflowExists) {
      // Start the login workflow with the provided mobile number and dial code
      await temporalClient.startWorkflow(
        LoginWorkflow,
        { mobileNumber, dialCode },
        workflowId
      );

      // Respond to the client indicating that the OTP is being sent
      return res.status(200).json({ message: "OTP is being sent." });
    }

    // If none of the above conditions are met, return a default error
    throw new Error("Unexpected error occurred.");
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: error });
  }
};
