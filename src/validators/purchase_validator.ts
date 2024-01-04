// import Joi from 'joi';

// // Define reusable components for common validation patterns
// const uriValidation = Joi.string().uri();
// const requiredString = (fieldName: string) => Joi.string().trim().required();

// const itemDetailsSchema = Joi.object({
//     dateOfPurchase: requiredString('dateOfPurchase').isoDate(),
//     isBookmarked: Joi.boolean().required(),
//     itemTitle: requiredString('itemTitle').max(100),
//     itemStatus: requiredString('itemStatus'), // If there are specific valid statuses, use .valid(...)
//     itemInsight: requiredString('itemInsight'),
//     itemImage: uriValidation,
//     brandBanner: uriValidation
// });

// const purchaseItemSchema = Joi.object({
//     itemDetails: itemDetailsSchema.required()
// });

// export const purchaseSchema = Joi.object({
//     purchaseItems: Joi.array().items(purchaseItemSchema).required().min(1)
// });
