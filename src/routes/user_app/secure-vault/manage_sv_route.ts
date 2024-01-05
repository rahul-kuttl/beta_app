import express, { Request, Response } from 'express';
import { getPresignedUrlForUpload } from '../../../controllers/purchase_controller';

const manageSecureVaultRouter = express.Router();

// TypeScript interfaces
interface VaultParams {
  userId: string;
  mediaId?: string;
}
// File upload route
//app.post('/upload', upload.single('file'), handleFileUpload); // Ensure multer processes the file upload
manageSecureVaultRouter.get('/pre-signed-url', getPresignedUrlForUpload);

// Delete all media for a user
manageSecureVaultRouter.delete(
  '/permanently-delete',
  async (req: Request<VaultParams>, res: Response) => {
    try {
      // Logic to delete all media for the provided user
      // Implement your logic here
      res.json({ success: true, message: 'All media deleted for the user' });
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: 'Error deleting all media', error: error.message });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({
          message: 'Error deleting all media',
          error: 'Unknown error',
        });
      }
    }
  },
);

manageSecureVaultRouter.post('/archive', (req, res, next) => {
  res.json('Archived for 6months permanently deletion window');
});

manageSecureVaultRouter.post(
  '/clear-activity-log-with-options',
  (req, res, next) => {
    res.json('Archived for 6months permanently deletion window');
  },
);

manageSecureVaultRouter.post('/metric/global', (req, res, next) => {
  res.json('Saved aggregate');
});
// Error handling middleware, placed after all routes
manageSecureVaultRouter.use(
  (err: Error, req: Request, res: Response, next: Function) => {
    console.error(err); // Added to log the error details
    res.status(500).send({ error: 'User_Service: Internal Server Error' }); // Send JSON response
  },
);

export default manageSecureVaultRouter;
