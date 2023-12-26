import {
  defineSignal,
  setHandler,
  sleep,
  proxyActivities,
} from "@temporalio/workflow";
import type {
  TGenerateOtpActivity,
  TSendSmsActivity,
  TCheckUserExistsActivity,
  TCreateNewUserActivity,
} from "../activities";

const activities = proxyActivities<{
  generateOtpActivity: TGenerateOtpActivity;
  sendSmsActivity: TSendSmsActivity;
  checkUserExistsActivity: TCheckUserExistsActivity;
  createNewUserActivity: TCreateNewUserActivity;
}>({
  startToCloseTimeout: "1 minute",
});

const continueWithOtpSignal =
  defineSignal<[{ inputOtp: string }]>("continueWithOtp");

export async function LoginWorkflow({
  mobileNumber,
  dialCode,
}: {
  mobileNumber: string;
  dialCode: string;
}) {
  let otp: string | null = null;
  let isOtpVerified = false;

  setHandler(continueWithOtpSignal, async ({ inputOtp }) => {
    if (otp === inputOtp) {
      isOtpVerified = true;
    } else {
      throw new Error("OTP did not match.");
    }
  });

  // Check if user exists and create new user if not
  const userExists = await activities.checkUserExistsActivity(
    mobileNumber,
    dialCode
  );
  if (!userExists) {
    await activities.createNewUserActivity(mobileNumber, dialCode);
  }

  // Generate OTP and send it via SMS
  otp = await activities.generateOtpActivity();
  await activities.sendSmsActivity(mobileNumber, otp);

  // Wait for OTP submission; adjust time as needed
  await sleep("2 minutes");

  if (!isOtpVerified) {
    throw new Error("OTP verification failed.");
  }

  return {
    message: "Login successful",
    mobileNumber,
    dialCode,
    isNewUser: !userExists,
  };
}
