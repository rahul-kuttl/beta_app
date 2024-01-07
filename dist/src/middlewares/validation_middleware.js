"use strict";
// import { Request, Response, NextFunction } from 'express';
// import Joi, { ObjectSchema, ArraySchema } from 'joi';
// import { purchaseSchema } from '../validators/purchase_validator';
// import { lineItemSchema } from '../validators/line_item_validator';
Object.defineProperty(exports, "__esModule", { value: true });
// // Generalized validation function
// const validate = (schema: Joi.ObjectSchema | ArraySchema) => (req: Request, res: Response, next: NextFunction) => {
//     console.log("Request Body:", req.body);
//     const { error } = schema.validate(req.body);
//     if (error) {
//         return res.status(400).json({ errors: error.details.map(detail => `${detail.path.join('.')} - ${detail.message}`) });
//     }
//     next();
// };
// const itemDetailsJoiSchema = Joi.object({
//     dateOfPurchase: Joi.string().required(),
//     isBookmarked: Joi.boolean().required(),
//     itemTitle: Joi.string().required(),
//     itemStatus: Joi.string().required(),
//     itemInsight: Joi.string().required(),
//     itemImage: Joi.string().required(),
//     brandBanner: Joi.string().required()
// });
// const purchaseItemJoiSchema = Joi.object({
//     itemDetails: itemDetailsJoiSchema.required()
// });
// const purchaseJoiSchema = Joi.array().items(Joi.object({
//     purchaseItems: Joi.array().items(purchaseItemJoiSchema).required()
// }));
// export const validateMultiplePurchases = validate(purchaseJoiSchema);
// export const validateLineItem = validate(lineItemSchema);
// export const validateMultipleLineItems = validate(Joi.array().items(lineItemSchema));
//# sourceMappingURL=validation_middleware.js.map