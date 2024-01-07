import UserModel, { IUser, IUserDocument } from "../../models/user_model";
import jwt from "jsonwebtoken";

export async function generateTokenActivity(userId: string): Promise<string> {
  try {
    return jwt.sign({ id: userId}, process.env.JWT_SECRET || "kk", {
      expiresIn: "7d",
    });
  } catch (error) {
    throw new Error("Error creating new token: " + error);
  }
}

export type TGenerateTokenActivity = typeof generateTokenActivity;
