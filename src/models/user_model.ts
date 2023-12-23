import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  name: string;
  mobileNumber: string;
  password: string;
  tokenLastAccessed: Date;
}

// Interface for the User document
export interface IUserDocument
  extends Document<Types.ObjectId, {}, IUser>,
    IUser {}

// User schema definition
const UserSchema: Schema<IUserDocument> = new Schema(
  {
    name: { type: String, required: true },
    mobileNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tokenLastAccessed: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Pre-save hook to hash password
UserSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Export the model
export default mongoose.model<IUserDocument>("User", UserSchema);
