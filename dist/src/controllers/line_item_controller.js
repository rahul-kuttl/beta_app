"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPurchaseItems = exports.removePurchaseItems = exports.modifyPurchaseItems = exports.addLineItems = exports.getPurchaseItem = exports.removeLineItem = exports.modifyPurchaseItem = exports.addLineItem = void 0;
const line_item_model_1 = require("../models/line_item_model");
const logger_1 = __importDefault(require("../utils/logger")); // Assuming a Logger utility
const mongoose_1 = __importDefault(require("mongoose"));
// Constants for HTTP status codes
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_BAD_REQUEST = 400;
const HTTP_INTERNAL_SERVER_ERROR = 500;
/**
 * Add a new line item.
 */
const addLineItem = async (req, res) => {
    try {
        const newLineItem = new line_item_model_1.LineItem(req.body);
        await newLineItem.save();
        res.status(HTTP_CREATED).json(newLineItem);
    }
    catch (error) {
        logger_1.default.error('Error adding line item', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while adding the line item.');
    }
};
exports.addLineItem = addLineItem;
/**
 * Modify an existing purchase item.
 */
const modifyPurchaseItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        // Validate the itemId
        if (!mongoose_1.default.isValidObjectId(itemId)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid line item ID format');
        }
        // Fetch the current item
        const currentItem = await line_item_model_1.LineItem.findById(itemId);
        if (!currentItem) {
            return res.status(HTTP_NOT_FOUND).send('Line item not found');
        }
        // Update the item
        const updatedItem = await line_item_model_1.LineItem.findByIdAndUpdate(itemId, req.body, { new: true });
        if (!updatedItem) {
            return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Error updating the item');
        }
        // Type casting to any to bypass TypeScript's strict type checking
        const current = currentItem.toObject();
        const updated = updatedItem.toObject();
        // Log changes
        Object.keys(req.body).forEach(key => {
            if (JSON.stringify(current[key]) !== JSON.stringify(updated[key])) {
                console.log(`Field updated for item ${itemId}: ${key} from ${current[key]} to ${updated[key]}`);
            }
        });
        res.status(HTTP_OK).json(updatedItem);
    }
    catch (error) {
        logger_1.default.error('Error updating line item', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while updating the line item.');
    }
};
exports.modifyPurchaseItem = modifyPurchaseItem;
/**
 * Remove a line item.
 */
const removeLineItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        // Validate the itemId
        if (!mongoose_1.default.isValidObjectId(itemId)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid line item ID format');
        }
        const result = await line_item_model_1.LineItem.findByIdAndDelete(itemId);
        if (!result) {
            return res.status(HTTP_NOT_FOUND).send('Line item not found');
        }
        res.status(HTTP_OK).send('Line item deleted successfully');
    }
    catch (error) {
        logger_1.default.error('Error deleting line item', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while deleting the line item.');
    }
};
exports.removeLineItem = removeLineItem;
/**
 * Get a specific purchase item by ID.
 */
const getPurchaseItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        // Validate the itemId
        if (!mongoose_1.default.isValidObjectId(itemId)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid line item ID format');
        }
        const item = await line_item_model_1.LineItem.findById(itemId);
        if (!item) {
            return res.status(HTTP_NOT_FOUND).send('Line item not found');
        }
        res.status(HTTP_OK).json(item);
    }
    catch (error) {
        logger_1.default.error('Error fetching line item', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while fetching the line item.');
    }
};
exports.getPurchaseItem = getPurchaseItem;
/**
 * Add multiple line items.
 */
const addLineItems = async (req, res) => {
    try {
        if (!Array.isArray(req.body)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid input: Expected an array of line items');
        }
        // Optional: additional validation or transformation on lineItems
        const newItems = await line_item_model_1.LineItem.insertMany(req.body);
        res.status(HTTP_CREATED).json(newItems);
        console.log("line Items added", newItems);
    }
    catch (error) {
        logger_1.default.error('Error adding line items', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while adding line items.');
    }
};
exports.addLineItems = addLineItems;
/**
 * Modify multiple purchase items.
 */
const modifyPurchaseItems = async (req, res) => {
    try {
        const updateOps = req.body.lineItems.map((item) => ({
            updateOne: {
                filter: { _id: item._id },
                update: { $set: item }
            }
        }));
        // Fetch current states of line items
        const currentItems = await line_item_model_1.LineItem.find({
            _id: { $in: req.body.lineItems.map((item) => item._id) }
        });
        // Apply updates and get results
        const result = await line_item_model_1.LineItem.bulkWrite(updateOps);
        // Fetch updated states of line items
        const updatedItems = await line_item_model_1.LineItem.find({
            _id: { $in: req.body.lineItems.map((item) => item._id) }
        });
        // Compare before and after states and log changes
        updatedItems.forEach((updatedItem) => {
            const currentItem = currentItems.find((item) => item._id.equals(updatedItem._id));
            if (currentItem) {
                Object.keys(updatedItem.toObject()).forEach(key => {
                    if (JSON.stringify(currentItem[key]) !== JSON.stringify(updatedItem[key])) {
                        console.log(`Field updated for item ${updatedItem._id}: ${key} from ${JSON.stringify(currentItem[key])} to ${JSON.stringify(updatedItem[key])}`);
                    }
                });
            }
        });
        res.status(HTTP_OK).json({
            message: 'Line items updated successfully',
        });
    }
    catch (error) {
        logger_1.default.error('Batch update error', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while updating line items.');
    }
};
exports.modifyPurchaseItems = modifyPurchaseItems;
/**
 * Remove multiple purchase items.
 */
const removePurchaseItems = async (req, res) => {
    try {
        const itemIds = req.body.itemIds;
        // Validate item IDs and check for empty input
        if (!Array.isArray(itemIds) || itemIds.length === 0 || itemIds.some(id => !mongoose_1.default.isValidObjectId(id))) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid input: Expected an array of valid item IDs');
        }
        const deleteOps = itemIds.map(id => ({
            deleteOne: {
                filter: { _id: id }
            }
        }));
        const result = await line_item_model_1.LineItem.bulkWrite(deleteOps);
        logger_1.default.info('Batch delete result:', result); // Detailed logging
        // Providing feedback on the operation result
        res.status(HTTP_OK).json({
            message: 'Line items deleted successfully',
            deletedCount: result.deletedCount
        });
    }
    catch (error) {
        logger_1.default.error('Batch delete error', error); // Error logging
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while deleting line items.');
    }
};
exports.removePurchaseItems = removePurchaseItems;
/**
 * Get all purchase items.
 */
const getPurchaseItems = async (req, res) => {
    try {
        // Fetch all line items
        const items = await line_item_model_1.LineItem.find();
        res.status(HTTP_OK).json(items);
    }
    catch (error) {
        logger_1.default.error('Error fetching line items', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while fetching line items.');
    }
};
exports.getPurchaseItems = getPurchaseItems;
//# sourceMappingURL=line_item_controller.js.map