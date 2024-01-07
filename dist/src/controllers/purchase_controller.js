"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePurchaseItem = exports.removePurchaseItem = exports.addPurchase = exports.viewPurchase = exports.updateMultiplePurchaseItems = exports.removeMultiplePurchaseItems = exports.addMultiplePurchases = exports.viewMultiplePurchases = exports.getPresignedUrlForUpload = void 0;
const purchase_model_1 = require("../models/purchase_model");
const logger_1 = __importDefault(require("../utils/logger")); // Assuming a Logger utility
const s3_upload_1 = require("../utils/s3_upload");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config/config"));
// Constants for HTTP status codes
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;
// Allowed file types for upload
const ALLOWED_FILE_TYPES = ['.pdf', '.jpg', '.png']; // Add more as required
const getPresignedUrlForUpload = async (req, res) => {
    try {
        const filename = req.query.filename;
        if (!filename) {
            return res.status(HTTP_BAD_REQUEST).send('Missing filename parameter.');
        }
        const fileType = filename.slice(filename.lastIndexOf('.'));
        if (!ALLOWED_FILE_TYPES.includes(fileType)) {
            return res.status(HTTP_BAD_REQUEST).send(`Invalid file type: only ${ALLOWED_FILE_TYPES.join(', ')} files are allowed.`);
        }
        const fileKey = `${filename}`;
        const presignedUrl = await (0, s3_upload_1.generatePresignedUrl)(config_1.default.minioConfig.bucketName, fileKey);
        res.status(HTTP_OK).json({ presignedUrl, fileKey });
    }
    catch (error) {
        logger_1.default.error('Error generating pre-signed URL:', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while generating the pre-signed URL.');
    }
};
exports.getPresignedUrlForUpload = getPresignedUrlForUpload;
/**
 * Get and return all purchases.
 */
const viewMultiplePurchases = async (req, res) => {
    try {
        // Fetch all purchases with details of each purchase item
        const purchases = await purchase_model_1.Purchase.find({}).populate('purchaseItems.itemDetails');
        res.status(HTTP_OK).json(purchases);
    }
    catch (error) {
        logger_1.default.error('Error fetching purchases', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while fetching purchases.');
    }
};
exports.viewMultiplePurchases = viewMultiplePurchases;
/**
 * Add multiple purchases to the database.
 */
const addMultiplePurchases = async (req, res) => {
    try {
        // Assuming `req.body.purchases` is an array of purchase objects
        if (!Array.isArray(req.body.purchases)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid input format: purchases should be an array.');
        }
        // Additional checks or transformations on the purchases array can be done here
        // Insert the new purchases into the database
        const newPurchases = await purchase_model_1.Purchase.insertMany(req.body.purchases);
        // Log the created purchases
        console.log('Added new purchases:', newPurchases);
        // Respond with the created purchases
        res.status(HTTP_CREATED).json(newPurchases);
    }
    catch (error) {
        logger_1.default.error('Error adding purchases', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while adding purchases.');
    }
};
exports.addMultiplePurchases = addMultiplePurchases;
/**
 * Remove multiple purchase items based on their IDs.
 */
const removeMultiplePurchaseItems = async (req, res) => {
    try {
        const purchaseItemIds = req.body.purchaseItemIds;
        if (!Array.isArray(purchaseItemIds) || purchaseItemIds.some(id => !mongoose_1.default.isValidObjectId(id))) {
            return res.status(400).send('Invalid input: Expected an array of valid IDs');
        }
        // Fetch existing IDs from the database
        const existingIds = await purchase_model_1.Purchase.find({
            '_id': { $in: purchaseItemIds }
        }).select('_id');
        const existingIdSet = new Set(existingIds.map(item => item._id.toString()));
        // Log IDs not found in the database
        purchaseItemIds.forEach(id => {
            if (!existingIdSet.has(id)) {
                console.log(`ID not found: ${id}`);
            }
        });
        // Perform deletion
        const result = await purchase_model_1.Purchase.deleteMany({ '_id': { $in: purchaseItemIds } });
        console.log('Deleted purchase items with IDs:', purchaseItemIds);
        res.status(200).send(`Purchases deleted successfully. Total deleted: ${result.deletedCount}`);
    }
    catch (error) {
        logger_1.default.error('Error deleting purchases', error);
        res.status(500).send('An error occurred while deleting purchases.');
    }
};
exports.removeMultiplePurchaseItems = removeMultiplePurchaseItems;
/**
 * Update multiple purchase items based on their IDs.
 */
const updateMultiplePurchaseItems = async (req, res) => {
    try {
        const updates = req.body.updates;
        if (!Array.isArray(updates) || updates.some(update => !update.id || !mongoose_1.default.isValidObjectId(update.id) || !update.data)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid input: Each update must have a valid id and data');
        }
        const updatePromises = updates.map(update => purchase_model_1.Purchase.findByIdAndUpdate(update.id, update.data, { new: true }).catch(err => err));
        const results = await Promise.allSettled(updatePromises);
        // Log the updates
        results.forEach(result => {
            if (result.status === 'fulfilled' && result.value) {
                console.log('Updated purchase item:', result.value);
            }
        });
        res.status(HTTP_OK).json(results);
    }
    catch (error) {
        logger_1.default.error('Error updating purchases', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while updating purchases.');
    }
};
exports.updateMultiplePurchaseItems = updateMultiplePurchaseItems;
/**
 * Get and return a single purchase by its ID.
 */
const viewPurchase = async (req, res) => {
    try {
        const { purchaseId } = req.params;
        // Validate the purchaseId
        if (!mongoose_1.default.isValidObjectId(purchaseId)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid purchase ID format');
        }
        const purchase = await purchase_model_1.Purchase.findById(purchaseId);
        if (!purchase) {
            return res.status(HTTP_NOT_FOUND).send('Purchase not found');
        }
        res.status(HTTP_OK).json(purchase);
    }
    catch (error) {
        logger_1.default.error('Error fetching purchase', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while fetching the purchase.');
    }
};
exports.viewPurchase = viewPurchase;
/**
 * Add a single new purchase.
 */
const addPurchase = async (req, res) => {
    try {
        const newPurchase = new purchase_model_1.Purchase(req.body);
        const savedPurchase = await newPurchase.save();
        console.log('Added new purchase:', savedPurchase);
        res.status(HTTP_CREATED).json(newPurchase);
    }
    catch (error) {
        logger_1.default.error('Error adding purchase', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while adding the purchase.');
    }
};
exports.addPurchase = addPurchase;
/**
 * Remove a single purchase item by its ID.
 */
const removePurchaseItem = async (req, res) => {
    try {
        const { purchaseId } = req.params;
        // Validate the purchaseId
        if (!mongoose_1.default.isValidObjectId(purchaseId)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid purchase ID format');
        }
        const result = await purchase_model_1.Purchase.findByIdAndDelete(purchaseId);
        if (!result) {
            return res.status(HTTP_NOT_FOUND).send('Purchase not found');
        }
        console.log('Deleted purchase item with ID:', purchaseId);
        res.status(HTTP_OK).send('Purchase deleted successfully');
    }
    catch (error) {
        logger_1.default.error('Error deleting purchase', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while deleting the purchase.');
    }
};
exports.removePurchaseItem = removePurchaseItem;
/**
 * Update a single purchase item by its ID.
 */
const updatePurchaseItem = async (req, res) => {
    try {
        const { purchaseId } = req.params;
        // Validate the purchaseId
        if (!mongoose_1.default.isValidObjectId(purchaseId)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid purchase ID format');
        }
        const updatedPurchase = await purchase_model_1.Purchase.findByIdAndUpdate(purchaseId, req.body, { new: true });
        if (!updatedPurchase) {
            return res.status(HTTP_NOT_FOUND).send('Purchase not found');
        }
        console.log('Updated purchase item with ID:', purchaseId, 'New data:', updatedPurchase);
        res.status(HTTP_OK).json(updatedPurchase);
    }
    catch (error) {
        logger_1.default.error('Error updating purchase', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while updating the purchase.');
    }
};
exports.updatePurchaseItem = updatePurchaseItem;
//# sourceMappingURL=purchase_controller.js.map