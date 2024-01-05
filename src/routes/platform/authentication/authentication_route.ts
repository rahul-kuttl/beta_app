import express, { Request, Response } from 'express';
import userAuthRouter from './user_auth_route';

const authenticationRouter = express.Router();

authenticationRouter.use('/user', userAuthRouter);

// Error handling middleware, placed after all routes
authenticationRouter.use(
  (err: Error, req: Request, res: Response, next: Function) => {
    console.error(err); // Added to log the error details
    res.status(500).send({ error: 'Platform_Service: Internal Server Error' }); // Send JSON response
  },
);

export default authenticationRouter;
