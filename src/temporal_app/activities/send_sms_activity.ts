import { sendSms } from "../../services/sms_service";

export async function sendSmsActivity(
  mobileNumber: string,
  otp: string
): Promise<void> {
  try {
    // await sendSms(mobileNumber, `Your OTP is: ${otp}`);
    await sendSms(mobileNumber, `Your OTP for login is ${otp}. From Kuttl!`);
  } catch (error) {
    throw new Error("Error sending SMS: " + error.message);
  }
}
