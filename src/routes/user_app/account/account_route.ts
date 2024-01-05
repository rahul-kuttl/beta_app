import express, { Request, Response } from 'express';
import manageUserAccountRouter from './manage_account_route';
import profileRouter from './profile_route';

const accountUserRouter = express.Router();

accountUserRouter.use('/profile', profileRouter);

accountUserRouter.use('/manage', manageUserAccountRouter);

// Error handling middleware, placed after all routes
accountUserRouter.use(
  (err: Error, req: Request, res: Response, next: Function) => {
    console.error(err); // Added to log the error details
    res.status(500).send({ error: 'User_Service: Internal Server Error' }); // Send JSON response
  },
);

export default accountUserRouter;
