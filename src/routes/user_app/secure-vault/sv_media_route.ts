import express, { Request, Response } from 'express';
import { getUserDetails } from '../../../controllers/user_controller';
import { DatabaseService } from '../../../services/database_service';
import { FileService } from '../../../services/file_service';

// TypeScript interfaces
interface VaultParams {
  userId: string;
  mediaId?: string;
}
const dbService = new DatabaseService(); //database service instantiation
const fileService = new FileService(); //file handling service instantiation

const svMediaRouter = express.Router();
// Get details of the media (read metadata) and retrieve all files of an User
svMediaRouter.get(
  '/:mediaId',
  async (req: Request<VaultParams>, res: Response) => {
    const mediaId = req.params.mediaId;

    if (!mediaId) {
      return res
        .status(400)
        .json({ error: 'Bad Request', message: 'Media ID is required' });
    }

    try {
      // Fetch metadata from the database
      const metadata = await dbService.getMetadata(mediaId);
      res.json({ message: 'Metadata retrieved', data: metadata });
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Error fetching metadata',
          details: error.message,
        });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Error fetching metadata',
          details: 'Unknown error',
        });
      }
    }
  },
);

// Update the filename or replace the uploaded file
svMediaRouter.put(
  '/:mediaId',
  async (req: Request<VaultParams>, res: Response) => {
    try {
      // Update filename or file content in the database or storage
      const updateResult = await fileService.updateFile(
        req.params.mediaId,
        req.body,
      );
      res.json({ message: 'File updated', result: updateResult });
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Error updating file',
          details: error.message,
        });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Error updating file',
          details: 'Unknown error',
        });
      }
    }
  },
);

// Remove the media and metadata linked to it
svMediaRouter.delete(
  '/:mediaId',
  async (req: Request<VaultParams>, res: Response) => {
    try {
      // Delete the object and its metadata from the database or storage
      await fileService.deleteFile(req.params.mediaId);
      res.json({ message: 'File deleted' });
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Error deleting file',
          details: error.message,
        });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Error deleting file',
          details: 'Unknown error',
        });
      }
    }
  },
);

export default svMediaRouter;
