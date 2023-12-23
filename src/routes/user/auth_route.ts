import express from "express";
import { login } from "../../controllers/auth_contoller";

const authRouter = express.Router();

// Route for user login
authRouter.post("/login", login);

export default authRouter;
