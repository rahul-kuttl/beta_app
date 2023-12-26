import express from "express";
import { loginController } from "../../controllers/auth_contoller";

const authRouter = express.Router();

// Route for user login
authRouter.post("/login", loginController);

export default authRouter;
