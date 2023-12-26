import express, { Request, Response } from "express";
import {
  createUser,
  loginUser,
  getUserDetails,
} from "../../controllers/user_controller";

const userRouter = express.Router();

// Get user details
userRouter.get("/:userId", async (req: Request, res: Response) => {
  try {
    const userDetails = await getUserDetails(req.params.userId);
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default userRouter;
