//Notes Section
/*

1. Source of truth for user and its identity need to be fetched from Auth token header details as an id
2.Add health to common entitie metric
3.Snake Case file naming 
4.Using versioning in the URI path, such as http://www.example.com/api/1/products, is a strategy employed by various organizations, including xMatters, Facebook, Twitter, Airbnb, and more. 
 
*/

import { Router, Request, Response } from 'express';
import { DatabaseService } from '../../../services/database_service'; // db-service
import { FileService } from '../../../services/file_service'; // file-service
import { authenticateUser } from '../../../middlewares/user_auth_middleware';
import svMediaRouter from './sv_media_route';
import manageSecureVaultRouter from './manage_sv_route';
import activityLogRouter from './activity_log_route';
import svMetricRouter from './sv_metric_route';

// TypeScript interfaces
interface VaultParams {
  userId: string;
  mediaId?: string;
}

interface SharedAccessBody {
  shareWithUserId: string;
  newPermissions: string;
}

interface UserPreferencesBody {
  preferences: any; // Replace 'any' with more specific type as per your preference schema
}

interface MetricBody {
  // Define the structure of the metric body
}

interface SettingBody {
  // Define the structure of the setting body
}

// Initialize Router and Services
const secureVaultRouter = Router();
const dbService = new DatabaseService(); //database service instantiation
const fileService = new FileService(); //file handling service instantiation

//API Health Check
secureVaultRouter.get('/health', async (req: Request, res: Response) => {
  const isHealthy = await dbService.checkHealth();
  res.json({ healthy: isHealthy });
});

secureVaultRouter.use('/media', svMediaRouter);
secureVaultRouter.use('/activity-log', activityLogRouter);
secureVaultRouter.use('/manage', manageSecureVaultRouter);
secureVaultRouter.use('/metric/', svMetricRouter);

// List Shared Access
secureVaultRouter.get(
  '/shared-access',
  async (req: Request<VaultParams>, res: Response) => {
    // List all entities shared with or by the user
    const sharedItems = await dbService.listSharedAccess(req.params.userId);
    res.json({ sharedItems });
  },
);

// Create Shared Access
secureVaultRouter.post(
  '/share/:mediaId',
  async (req: Request<VaultParams>, res: Response) => {
    try {
      // Share a file or folder with another user
      const shareResult = await dbService.createSharedAccess(
        req.params.userId,
        req.params.mediaId,
        req.body.shareWithUserId,
      );
      res.json({ message: 'Access granted', result: shareResult });
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Error creating shared access',
          details: error.message || 'Unknown error',
        });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({
          message: 'Error creating shared access',
          error: 'Unknown error',
        });
      }
    }
  },
);

// Update Shared Access
secureVaultRouter.put(
  '/share/:mediaId',
  async (req: Request<VaultParams>, res: Response) => {
    try {
      // Update sharing permissions
      const updateResult = await dbService.updateSharedAccess(
        req.params.userId,
        req.params.mediaId,
        req.body.newPermissions,
      );
      res.json({
        message: 'Sharing permissions updated',
        result: updateResult,
      });
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: 'Error fetching metadata', error: error.message });
      } else {
        // Handle the case where the error is not an Error instance
        res
          .status(500)
          .json({ message: 'Error fetching metadata', error: 'Unknown error' });
      }
    }
  },
);

// Revoke Shared Access
secureVaultRouter.delete(
  '/share/:mediaId',
  async (req: Request<VaultParams>, res: Response) => {
    try {
      // Revoke access to a shared file or folder
      const revokeResult = await dbService.revokeSharedAccess(
        req.params.userId,
        req.params.mediaId,
      );
      res.json({ message: 'Access revoked', result: revokeResult });
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Error revoking shared access',
          details: error.message || 'Unknown error',
        });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({
          message: 'Error revoking shared access',
          error: 'Unknown error',
        });
      }
    }
  },
);
// Search Files
secureVaultRouter.get(
  '/media/search',
  async (req: Request<VaultParams>, res: Response) => {
    // Search for files based on metadata, file name, etc.
    const searchResults = await fileService.searchFiles(req.query);
    res.json({ searchResults });
  },
);

