import UserModel from "../../models/user_model";

export async function createNewUserActivity(
  mobileNumber: string,
  dialCode: string
): Promise<void> {
  try {
    const newUser = new UserModel({
      mobileNumber: `${dialCode}${mobileNumber}`,
      appOnboarding: { isComplete: false },
    });
    await newUser.save();
  } catch (error) {
    throw new Error("Error creating new user: " + error.message);
  }
}

export type TCreateNewUserActivity = typeof createNewUserActivity;
