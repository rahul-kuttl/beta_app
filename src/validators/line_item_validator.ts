// import Joi from 'joi';

// // Reusable URI and required string validators
// const uriValidator = Joi.string().uri().required();
// const requiredString = (fieldName: string, maxLength = 255)=> Joi.string().trim().required().max(maxLength);



// const shippingStatusSchema = Joi.object({
//     status: requiredString('status', 50),
//     date: Joi.string().isoDate().required(),
//     detail: Joi.string().allow(''), 
// });

// const inDepthShippingDetailSchema = Joi.object({
//     latestStatus: requiredString('latestStatus',50),
//     lastUpdated: Joi.string().isoDate().required(),
//     summary: requiredString('summary'),
//     list: Joi.array().items(shippingStatusSchema).required().min(1)
// });

// const brandDetailsSchema = Joi.object({
//     name: requiredString('name'),
//     banner: uriValidator,
//     contactNumber: requiredString('contactNumber', 20),
//     customerSupportEmail: Joi.string().email().required(),
//     websiteLink: uriValidator
// });

// export const lineItemSchema = Joi.object({
//     brandBanner: uriValidator,
//     brandName: requiredString('brandName'),
//     itemBanner: uriValidator,
//     itemTitle: requiredString('itemTitle'),
//     status: requiredString('status', 50),
//     orderId: requiredString('orderId'),
//     dateOfPurchase: Joi.string().isoDate().required(),
//     trackingId: requiredString('trackingId'),
//     warranty: Joi.string().allow(''), // Optional field
//     logisticPartner: requiredString('logisticPartner'),
//     itemInsight: requiredString('itemInsight'),
//     inDepthShippingDetail: inDepthShippingDetailSchema.required(),
//     brandDetails: brandDetailsSchema.required()
// });
