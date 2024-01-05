import express, { Request, Response } from 'express';
import { getPresignedUrlForUpload } from '../../controllers/purchase_controller';
import { getUserDetails } from '../../controllers/user_controller';
import { handleUploadConfirmation } from '../../utils/upload_handler';
import purchaseRoutes from './purchase/purchase_router';
import lineItemRoutes from './purchase/line_items_router';
import accountUserRouter from './account/account_route';
import secureVaultRouter from './secure-vault/secure_vault_route';

const userRouter = express.Router();

// Middleware for authenticating subsequent routes
//app.use(authenticate); // Applies to all subsequent routes

// Get user details
userRouter.get('/:userId', async (req: Request, res: Response) => {
  try {
    const userDetails = await getUserDetails(req.params.userId);
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// route for upload confirmation
userRouter.post('/upload/confirmation', handleUploadConfirmation);

// Purchase related actions
userRouter.use('/purchase', purchaseRoutes);

userRouter.use('/account', accountUserRouter);

userRouter.use('/secure-vault', secureVaultRouter);

// Line item related actions
userRouter.use('/item', lineItemRoutes);
// Error handling middleware, placed after all routes
userRouter.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err); // Added to log the error details
  res.status(500).send({ error: 'User_Service: Internal Server Error' }); // Send JSON response
});

export default userRouter;
