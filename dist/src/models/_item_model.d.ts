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
import { Document, Model, Types } from 'mongoose';
export interface LineItem {
    sr_no: number;
    description: string;
    unit_of_measure: string;
    quantity: number;
    unit_price: number;
    amount: number;
    discount: number;
    net_assessable_value: number;
    SAC: string | null;
    period: string | null;
    charges: string | null;
}
export interface IPurchaseLineItem {
    purchaseLineItem_id: string;
    line_items: LineItem[];
}
export interface IPurchaseLineItemDocument extends Document<Types.ObjectId, {}, IPurchaseLineItem>, IPurchaseLineItem {
}
export interface IPurchaseLineItemModel extends Model<IPurchaseLineItemDocument, {}> {
}
export declare const PurchaseLineItemModel: IPurchaseLineItemModel;
export default PurchaseLineItemModel;
//# sourceMappingURL=_item_model.d.ts.map