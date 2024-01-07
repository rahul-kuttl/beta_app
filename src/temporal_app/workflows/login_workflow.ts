import {
  proxyActivities,
  defineSignal,
  setHandler,
  sleep,
  condition,
} from '@temporalio/workflow';
import { IUserDocument } from '../../models/user_model';
import type {
  TGenerateOtpActivity,
  TSendSmsActivity,
  TCheckUserExistsActivity,
  TCreateNewUserActivity,
  TGenerateTokenActivity,
  TGetCurrentTimeActivity,
} from '../activities';

// Define activities
const activities = proxyActivities<{
  generateOtpActivity: TGenerateOtpActivity;
  sendSmsActivity: TSendSmsActivity;
  checkUserExistsActivity: TCheckUserExistsActivity;
  createNewUserActivity: TCreateNewUserActivity;
  generateTokenActivity: TGenerateTokenActivity;
  getCurrentTimeActivity: TGetCurrentTimeActivity;
}>({
  startToCloseTimeout: '5 minutes',
});

// Define signals
const continueWithOtpSignal =
  defineSignal<{ inputOtp: string }[]>('continueWithOtp');

export interface LoginWorkflowInput {
  mobileNumber: string;
  dialCode: string;
}

export interface LoginWorkflowResult {
  error: {
    hasError: boolean;
    list: string[];
  };
  data?: {
    message: string;
    mobileNumber: string;
    dialCode: string;
    isNewUser: boolean;
    token?: string;
  };
  message: string;
}

export async function LoginWorkflow(
  input: LoginWorkflowInput,
): Promise<LoginWorkflowResult> {
  const { mobileNumber, dialCode } = input;
  let generatedOtp: string | null = null;
  let isOtpVerified = false;
  let isNewUser = false;
  let user: IUserDocument | null = null;
  let errors: string[] = [];

  // Get the current time from the workflow context
  const workflowStartTime = await activities.getCurrentTimeActivity();

  // Signal handler for OTP verification
  setHandler(
    continueWithOtpSignal,
    async (signalInput: { inputOtp: string }) => {
      const currentTime = await activities.getCurrentTimeActivity();
      const timeElapsed = currentTime - workflowStartTime;

      if (timeElapsed > 180000) {
        // 3 minutes in milliseconds
        errors.push('OTP expired');
        return;
      }

      if (generatedOtp === signalInput.inputOtp) {
        user = await activities.checkUserExistsActivity(mobileNumber);
        if (!user) {
          user = await activities.createNewUserActivity(mobileNumber);
          isNewUser = true;
        }
        isOtpVerified = true;
      } else {
        errors.push('OTP invalid');
      }
    },
  );

  // Generate OTP and send it via SMS
  // generatedOtp = await activities.generateOtpActivity();
  generatedOtp = '000000';

  // await activities.sendSmsActivity(mobileNumber, generatedOtp);

  // Set a timeout for OTP verification
  const otpVerificationTimeout = '3 minutes';

  try {
    // Await for OTP verification or expiration
    await Promise.race([
      condition(() => isOtpVerified),
      sleep(otpVerificationTimeout),
    ]);

    if (!isOtpVerified) {
      errors.push('OTP verification timed out');
    }
  } catch (e) {
    // Handle possible exceptions that could occur in the race condition
    errors.push(`Error during OTP verification`);
  }

  if (user === null) {
    errors.push(`Unable to create or fetch user`);
  }

  // Generate the result based on whether there was an error or not
  if (errors.length === 0) {
    // @ts-ignore
    const userId = user ? user?._id : '';
    const token = await activities.generateTokenActivity(userId.toString());
    return {
      error: {
        hasError: false,
        list: [],
      },
      data: {
        message: 'Login successful',
        mobileNumber,
        dialCode,
        isNewUser,
        token,
      },
      message: 'User logged in successfully',
    };
  } else {
    return {
      error: {
        hasError: true,
        list: errors,
      },
      // @ts-ignore
      data: {},
      message: 'OTP verification failed',
    };
  }
}
