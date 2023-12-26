import express from "express";
import { login } from "../../controllers/auth_contoller";

const authRouter = express.Router();

// Route for user login
authRouter.post("/send-otp-for-login", login);
authRouter.post("/submit-otp-for-login", login);

export default authRouter;
