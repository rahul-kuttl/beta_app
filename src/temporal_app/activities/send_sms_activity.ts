import twilioClient from "../../integrations/twilio_client";

export async function sendSmsActivity(
  mobileNumber: string,
  otp: string
): Promise<void> {
  const message = `Your OTP is: ${otp}`;
  await twilioClient.messages.create({
    body: message,
    to: mobileNumber,
    from: process.env.TWILIO_PHONE_NUMBER,
  });
}

export type TSendSmsActivity = typeof sendSmsActivity;
