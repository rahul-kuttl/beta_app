import { Request, Response } from 'express';
/**
 * Add a new line item.
 */
export declare const addLineItem: (req: Request, res: Response) => Promise<void>;
/**
 * Modify an existing purchase item.
 */
export declare const modifyPurchaseItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Remove a line item.
 */
export declare const removeLineItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get a specific purchase item by ID.
 */
export declare const getPurchaseItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Add multiple line items.
 */
export declare const addLineItems: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Modify multiple purchase items.
 */
export declare const modifyPurchaseItems: (req: Request, res: Response) => Promise<void>;
/**
 * Remove multiple purchase items.
 */
export declare const removePurchaseItems: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get all purchase items.
 */
export declare const getPurchaseItems: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=line_item_controller.d.ts.map