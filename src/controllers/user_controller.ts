import User from "../models/user_model";
import { Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";

// these kind of function shouldn't be in global scope,
// should always be accessed via verification
// Function to get user details
export async function getUserDetails(userId: string) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  return user;
}
