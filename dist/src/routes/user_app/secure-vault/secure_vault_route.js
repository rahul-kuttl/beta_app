"use strict";
//Notes Section
/*

1. Source of truth for user and its identity need to be fetched from Auth token header details as an id
2.Add health to common entitie metric
3.Snake Case file naming
4.Using versioning in the URI path, such as http://www.example.com/api/1/products, is a strategy employed by various organizations, including xMatters, Facebook, Twitter, Airbnb, and more.
 
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_service_1 = require("../../../services/database_service"); // db-service
const file_service_1 = require("../../../services/file_service"); // file-service
const sv_media_route_1 = __importDefault(require("./sv_media_route"));
const manage_sv_route_1 = __importDefault(require("./manage_sv_route"));
const activity_log_route_1 = __importDefault(require("./activity_log_route"));
const sv_metric_route_1 = __importDefault(require("./sv_metric_route"));
// Initialize Router and Services
const secureVaultRouter = (0, express_1.Router)();
const dbService = new database_service_1.DatabaseService(); //database service instantiation
const fileService = new file_service_1.FileService(); //file handling service instantiation
//API Health Check
secureVaultRouter.get('/health', async (req, res) => {
    const isHealthy = await dbService.checkHealth();
    res.json({ healthy: isHealthy });
});
secureVaultRouter.use('/media', sv_media_route_1.default);
secureVaultRouter.use('/activity-log', activity_log_route_1.default);
secureVaultRouter.use('/manage', manage_sv_route_1.default);
secureVaultRouter.use('/metric/', sv_metric_route_1.default);
// List Shared Access
secureVaultRouter.get('/shared-access', async (req, res) => {
    // List all entities shared with or by the user
    const sharedItems = await dbService.listSharedAccess(req.params.userId);
    res.json({ sharedItems });
});
// Create Shared Access
secureVaultRouter.post('/share/:mediaId', async (req, res) => {
    try {
        // Share a file or folder with another user
        const shareResult = await dbService.createSharedAccess(req.params.userId, req.params.mediaId, req.body.shareWithUserId);
        res.json({ message: 'Access granted', result: shareResult });
    }
    catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error creating shared access',
                details: error.message || 'Unknown error',
            });
        }
        else {
            // Handle the case where the error is not an Error instance
            res.status(500).json({
                message: 'Error creating shared access',
                error: 'Unknown error',
            });
        }
    }
});
// Update Shared Access
secureVaultRouter.put('/share/:mediaId', async (req, res) => {
    try {
        // Update sharing permissions
        const updateResult = await dbService.updateSharedAccess(req.params.userId, req.params.mediaId, req.body.newPermissions);
        res.json({
            message: 'Sharing permissions updated',
            result: updateResult,
        });
    }
    catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            res
                .status(500)
                .json({ message: 'Error fetching metadata', error: error.message });
        }
        else {
            // Handle the case where the error is not an Error instance
            res
                .status(500)
                .json({ message: 'Error fetching metadata', error: 'Unknown error' });
        }
    }
});
// Revoke Shared Access
secureVaultRouter.delete('/share/:mediaId', async (req, res) => {
    try {
        // Revoke access to a shared file or folder
        const revokeResult = await dbService.revokeSharedAccess(req.params.userId, req.params.mediaId);
        res.json({ message: 'Access revoked', result: revokeResult });
    }
    catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error revoking shared access',
                details: error.message || 'Unknown error',
            });
        }
        else {
            // Handle the case where the error is not an Error instance
            res.status(500).json({
                message: 'Error revoking shared access',
                error: 'Unknown error',
            });
        }
    }
});
// Search Files
secureVaultRouter.get('/media/search', async (req, res) => {
    // Search for files based on metadata, file name, etc.
    const searchResults = await fileService.searchFiles(req.query);
    res.json({ searchResults });
});
// Update User Preferences
secureVaultRouter.put('/preferences', async (req, res) => {
    try {
        // Update user-specific settings or preferences
        const updateResult = await dbService.updateUserPreferences(req.params.userId, req.body.preferences);
        res.json({ message: 'Preferences updated', result: updateResult });
    }
    catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error updating user preferences',
                details: error.message || 'Unknown error',
            });
        }
        else {
            // Handle the case where the error is not an Error instance
            res.status(500).json({
                message: 'Error updating user preferences',
                error: 'Unknown error',
            });
        }
    }
});
// Update user settings
secureVaultRouter.post('/secure-vault/setting', async (req, res) => {
    try {
        // Assuming that req.body contains the settings to be updated
        const updatedSettings = await dbService.updateUserSettings(req.params.userId, req.body);
        res.json({ message: 'Settings updated', data: updatedSettings });
    }
    catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error updating user settings',
                details: error.message || 'Unknown error',
            });
        }
        else {
            // Handle the case where the error is not an Error instance
            res.status(500).json({
                message: 'Error updating user settings',
                error: 'Unknown error',
            });
        }
    }
});
// Retrieve user settings
secureVaultRouter.get('/secure-vault/setting', async (req, res) => {
    try {
        const settings = await dbService.getUserSettings(req.params.userId);
        res.json({ message: 'Settings retrieved', data: settings });
    }
    catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error retrieving user settings',
                details: error.message || 'Unknown error',
            });
        }
        else {
            // Handle the case where the error is not an Error instance
            res.status(500).json({
                message: 'Error retrieving user settings',
                error: 'Unknown error',
            });
        }
    }
});
// Update privacy settings
secureVaultRouter.post('/secure-vault/setting/privacy', async (req, res) => {
    try {
        // Assuming that req.body contains the privacy settings to be updated
        const updatedPrivacySettings = await dbService.updatePrivacySettings(req.params.userId, req.body);
        res.json({
            message: 'Privacy settings updated',
            data: updatedPrivacySettings,
        });
    }
    catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error updating privacy settings',
                details: error.message || 'Unknown error',
            });
        }
        else {
            // Handle the case where the error is not an Error instance
            res.status(500).json({
                message: 'Error updating privacy settings',
                error: 'Unknown error',
            });
        }
    }
});
// Post metrics
secureVaultRouter.post('/secure-vault/metric', async (req, res) => {
    try {
        // Assuming that req.body contains the metrics to be logged
        await dbService.logMetrics(req.body);
        res.json({ message: 'Metrics logged successfully' });
    }
    catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error logging metrics',
                details: error.message || 'Unknown error',
            });
        }
        else {
            // Handle the case where the error is not an Error instance
            res
                .status(500)
                .json({ message: 'Error logging metrics', error: 'Unknown error' });
        }
    }
});
// Retrieve metrics
secureVaultRouter.get('/secure-vault/metric', async (req, res) => {
    try {
        const metrics = await dbService.getMetrics();
        res.json({ message: 'Metrics retrieved', data: metrics });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error retrieving metrics',
                details: error.message || 'Unknown error',
            });
        }
        else {
            // Handle the case where the error is not an Error instance
            res.status(500).json({
                message: 'Error retrieving metrics',
                error: 'Unknown error',
            });
        }
    }
});
// Retrieve activity log
secureVaultRouter.get('/secure-vault/activity-log', async (req, res) => {
    try {
        const activityLog = await dbService.getActivityLog(req.params.userId);
        res.json({ message: 'Activity log retrieved', data: activityLog });
    }
    catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error retrieving activity log',
                details: error.message || 'Unknown error',
            });
        }
        else {
            // Handle the case where the error is not an Error instance
            res.status(500).json({
                message: 'Error retrieving activity log',
                error: 'Unknown error',
            });
        }
    }
});
// Retrieve storage information
secureVaultRouter.get('/secure-vault/storage', async (req, res) => {
    try {
        const storageInfo = await dbService.getStorageInfo(req.params.userId);
        res.json({ message: 'Storage information retrieved', data: storageInfo });
    }
    catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: 'Error retrieving storage information',
                details: error.message || 'Unknown error',
            });
        }
        else {
            // Handle the case where the error is not an Error instance
            res.status(500).json({
                message: 'Error retrieving storage information',
                error: 'Unknown error',
            });
        }
    }
});
exports.default = secureVaultRouter;
//# sourceMappingURL=secure_vault_route.js.map