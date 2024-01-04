import { Request, Response } from 'express';
import { LineItem,ILineItem } from '../models/line_item_model';
import Logger from '../utils/logger'; // Assuming a Logger utility
import mongoose,{Document} from 'mongoose';

// Constants for HTTP status codes
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_BAD_REQUEST = 400;
const HTTP_INTERNAL_SERVER_ERROR = 500;

/**
 * Add a new line item.
 */
export const addLineItem = async (req: Request, res: Response) => {
    try {
        const newLineItem = new LineItem(req.body);
        await newLineItem.save();
        res.status(HTTP_CREATED).json(newLineItem);
    } catch (error) {
        Logger.error('Error adding line item', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while adding the line item.');
    }
};

/**
 * Modify an existing purchase item.
 */
export const modifyPurchaseItem = async (req: Request, res: Response) => {
    try {
        const { itemId } = req.params;

        // Validate the itemId
        if (!mongoose.isValidObjectId(itemId)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid line item ID format');
        }

 // Fetch the current item
 const currentItem = await LineItem.findById(itemId);
 if (!currentItem) {
     return res.status(HTTP_NOT_FOUND).send('Line item not found');
 }

 // Update the item
 const updatedItem = await LineItem.findByIdAndUpdate(itemId, req.body, { new: true });
 if (!updatedItem) {
     return res.status(HTTP_INTERNAL_SERVER_ERROR).send('Error updating the item');
 }

      // Type casting to any to bypass TypeScript's strict type checking
      const current = currentItem.toObject() as any;
      const updated = updatedItem.toObject() as any;

 // Log changes
 Object.keys(req.body).forEach(key => {
     if (JSON.stringify(current[key]) !== JSON.stringify(updated[key])) {
         console.log(`Field updated for item ${itemId}: ${key} from ${current[key]} to ${updated[key]}`);
     }
 });

 res.status(HTTP_OK).json(updatedItem);
} catch (error) {
 Logger.error('Error updating line item', error);
 res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while updating the line item.');
}
};

/**
 * Remove a line item.
 */
export const removeLineItem = async (req: Request, res: Response) => {
    try {
        const { itemId } = req.params;

        // Validate the itemId
        if (!mongoose.isValidObjectId(itemId)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid line item ID format');
        }

        const result = await LineItem.findByIdAndDelete(itemId);
        if (!result) {
            return res.status(HTTP_NOT_FOUND).send('Line item not found');
        }
        res.status(HTTP_OK).send('Line item deleted successfully');
    } catch (error) {
        Logger.error('Error deleting line item', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while deleting the line item.');
    }
};

/**
 * Get a specific purchase item by ID.
 */
export const getPurchaseItem = async (req: Request, res: Response) => {
    try {
        const { itemId } = req.params;

        // Validate the itemId
        if (!mongoose.isValidObjectId(itemId)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid line item ID format');
        }

        const item = await LineItem.findById(itemId);
        if (!item) {
            return res.status(HTTP_NOT_FOUND).send('Line item not found');
        }
        res.status(HTTP_OK).json(item);
    } catch (error) {
        Logger.error('Error fetching line item', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while fetching the line item.');
    }
};

/**
 * Add multiple line items.
 */
export const addLineItems = async (req: Request, res: Response) => {
    try {
        if (!Array.isArray(req.body)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid input: Expected an array of line items');
        }

        // Optional: additional validation or transformation on lineItems

        const newItems = await LineItem.insertMany(req.body);
        
        res.status(HTTP_CREATED).json(newItems);
        console.log("line Items added",newItems)
    } catch (error) {
        Logger.error('Error adding line items', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while adding line items.');
    }
};

/**
 * Modify multiple purchase items.
 */
export const modifyPurchaseItems = async (req: Request, res: Response) => {
    try {
        const updateOps = req.body.lineItems.map((item: ILineItem) => ({
            updateOne: {
                filter: { _id: item._id },
                update: { $set: item }
            }
        }));

        // Fetch current states of line items
        const currentItems = await LineItem.find({
            _id: { $in: req.body.lineItems.map((item: ILineItem) => item._id) }
        });

        // Apply updates and get results
        const result = await LineItem.bulkWrite(updateOps);

        // Fetch updated states of line items
        const updatedItems = await LineItem.find({
            _id: { $in: req.body.lineItems.map((item: ILineItem) => item._id) }
        });

        // Compare before and after states and log changes
        updatedItems.forEach((updatedItem: Document & ILineItem) => {
            const currentItem = currentItems.find((item: Document & ILineItem) => item._id.equals(updatedItem._id));
            if (currentItem) {
                Object.keys(updatedItem.toObject() as ILineItem).forEach(key => {
                    if (JSON.stringify((currentItem as any)[key]) !== JSON.stringify((updatedItem as any)[key])) {
                        console.log(`Field updated for item ${updatedItem._id}: ${key} from ${JSON.stringify((currentItem as any)[key])} to ${JSON.stringify((updatedItem as any)[key])}`);
                    }
                });
            }
        });

        res.status(HTTP_OK).json({
            message: 'Line items updated successfully',
        });
    } catch (error) {
        Logger.error('Batch update error', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while updating line items.');
    }
};


/**
 * Remove multiple purchase items.
 */
export const removePurchaseItems = async (req: Request, res: Response) => {
    try {
        const itemIds = req.body.itemIds;

        // Validate item IDs and check for empty input
        if (!Array.isArray(itemIds) || itemIds.length === 0 || itemIds.some(id => !mongoose.isValidObjectId(id))) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid input: Expected an array of valid item IDs');
        }

        const deleteOps = itemIds.map(id => ({
            deleteOne: {
                filter: { _id: id }
            }
        }));

        const result = await LineItem.bulkWrite(deleteOps);
        Logger.info('Batch delete result:', result); // Detailed logging

        // Providing feedback on the operation result
        res.status(HTTP_OK).json({
            message: 'Line items deleted successfully',
            deletedCount: result.deletedCount
        });
    } catch (error) {
        Logger.error('Batch delete error', error); // Error logging
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while deleting line items.');
    }
};

/**
 * Get all purchase items.
 */
export const getPurchaseItems = async (req: Request, res: Response) => {
    try {
        // Fetch all line items
        const items = await LineItem.find()

        res.status(HTTP_OK).json(items);
    } catch (error) {
        Logger.error('Error fetching line items', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while fetching line items.');
    }
};
