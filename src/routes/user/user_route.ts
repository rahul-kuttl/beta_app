import express, { Request, Response } from "express";
import {
  createUser,
  loginUser,
  getUserDetails,
} from "../../controllers/user_controller";

const userRouter = express.Router();

// Register a new user
userRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login user
userRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const token = await loginUser(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

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
