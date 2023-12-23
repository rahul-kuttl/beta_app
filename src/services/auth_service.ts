// src/services/auth.service.ts
import User from "../models/user_model";
import { generateToken } from "../utils/jwt_util";

// This is a placeholder function. Implement actual SMS OTP logic.
const verifyOtp = (mobileNumber: string, otp: string): boolean => {
  // OTP verification logic goes here
  return true;
};

export const authenticateUser = async (
  mobileNumber: string,
  otp: string
): Promise<string | null> => {
  if (!verifyOtp(mobileNumber, otp)) {
    throw new Error("Invalid OTP");
  }

  let user = await User.findOne({ mobileNumber });
  if (!user) {
    user = new User({ mobileNumber, name: "New User" });
    await user.save();
  }

  const token = generateToken(user._id.toString());
  user.tokenLastAccessed = new Date();
  await user.save();

  return token;
};
