import express, { Request, Response } from 'express';
import { getPresignedUrlForUpload } from '../../../controllers/purchase_controller';

const manageUserAccountRouter = express.Router();

// TypeScript interfaces
interface VaultParams {
  userId: string;
  mediaId?: string;
}

// Delete all media for a user
manageUserAccountRouter.delete(
  '/permanently-delete',
  async (req: Request<VaultParams>, res: Response) => {
    res.json({ message: 'sksk' });
  },
);

manageUserAccountRouter.post('/archive', (req, res, next) => {
  res.json('Archived for 6months permanently deletion window');
});

// Error handling middleware, placed after all routes
manageUserAccountRouter.use(
  (err: Error, req: Request, res: Response, next: Function) => {
    console.error(err); // Added to log the error details
    res.status(500).send({ error: 'User_Service: Internal Server Error' }); // Send JSON response
  },
);

export default manageUserAccountRouter;
