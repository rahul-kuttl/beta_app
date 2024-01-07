import { Request, Response } from 'express';
import { Purchase } from '../models/purchase_model';
import Logger from '../utils/logger'; // Assuming a Logger utility
import { generatePresignedUrl } from '../utils/s3_upload';
import mongoose from 'mongoose';
import config from '../config/config';
import { v4 as uuidv4 } from 'uuid';

// Constants for HTTP status codes
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;

// Allowed file types for upload
const ALLOWED_FILE_TYPES = ['.pdf', '.jpg', '.png']; // Add more as required

export const getPresignedUrlForUpload = async (req: Request, res: Response) => {
    try {
        const filename = req.query.filename as string;

        if (!filename) {
            return res.status(HTTP_BAD_REQUEST).send('Missing filename parameter.');
        }

        const fileType = filename.slice(filename.lastIndexOf('.'));
        if (!ALLOWED_FILE_TYPES.includes(fileType)) {
            return res.status(HTTP_BAD_REQUEST).send(`Invalid file type: only ${ALLOWED_FILE_TYPES.join(', ')} files are allowed.`);
        }

        const fileKey = `${filename}`;
        const presignedUrl = await generatePresignedUrl(config.minioConfig.bucketName, fileKey,);

        res.status(HTTP_OK).json({ presignedUrl, fileKey });
    } catch (error) {
        Logger.error('Error generating pre-signed URL:', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while generating the pre-signed URL.');
    }
};

/**
 * Get and return all purchases.
 */
export const viewMultiplePurchases = async (req: Request, res: Response) => {
    try {
        // Fetch all purchases with details of each purchase item
        const purchases = await Purchase.find({}).populate('purchaseItems.itemDetails');
        res.status(HTTP_OK).json(purchases);
    } catch (error) {
        Logger.error('Error fetching purchases', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while fetching purchases.');
    }
};

/**
 * Add multiple purchases to the database.
 */
export const addMultiplePurchases = async (req: Request, res: Response) => {
    try {
        // Assuming `req.body.purchases` is an array of purchase objects
        if (!Array.isArray(req.body.purchases)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid input format: purchases should be an array.');
        }

        // Additional checks or transformations on the purchases array can be done here

        for (const purchase of req.body.purchases) {
            const validationError = new Purchase(purchase).validateSync();
            if (validationError) {
                return res.status(HTTP_BAD_REQUEST).send(validationError.message);
            }
        }

        // Insert the new purchases into the database
        const newPurchases = await Purchase.insertMany(req.body.purchases);

        // Log the created purchases
        console.log('Added new purchases:', newPurchases);

        // Respond with the created purchases
        res.status(HTTP_CREATED).json(newPurchases);
    } catch (error) {
        Logger.error('Error adding purchases', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while adding purchases.');
    }
};


/**
 * Remove multiple purchase items based on their IDs.
 */
export const removeMultiplePurchaseItems = async (req: Request, res: Response) => {
    try {
        const purchaseItemIds = req.body.purchaseItemIds;

        if (!Array.isArray(purchaseItemIds) || purchaseItemIds.some(id => !mongoose.isValidObjectId(id))) {
            return res.status(400).send('Invalid input: Expected an array of valid IDs');
        }

        // Fetch existing IDs from the database
        const existingIds = await Purchase.find({
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
        const result = await Purchase.deleteMany({ '_id': { $in: purchaseItemIds } });
        
        console.log('Deleted purchase items with IDs:', purchaseItemIds);

        res.status(200).send(`Purchases deleted successfully. Total deleted: ${result.deletedCount}`);
    } catch (error) {
        Logger.error('Error deleting purchases', error);
        res.status(500).send('An error occurred while deleting purchases.');
    }
};

/**
 * Update multiple purchase items based on their IDs.
 */
export const updateMultiplePurchaseItems = async (req: Request, res: Response) => {
    try {
        const updates = req.body.updates;
        if (!Array.isArray(updates) || updates.some(update => !update.id || !mongoose.isValidObjectId(update.id) || !update.data)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid input: Each update must have a valid id and data');
        }

        
        // Check for attempts to modify purchaseItemId
        for (const update of updates) {
            // Assuming purchaseItemId is directly under update.data
            if (update.data.purchaseItemId) {
                return res.status(HTTP_BAD_REQUEST).send('Modification of Purchase Item ID is not allowed.');
            }
        }

                // // Fetch current states of purchase items
                // const currentItems = await Purchase.find({
                //     _id: { $in: updates.map(update => update.id) }
                // });
        
                // // Check for forbidden updates
                // for (const update of updates) {
                //     const currentItem = currentItems.find(item => item._id.toString() === update.id);
                //     if (currentItem && update.data.purchaseItemId && update.data.purchaseItemId !== currentItem.purchaseItemId) {
                //         return res.status(HTTP_BAD_REQUEST).send(`Modification of Purchase Item ID for ${update.id} is not allowed.`);
                //     }
                // }

        const updatePromises = updates.map(update =>
            Purchase.findByIdAndUpdate(update.id, update.data, { new: true }).catch(err => err)
        );

        const results = await Promise.allSettled(updatePromises);
            
        // Log the updates
             results.forEach(result => {
                if (result.status === 'fulfilled' && result.value) {
                    console.log('Updated purchase item:', result.value);
                }
            });
    

        res.status(HTTP_OK).json(results);

       
    } catch (error) {
        Logger.error('Error updating purchases', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while updating purchases.');
    }
};




/**
 * Get and return a single purchase by its ID.
 */
export const viewPurchase = async (req: Request, res: Response) => {
    try {
        const { purchaseId } = req.params;

        // Validate the purchaseId
        if (!mongoose.isValidObjectId(purchaseId)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid purchase ID format');
        }

        const purchase = await Purchase.findById(purchaseId);
        if (!purchase) {
            return res.status(HTTP_NOT_FOUND).send('Purchase not found');
        }
        res.status(HTTP_OK).json(purchase);
    } catch (error) {
        Logger.error('Error fetching purchase', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while fetching the purchase.');
    }
};


/**
 * Add a single new purchase.
 */
export const addPurchase = async (req: Request, res: Response) => {
    try {
        const newPurchase = new Purchase(req.body);
        const validationError = newPurchase.validateSync();

        if (validationError) {
            return res.status(HTTP_BAD_REQUEST).send(validationError.message);
        }

        for (const purchaseItem of newPurchase.purchaseItems) {
            const existsInPurchases = await Purchase.findOne({ 'purchaseItems.itemDetails.purchaseItemId': purchaseItem.itemDetails.purchaseItemId });
            if (existsInPurchases) {
                return res.status(HTTP_BAD_REQUEST).send(`Purchase Item ID ${purchaseItem.itemDetails.purchaseItemId} already exists.`);
            }
        }

        await newPurchase.save();
        console.log('Added new purchase:', newPurchase);
        res.status(HTTP_CREATED).json(newPurchase);
    } catch (error) {
        Logger.error('Error adding purchase', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while adding the purchase.');
    }
};

/**
 * Remove a single purchase item by its ID.
 */
export const removePurchaseItem = async (req: Request, res: Response) => {
    try {
        const { purchaseId } = req.params;

        // Validate the purchaseId
        if (!mongoose.isValidObjectId(purchaseId)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid purchase ID format');
        }

        const result = await Purchase.findByIdAndDelete(purchaseId);


        if (!result) {
           
            return res.status(HTTP_NOT_FOUND).send('Purchase not found');
        }
        console.log('Deleted purchase item with ID:', purchaseId);

        res.status(HTTP_OK).send('Purchase deleted successfully');
    } catch (error) {
        Logger.error('Error deleting purchase', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while deleting the purchase.');
    }
};

/**
 * Update a single purchase item by its ID.
 */
export const updatePurchaseItem = async (req: Request, res: Response) => {
    try {
        const { purchaseId } = req.params;

        // Validate the purchaseId
        if (!mongoose.isValidObjectId(purchaseId)) {
            return res.status(HTTP_BAD_REQUEST).send('Invalid purchase ID format');
        }
          // Prevent updating purchaseItemId
    if (req.body.purchaseItems && req.body.purchaseItems.some((item: { itemDetails: { purchaseItemId: any; }; }) => item.itemDetails && item.itemDetails.purchaseItemId)) {
        return res.status(HTTP_BAD_REQUEST).send('Modification of Purchase Item ID is not allowed.');
    }

        const updatedPurchase = await Purchase.findByIdAndUpdate(purchaseId, req.body, { new: true });
        if (!updatedPurchase) {
            return res.status(HTTP_NOT_FOUND).send('Purchase not found');
        }
        console.log('Updated purchase item with ID:', purchaseId, 'New data:', updatedPurchase);
        res.status(HTTP_OK).json(updatedPurchase);
    } catch (error) {
        Logger.error('Error updating purchase', error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).send('An error occurred while updating the purchase.');
    }
};
