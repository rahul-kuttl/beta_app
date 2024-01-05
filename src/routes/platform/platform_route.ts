import express, { Request, Response } from 'express';
import { getPresignedUrlForUpload } from '../../controllers/purchase_controller';
import { getUserDetails } from '../../controllers/user_controller';
import { handleUploadConfirmation } from '../../utils/upload_handler';
import userAuthRouter from './authentication/user_auth_route';
import authenticationRouter from './authentication/authentication_route';

const platformRouter = express.Router();

platformRouter.use('/authentication', authenticationRouter);

// Error handling middleware, placed after all routes
platformRouter.use(
  (err: Error, req: Request, res: Response, next: Function) => {
    console.error(err); // Added to log the error details
    res.status(500).send({ error: 'Platform_Service: Internal Server Error' }); // Send JSON response
  },
);

export default platformRouter;
