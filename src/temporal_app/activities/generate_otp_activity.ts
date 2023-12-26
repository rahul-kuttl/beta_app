import { generateRandomOtp } from "../../utils/otp_util";

export async function generateOtpActivity(): Promise<string> {
  return generateRandomOtp();
}
