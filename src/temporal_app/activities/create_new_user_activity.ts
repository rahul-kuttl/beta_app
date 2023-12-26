import UserModel, { IUser, IUserDocument } from "../../models/user_model";

export async function createNewUserActivity(
  mobileNumber: string
): Promise<IUserDocument> {
  try {
    const newUser = new UserModel({
      mobileNumber: `${mobileNumber}`,
      appOnboarding: { isComplete: false },
    });
    await newUser.save();
    const user = await UserModel.findOne({
      mobileNumber: `${mobileNumber}`,
    }).lean();
    return user as IUserDocument;
  } catch (error) {
    throw new Error("Error creating new user: " + error);
  }
}

export type TCreateNewUserActivity = typeof createNewUserActivity;
