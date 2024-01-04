//Notes Section 
/*

1. Source of truth for user and its identity need to be fetched from Auth token header details as an id
2.Add health to common entitie metric
3.Snake Case file naming 
4.Using versioning in the URI path, such as http://www.example.com/api/1/products, is a strategy employed by various organizations, including xMatters, Facebook, Twitter, Airbnb, and more. 
 
*/

import { Router, Request, Response } from 'express';
import { DatabaseService } from '../../services/database_service'; // db-service
import { FileService } from '../../services/file_service'; // file-service
import { authenticate } from '../../middlewares/auth_middleware';

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

// Apply authentication middleware to all routes
secureVaultRouter.use(authenticate);

//API Health Check
secureVaultRouter.get('/v1/users/health', async (req: Request, res: Response) => {
    const isHealthy = await dbService.checkHealth();
    res.json({ healthy: isHealthy });
  });

// Get details of the media (read metadata) and retrieve all files of an User 
secureVaultRouter.get('/v1/users/media/:mediaId', async (req: Request<VaultParams>, res: Response) => {
    const mediaId = req.params.mediaId;

    if (!mediaId) {
      return res.status(400).json({ error: 'Bad Request', message: 'Media ID is required'  });
    }
  
    try {
    // Fetch metadata from the database
    const metadata = await dbService.getMetadata(mediaId);
    res.json({ message: 'Metadata retrieved', data: metadata });
  } catch (error) {
       // Check if the error is an instance of Error
       if (error instanceof Error) {
        res.status(500).json({ error: 'Internal Server Error', message: 'Error fetching metadata', details: error.message });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({ error: 'Internal Server Error', message: 'Error fetching metadata', details: 'Unknown error' });
      }
  }});

// Update the filename or replace the uploaded file
secureVaultRouter.put('/v1/users/media/:mediaId', async (req: Request<VaultParams>, res: Response) => {
  try {
    // Update filename or file content in the database or storage
    const updateResult = await fileService.updateFile(req.params.mediaId, req.body);
    res.json({ message: 'File updated', result: updateResult});
  } catch (error) {
       // Check if the error is an instance of Error
       if (error instanceof Error) {
        res.status(500).json({ error: 'Internal Server Error', message: 'Error updating file', details: error.message });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({ error: 'Internal Server Error', message: 'Error updating file', details: 'Unknown error' });
      }
  }});

// Remove the media and metadata linked to it
secureVaultRouter.delete('/v1/users/media/:mediaId', async (req: Request<VaultParams>, res: Response) => {
  try {
    // Delete the object and its metadata from the database or storage
    await fileService.deleteFile(req.params.mediaId);
    res.json({ message: 'File deleted' });
  } catch (error) {
       // Check if the error is an instance of Error
       if (error instanceof Error) {
        res.status(500).json({ error: 'Internal Server Error', message: 'Error deleting file', details: error.message });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({ error: 'Internal Server Error', message: 'Error deleting file', details: 'Unknown error' });
      }
  }});

// Delete all media for a user
secureVaultRouter.delete('/v1/users/media/all', async (req: Request<VaultParams>, res: Response) => {
    try {
        // Logic to delete all media for the provided user
        // Implement your logic here
        res.json({ success: true, message: 'All media deleted for the user' });
    }catch (error) {
            // Check if the error is an instance of Error
            if (error instanceof Error) {
             res.status(500).json({ message: 'Error deleting all media', error: error.message });
           } else {
             // Handle the case where the error is not an Error instance
             res.status(500).json({ message: 'Error deleting all media', error: 'Unknown error' });
           }
       }});


// Upload a new file to the user's vault :  Generate a pre-signed URL for media upload
secureVaultRouter.post('/v1/users/media/upload', async (req: Request<VaultParams>, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ message: 'File is required' });
      }
    
    try {
      //  Handle file upload
      //  req.file is the uploaded file and req.params.userId identifies the user
      const uploadResult = await fileService.uploadFile(req.params.userId, req.file);
      res.json({ message: 'File uploaded', result: uploadResult }); 
    } catch (error) {
       // Check if the error is an instance of Error
       if (error instanceof Error) {
        res.status(500).json({error: 'Internal Server Error', message: 'Error handling file upload', details: error.message });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({ error: 'Internal Server Error', message: 'Error handling file upload', details: 'Unknown error' });
      }
  }});

