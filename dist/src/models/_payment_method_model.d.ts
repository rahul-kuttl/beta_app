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
export interface PaymentMethodDetails {
    card_number: string;
    bank_name: string;
}
export interface IPaymentMethod {
    paymentMethod_id: string;
    method: string;
    details: PaymentMethodDetails;
}
export interface IPaymentMethodDocument extends Document<Types.ObjectId, {}, IPaymentMethod>, IPaymentMethod {
}
export interface IPaymentMethodModel extends Model<IPaymentMethodDocument, {}> {
}
export declare const PaymentMethodModel: IPaymentMethodModel;
export default PaymentMethodModel;
//# sourceMappingURL=_payment_method_model.d.ts.map