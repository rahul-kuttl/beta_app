import express, { Request, Response } from 'express';
import { getPresignedUrlForUpload } from '../../controllers/purchase_controller';
import { getUserDetails } from '../../controllers/user_controller';
import { handleUploadConfirmation } from '../../utils/upload_handler';
import purchaseRoutes from './purchase/purchase_router';
import purchaseItemRoutes from './purchase/line_items_router';
import accountUserRouter from './account/account_route';
import secureVaultRouter from './secure-vault/secure_vault_route';

const userRouter = express.Router();

// Middleware for authenticating subsequent routes
//app.use(authenticate); // Applies to all subsequent routes
 


// Purchase related actions
userRouter.use('/purchase', purchaseRoutes);

userRouter.use('/account', accountUserRouter);

userRouter.use('/secure-vault', secureVaultRouter);

// Line item related actions
userRouter.use('/item', purchaseItemRoutes);

// Error handling middleware, placed after all routes
userRouter.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err); // Added to log the error details
  res.status(500).send({ error: 'User_Service: Internal Server Error' }); // Send JSON response
});

export default userRouter;
