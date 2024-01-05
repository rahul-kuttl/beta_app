import express, { Request, Response } from 'express';
import { DatabaseService } from '../../../services/database_service';

// TypeScript interfaces
interface VaultParams {
  userId: string;
  mediaId?: string;
}
const dbService = new DatabaseService(); //database service instantiation
const activityLogRouter = express.Router();
// Get details of the media (read metadata) and retrieve all files of an User
activityLogRouter.get(
  '/global',
  async (req: Request<VaultParams>, res: Response) => {
    try {
      const activityLog = await dbService.getActivityLog(req.params.userId);
      res.json({ message: 'Activity log retrieved', data: activityLog });
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Error retrieving activity log',
          details: error.message || 'Unknown error',
        });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({
          message: 'Error retrieving activity log',
          error: 'Unknown error',
        });
      }
    }
  },
);

// Create activity log route shouldn't be here as it is read only for user.
// they can only clear up (via manage) not edit or add themshelves.

export default activityLogRouter;
