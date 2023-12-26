import {
  defineSignal,
  setHandler,
  sleep,
  proxyActivities,
} from "@temporalio/workflow";
import { IUserDocument } from "../../models/user_model";
import { generateToken } from "../../utils/jwt_util";
import type {
  TGenerateOtpActivity,
  TSendSmsActivity,
  TCheckUserExistsActivity,
  TCreateNewUserActivity,
  TGenerateTokenActivity,
} from "../activities";

const activities = proxyActivities<{
  generateOtpActivity: TGenerateOtpActivity;
  sendSmsActivity: TSendSmsActivity;
  checkUserExistsActivity: TCheckUserExistsActivity;
  createNewUserActivity: TCreateNewUserActivity;
  generateTokenActivity: TGenerateTokenActivity;
}>({
  startToCloseTimeout: "5 minute",
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
  let user: IUserDocument = await activities.checkUserExistsActivity(
    mobileNumber
  );
  if (!user) {
    user = await activities.createNewUserActivity(mobileNumber);
  }

  if (!user) {
    throw new Error("Not able to find user in db & unable to create user");
  }

  // Generate OTP and send it via SMS
  otp = await activities.generateOtpActivity();
  await activities.sendSmsActivity(mobileNumber, otp);

  // Wait for OTP submission; adjust time as needed - ToDo find better way to wait!.
  // Currently if the signal comes early even then it will wait for 2 mins before generating the token
  await sleep("1 minutes");

  if (!isOtpVerified) {
    throw new Error("OTP verification failed.");
  }

  const token = await activities.generateTokenActivity(
    user._id?.toString() || ""
  ); // fix this
  return {
    message: "Login successful",
    mobileNumber,
    dialCode,
    isNewUser: !user,
    token,
  };
}