// List Shared Access
secureVaultRouter.get('/v1/users/shared-access', async (req: Request<VaultParams>, res: Response) => {
    // List all entities shared with or by the user
    const sharedItems = await dbService.listSharedAccess(req.params.userId);
    res.json({ sharedItems });
  });
  
  // Create Shared Access
  secureVaultRouter.post('/v1/users/share/:mediaId', async (req: Request<VaultParams>, res: Response) => {
    try {
      // Share a file or folder with another user
      const shareResult = await dbService.createSharedAccess(req.params.userId, req.params.mediaId, req.body.shareWithUserId);
      res.json({ message: 'Access granted', result: shareResult });
    } catch (error) {
       // Check if the error is an instance of Error
       if (error instanceof Error) {
        res.status(500).json({error: 'Internal Server Error', message: 'Error creating shared access', details: error.message || 'Unknown error' });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({ message: 'Error creating shared access', error: 'Unknown error'});
      }
  }});
  
  // Update Shared Access
  secureVaultRouter.put('/v1/users/share/:mediaId', async (req: Request<VaultParams>, res: Response) => {
    try {
      // Update sharing permissions
      const updateResult = await dbService.updateSharedAccess(req.params.userId, req.params.mediaId, req.body.newPermissions);
      res.json({ message: 'Sharing permissions updated', result: updateResult });
    } catch (error) {
       // Check if the error is an instance of Error
       if (error instanceof Error) {
        res.status(500).json({ message: 'Error fetching metadata', error: error.message });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({ message: 'Error fetching metadata', error: 'Unknown error' });
      }
  }});
  
  // Revoke Shared Access
  secureVaultRouter.delete('/v1/users/share/:mediaId', async (req: Request<VaultParams>, res: Response) => {
    try {
      // Revoke access to a shared file or folder
      const revokeResult = await dbService.revokeSharedAccess(req.params.userId, req.params.mediaId);
      res.json({ message: 'Access revoked', result: revokeResult });
    } catch (error) {
       // Check if the error is an instance of Error
       if (error instanceof Error) {
        res.status(500).json({ error: 'Internal Server Error', message: 'Error revoking shared access', details: error.message || 'Unknown error' });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({ message: 'Error revoking shared access', error: 'Unknown error' });
      }
  }});  
  // Search Files
  secureVaultRouter.get('/v1/users/media/search', async (req: Request<VaultParams>, res: Response) => {
    // Search for files based on metadata, file name, etc.
    const searchResults = await fileService.searchFiles(req.query);
    res.json({ searchResults });
  });
  
  // Update User Preferences
  secureVaultRouter.put('/v1/users/preferences', async (req: Request<VaultParams>, res: Response) => {
    try {
      // Update user-specific settings or preferences
      const updateResult = await dbService.updateUserPreferences(req.params.userId, req.body.preferences);
      res.json({ message: 'Preferences updated', result: updateResult });
    } catch (error) {
       // Check if the error is an instance of Error
       if (error instanceof Error) {
        res.status(500).json({ error: 'Internal Server Error', message: 'Error updating user preferences', details: error.message || 'Unknown error' });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({ message: 'Error updating user preferences', error: 'Unknown error' });
      }
  }});
  // Update user settings
  secureVaultRouter.post('/secure-vault/v1/users/setting', async (req: Request<VaultParams>, res: Response) => {
    try {
      // Assuming that req.body contains the settings to be updated
      const updatedSettings = await dbService.updateUserSettings(req.params.userId, req.body);
      res.json({ message: 'Settings updated', data: updatedSettings });
    } catch (error) {
       // Check if the error is an instance of Error
       if (error instanceof Error) {
        res.status(500).json({ error: 'Internal Server Error', message: 'Error updating user settings', details: error.message || 'Unknown error'});
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({ message: 'Error updating user settings', error: 'Unknown error' });
      }
  }});

 // Retrieve user settings
