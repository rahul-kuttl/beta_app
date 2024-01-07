/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import mongoose, { Document } from 'mongoose';
interface IShippingStatus extends Document {
    status: string;
    date: string;
    detail?: string;
}
interface IInDepthShippingDetail extends Document {
    latestStatus: string;
    lastUpdated: string;
    summary: string;
    list: IShippingStatus[];
}
interface IBrandDetails extends Document {
    name: string;
    banner: string;
    contactNumber: string;
    customerSupportEmail: string;
    websiteLink: string;
}
export interface ILineItem extends Document {
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
export declare const LineItem: mongoose.Model<ILineItem, {}, {}, {}, mongoose.Document<unknown, {}, ILineItem> & ILineItem & {
    _id: mongoose.Types.ObjectId;
}, any>;
export {};
//# sourceMappingURL=line_item_model.d.ts.map