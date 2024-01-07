import { Request, Response } from 'express';
export declare const getPresignedUrlForUpload: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get and return all purchases.
 */
export declare const viewMultiplePurchases: (req: Request, res: Response) => Promise<void>;
/**
 * Add multiple purchases to the database.
 */
export declare const addMultiplePurchases: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Remove multiple purchase items based on their IDs.
 */
export declare const removeMultiplePurchaseItems: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Update multiple purchase items based on their IDs.
 */
export declare const updateMultiplePurchaseItems: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get and return a single purchase by its ID.
 */
export declare const viewPurchase: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Add a single new purchase.
 */
export declare const addPurchase: (req: Request, res: Response) => Promise<void>;
/**
 * Remove a single purchase item by its ID.
 */
export declare const removePurchaseItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Update a single purchase item by its ID.
 */
export declare const updatePurchaseItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=purchase_controller.d.ts.map