import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user_model";
// TODO: use via env
import { jwtSecret, jwtExpiration } from "../config/jwtConfig";

export const login = async (req: Request, res: Response) => {
  try {
    const { mobileNumber, otp } = req.body;

    // Validate mobile number and OTP
    // Implement OTP verification logic here

    // Find the user by mobile number
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify OTP here

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_SECRET_EXPIRY,
    });

    // Update tokenLastAccessed for the user
    user.tokenLastAccessed = new Date();
    await user.save();

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
