import {
  Context,
  proxyActivities,
  sleep,
  defineSignal,
  defineQuery,
} from "@temporalio/workflow";
import {
  generateOtpActivity,
  sendSmsActivity,
  checkUserExistsActivity,
  createNewUserActivity,
} from "../activities";
import { UserInputError } from "../../utils/errors";

export interface LoginWorkflowInput {
  mobileNumber: string;
  dialCode: string;
}

const signals = {
  continueWithOtp: defineSignal<{ inputOtp: string }>("otp_submitted"),
};

export async function LoginWorkflow(input: LoginWorkflowInput) {
  const { mobileNumber, dialCode } = input;
  const activities = proxyActivities({ startToCloseTimeout: "1 minute" });

  // Check if user exists
  const userExists = await activities.checkUserExistsActivity(
    mobileNumber,
    dialCode
  );
  let isNewUser = !userExists;

  // Generate OTP
  const otp = await activities.generateOtpActivity();
  await activities.sendSmsActivity(mobileNumber, otp);

  // Pause the workflow and wait for the 'continueWithOtp' signal
  const { inputOtp } = await signals.continueWithOtp;

  // Validate OTP
  if (inputOtp !== otp) {
    throw new UserInputError("OTP didn’t match, Try again!");
  }

  // Handle new user creation
  if (isNewUser) {
    await activities.createNewUserActivity(mobileNumber, dialCode);
  }

  // Generate JWT token
  // ... Token generation logic goes here

  return { message: "Token generated", token };
}
