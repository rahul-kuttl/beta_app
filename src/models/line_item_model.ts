import mongoose, { Schema, Document } from 'mongoose';


// Interface for Shipping Status
interface IShippingStatus extends Document {
    status: string;
    date: string;
    detail?: string;
}

// Interface for In-Depth Shipping Details
interface IInDepthShippingDetail extends Document {
    latestStatus: string;
    lastUpdated: string;
    summary: string;
    list: IShippingStatus[];
}

// Interface for Brand Details
interface IBrandDetails extends Document {
    name: string;
    banner: string;
    contactNumber: string;
    customerSupportEmail: string;
    websiteLink: string;
}

// Interface for Line Item
export interface ILineItem extends Document {
    itemId: string; 
    brandBanner: string;
    brandName: string;
    itemBanner: string;
    itemTitle: string;
    status: string;
    orderId: string;
    dateOfPurchase: string;
    trackingId: string;
    warranty?: string;
    logisticPartner: string;
    itemInsight: string;
    inDepthShippingDetail: IInDepthShippingDetail;
    brandDetails: IBrandDetails;
}

// Schema Definitions
const shippingStatusSchema = new Schema<IShippingStatus>({
    status:String,
    date: String,
    detail: String,
});

const inDepthShippingDetailSchema = new Schema<IInDepthShippingDetail>({
    latestStatus: String,
    lastUpdated: String,
    summary: String,
    list: [shippingStatusSchema],
});

const brandDetailsSchema = new Schema<IBrandDetails>({
    name: String,
    banner: String,
    contactNumber: String,
    customerSupportEmail: String,
    websiteLink: String,
});

const lineItemSchema = new Schema<ILineItem>({
    itemId: { type: String, required: true ,unique:true},
    brandBanner: String,
    brandName: String,
    itemBanner: String,
    itemTitle: String,
    status: String,
    orderId: String,
    dateOfPurchase: String,
    trackingId: String,
    warranty: String,
    logisticPartner: String,
    itemInsight: String,
    inDepthShippingDetail: inDepthShippingDetailSchema,
    brandDetails: brandDetailsSchema,
});

export const LineItem = mongoose.model<ILineItem>('LineItem', lineItemSchema,'line_item');
