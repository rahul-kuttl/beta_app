import crypto from "crypto";

export async function generateOtpActivity(): Promise<string> {
  const otp = crypto.randomBytes(3).toString("hex"); // Generates a 6-character hexadecimal OTP
  return otp;
}

export type TGenerateOtpActivity = typeof generateOtpActivity;