// Update User Preferences
secureVaultRouter.put(
  '/preferences',
  async (req: Request<VaultParams>, res: Response) => {
    try {
      // Update user-specific settings or preferences
      const updateResult = await dbService.updateUserPreferences(
        req.params.userId,
        req.body.preferences,
      );
      res.json({ message: 'Preferences updated', result: updateResult });
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Error updating user preferences',
          details: error.message || 'Unknown error',
        });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({
          message: 'Error updating user preferences',
          error: 'Unknown error',
        });
      }
    }
  },
);
// Update user settings
secureVaultRouter.post(
  '/secure-vault/setting',
  async (req: Request<VaultParams>, res: Response) => {
    try {
      // Assuming that req.body contains the settings to be updated
      const updatedSettings = await dbService.updateUserSettings(
        req.params.userId,
        req.body,
      );
      res.json({ message: 'Settings updated', data: updatedSettings });
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Error updating user settings',
          details: error.message || 'Unknown error',
        });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({
          message: 'Error updating user settings',
          error: 'Unknown error',
        });
      }
    }
  },
);

// Retrieve user settings
secureVaultRouter.get(
  '/secure-vault/setting',
  async (req: Request<VaultParams>, res: Response) => {
    try {
      const settings = await dbService.getUserSettings(req.params.userId);
      res.json({ message: 'Settings retrieved', data: settings });
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Error retrieving user settings',
          details: error.message || 'Unknown error',
        });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({
          message: 'Error retrieving user settings',
          error: 'Unknown error',
        });
      }
    }
  },
);

// Update privacy settings
secureVaultRouter.post(
  '/secure-vault/setting/privacy',
  async (req: Request<VaultParams>, res: Response) => {
    try {
      // Assuming that req.body contains the privacy settings to be updated
      const updatedPrivacySettings = await dbService.updatePrivacySettings(
        req.params.userId,
        req.body,
      );
      res.json({
        message: 'Privacy settings updated',
        data: updatedPrivacySettings,
      });
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Error updating privacy settings',
          details: error.message || 'Unknown error',
        });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({
          message: 'Error updating privacy settings',
          error: 'Unknown error',
        });
      }
    }
  },
);
// Post metrics
secureVaultRouter.post(
  '/secure-vault/metric',
  async (req: Request, res: Response) => {
    try {
      // Assuming that req.body contains the metrics to be logged
      await dbService.logMetrics(req.body);
      res.json({ message: 'Metrics logged successfully' });
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Error logging metrics',
          details: error.message || 'Unknown error',
        });
      } else {
        // Handle the case where the error is not an Error instance
        res
          .status(500)
          .json({ message: 'Error logging metrics', error: 'Unknown error' });
      }
    }
  },
);

// Retrieve metrics
secureVaultRouter.get(
  '/secure-vault/metric',
  async (req: Request, res: Response) => {
    try {
      const metrics = await dbService.getMetrics();
      res.json({ message: 'Metrics retrieved', data: metrics });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Error retrieving metrics',
          details: error.message || 'Unknown error',
        });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({
          message: 'Error retrieving metrics',
          error: 'Unknown error',
        });
      }
    }
  },
);

// Retrieve activity log
secureVaultRouter.get(
  '/secure-vault/activity-log',
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

// Retrieve storage information
secureVaultRouter.get(
  '/secure-vault/storage',
  async (req: Request<VaultParams>, res: Response) => {
    try {
      const storageInfo = await dbService.getStorageInfo(req.params.userId);
      res.json({ message: 'Storage information retrieved', data: storageInfo });
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Error retrieving storage information',
          details: error.message || 'Unknown error',
        });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({
          message: 'Error retrieving storage information',
          error: 'Unknown error',
        });
      }
    }
  },
);

export default secureVaultRouter;
