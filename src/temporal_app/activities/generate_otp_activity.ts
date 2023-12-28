import crypto from "crypto";

export async function generateOtpActivity(): Promise<string> {
  let otp = "";
  while (otp.length < 6) {
    // Generate a random byte
    const randomByte = crypto.randomBytes(1).readUInt8(0);
    // Convert the byte to a number in the 0-9 range
    const digit = randomByte % 10;
    otp += digit.toString();
  }
  return otp;
}

export type TGenerateOtpActivity = typeof generateOtpActivity;
