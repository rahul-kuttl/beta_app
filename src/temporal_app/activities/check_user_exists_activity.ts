import UserModel, { IUser, IUserDocument } from "../../models/user_model";

export async function checkUserExistsActivity(
  mobileNumber: string
): Promise<IUserDocument> {
  try {
    const user = await UserModel.findOne({
      mobileNumber: `${mobileNumber}`,
    }).lean();
    return user as IUserDocument;
  } catch (error) {
    throw new Error("Error checking if user exists: " + error);
  }
}
export type TCheckUserExistsActivity = typeof checkUserExistsActivity;
