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
export interface IPaymentRecord {
    paymentRecordId: string;
    paymentStatus: string | null;
    amountDue: number | null;
    type: string;
    timestamp: string;
    currency: string;
    amount: number | null;
    status: string | null;
    details: any | null;
}
export interface IPaymentRecordDocument extends Document<Types.ObjectId, {}, IPaymentRecord>, IPaymentRecord {
}
export interface IPaymentRecordModel extends Model<IPaymentRecordDocument, {}> {
}
export declare const PaymentRecordModel: IPaymentRecordModel;
export default PaymentRecordModel;
//# sourceMappingURL=_payment_detail_model.d.ts.map