import UserModel from "../../models/user_model";

export async function checkUserExistsActivity(
  mobileNumber: string,
  dialCode: string
): Promise<boolean> {
  try {
    const user = await UserModel.findOne({
      mobileNumber: `${dialCode}${mobileNumber}`,
    }).lean();
    return !!user;
  } catch (error) {
    throw new Error("Error checking if user exists: " + error.message);
  }
}
export type TCheckUserExistsActivity = typeof checkUserExistsActivity;
