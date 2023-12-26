// api_server/utils/otp_utils.ts
// use crypto package to generate instead of this - make sure there is no sode effects
export function generateRandomOtp(length: number = 6): string {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }

  return otp;
}
