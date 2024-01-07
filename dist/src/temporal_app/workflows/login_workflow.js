"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginWorkflow = void 0;
const workflow_1 = require("@temporalio/workflow");
// Define activities
const activities = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: "5 minutes",
});
// Define signals
const continueWithOtpSignal = (0, workflow_1.defineSignal)("continueWithOtp");
async function LoginWorkflow(input) {
    const { mobileNumber, dialCode } = input;
    let generatedOtp = null;
    let isOtpVerified = false;
    let isNewUser = false;
    let user = null;
    let errors = [];
    // Get the current time from the workflow context
    const workflowStartTime = await activities.getCurrentTimeActivity();
    // Signal handler for OTP verification
    (0, workflow_1.setHandler)(continueWithOtpSignal, async (signalInput) => {
        const currentTime = await activities.getCurrentTimeActivity();
        const timeElapsed = currentTime - workflowStartTime;
        if (timeElapsed > 180000) {
            // 3 minutes in milliseconds
            errors.push("OTP expired");
            return;
        }
        if (generatedOtp === signalInput.inputOtp) {
            user = await activities.checkUserExistsActivity(mobileNumber);
            if (!user) {
                user = await activities.createNewUserActivity(mobileNumber);
                isNewUser = true;
            }
            isOtpVerified = true;
        }
        else {
            errors.push("OTP invalid");
        }
    });
    // Generate OTP and send it via SMS
    // generatedOtp = await activities.generateOtpActivity();
    generatedOtp = "000000";
    // await activities.sendSmsActivity(mobileNumber, generatedOtp);
    // Set a timeout for OTP verification
    const otpVerificationTimeout = "3 minutes";
    try {
        // Await for OTP verification or expiration
        await Promise.race([
            (0, workflow_1.condition)(() => isOtpVerified),
            (0, workflow_1.sleep)(otpVerificationTimeout),
        ]);
        if (!isOtpVerified) {
            errors.push("OTP verification timed out");
        }
    }
    catch (e) {
        // Handle possible exceptions that could occur in the race condition
        errors.push(`Error during OTP verification`);
    }
    if (user === null) {
        errors.push(`Unable to create or fetch user`);
    }
    // Generate the result based on whether there was an error or not
    if (errors.length === 0) {
        // @ts-ignore
        const userId = user ? user?._id : "";
        const token = await activities.generateTokenActivity(userId);
        return {
            error: {
                hasError: false,
                list: [],
            },
            data: {
                message: "Login successful",
                mobileNumber,
                dialCode,
                isNewUser,
                token,
            },
            message: "User logged in successfully",
        };
    }
    else {
        return {
            error: {
                hasError: true,
                list: errors,
            },
            // @ts-ignore
            data: {},
            message: "OTP verification failed",
        };
    }
}
exports.LoginWorkflow = LoginWorkflow;
//# sourceMappingURL=login_workflow.js.map