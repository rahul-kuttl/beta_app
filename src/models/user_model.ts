import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  name: string;
  mobileNumber: string;
  tokenLastAccessed: Date;
  appOnboarding: {
    isComplete: boolean;
  };
}

// Interface for the User document
export interface IUserDocument
  extends Document<Types.ObjectId, {}, IUser>,
    IUser {}

// User schema definition
const UserSchema: Schema<IUserDocument> = new Schema(
  {
    name: { type: String, required: false },
    mobileNumber: { type: String, required: true, unique: true },
    tokenLastAccessed: { type: Date, default: Date.now },
    appOnboarding: {
      isComplete: { type: Boolean, required: true },
    },
  },
  { timestamps: true }
);

// Export the model
const UserModel = mongoose.model<IUserDocument>("User", UserSchema);

export default UserModel;
