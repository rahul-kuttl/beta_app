import User from "../models/user_model";
import { Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";

// Function to create a new user
export async function createUser(reqBody: any) {
  const { name, mobileNumber, password } = reqBody;

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const user = new User({
    name,
    mobileNumber,
    password: hashedPassword,
  });

  // Save the user to the database
  await user.save();

  // Return the saved user
  return user;
}

// Function to login a user
export async function loginUser(reqBody: any) {
  const { mobileNumber, password } = reqBody;

  // Check if user exists
  const user = await User.findOne({ mobileNumber });
  if (!user) throw new Error("User not found");

  // Check if password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Invalid password");

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
    expiresIn: "7d",
  });
  return token;
}

// Function to get user details
export async function getUserDetails(userId: string) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  return user;
}
