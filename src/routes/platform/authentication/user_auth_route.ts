import express from 'express';
import { loginController } from '../../../controllers/auth_contoller';

const userAuthRouter = express.Router();

// Route for user login
userAuthRouter.post('/login', loginController);

export default userAuthRouter;