secureVaultRouter.get('/secure-vault/v1/users/setting', async (req: Request<VaultParams>, res: Response) => {
    try {
      const settings = await dbService.getUserSettings(req.params.userId);
      res.json({ message: 'Settings retrieved', data: settings });
    } catch (error) {
       // Check if the error is an instance of Error
       if (error instanceof Error) {
        res.status(500).json({ error: 'Internal Server Error', message: 'Error retrieving user settings', details: error.message || 'Unknown error' });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({ message: 'Error retrieving user settings', error: 'Unknown error' });
      }
  }});

// Update privacy settings
secureVaultRouter.post('/secure-vault/v1/users/setting/privacy', async (req: Request<VaultParams>, res: Response) => {
    try {
      // Assuming that req.body contains the privacy settings to be updated
      const updatedPrivacySettings = await dbService.updatePrivacySettings(req.params.userId, req.body);
      res.json({ message: 'Privacy settings updated', data: updatedPrivacySettings });
    } catch (error) {
       // Check if the error is an instance of Error
       if (error instanceof Error) {
        res.status(500).json({ error: 'Internal Server Error', message: 'Error updating privacy settings', details: error.message || 'Unknown error'});
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({ message: 'Error updating privacy settings', error: 'Unknown error' });
      }
  }});
// Post metrics
secureVaultRouter.post('/secure-vault/v1/users/metric', async (req: Request, res: Response) => {
    try {
      // Assuming that req.body contains the metrics to be logged
      await dbService.logMetrics(req.body);
      res.json({ message: 'Metrics logged successfully' });
    } catch (error) {
       // Check if the error is an instance of Error
       if (error instanceof Error) {
        res.status(500).json({ error: 'Internal Server Error', message: 'Error logging metrics', details: error.message || 'Unknown error' });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({ message: 'Error logging metrics', error: 'Unknown error' });
      }
  }});

// Retrieve metrics
secureVaultRouter.get('/secure-vault/v1/users/metric', async (req: Request, res: Response) => {
    try {
      const metrics = await dbService.getMetrics();
      res.json({ message: 'Metrics retrieved', data: metrics });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: 'Internal Server Error', message: 'Error retrieving metrics', details: error.message || 'Unknown error' });
          } else {
            // Handle the case where the error is not an Error instance
            res.status(500).json({ message: 'Error retrieving metrics', error: 'Unknown error' });
          }
      }});

// Retrieve activity log
secureVaultRouter.get('/secure-vault/v1/users/activity-log', async (req: Request<VaultParams>, res: Response) => {
    try {
      const activityLog = await dbService.getActivityLog(req.params.userId);
      res.json({ message: 'Activity log retrieved', data: activityLog });
    } catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({error: 'Internal Server Error', message: 'Error retrieving activity log', details: error.message || 'Unknown error' });
          } else {
            // Handle the case where the error is not an Error instance
            res.status(500).json({ message: 'Error retrieving activity log', error: 'Unknown error' });
          }
      }});

// Retrieve storage information
secureVaultRouter.get('/secure-vault/v1/users/storage', async (req: Request<VaultParams>, res: Response) => {
    try {
      const storageInfo = await dbService.getStorageInfo(req.params.userId);
      res.json({ message: 'Storage information retrieved', data: storageInfo });
    } catch (error) {
       // Check if the error is an instance of Error
       if (error instanceof Error) {
        res.status(500).json({  error: 'Internal Server Error', message: 'Error retrieving storage information', details: error.message || 'Unknown error' });
      } else {
        // Handle the case where the error is not an Error instance
        res.status(500).json({ message: 'Error retrieving storage information', error: 'Unknown error' });
      }
  }});

export default secureVaultRouter;