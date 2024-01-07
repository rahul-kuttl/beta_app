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
export interface IBuyerContact {
    phoneNumber: string;
    address: {
        street: string;
        city: string;
        state: string;
        postal_code: string;
        country?: string;
    };
}
export interface IBuyer {
    name: string;
    contact: IBuyerContact;
    seller: {
        name: string;
        contact: IBuyerContact;
        linkedBusinessId: string;
    };
}
export interface ILineItem {
    product_name: string;
    quantity: number;
    gross_amount: number;
    discount: number;
    taxable_value: number;
    igst: number;
    total: number;
    hsn_sac_code: string;
    hsn_sac_category: {
        section: number;
        chapter: number;
        heading: number;
        description: string;
    };
}
export interface IPayment {
    payment_method: string;
    payment_method_type: string;
    payment_status: string;
    total_paid_tax: number;
    grand_total: number;
}
export interface INewInvoice {
    buyer: IBuyer;
    line_items: {
        list: ILineItem[];
    };
    payment: IPayment;
    invoice_id: string;
}
export interface INewInvoiceDocument extends Document<Types.ObjectId, {}, INewInvoice>, INewInvoice {
}
export interface INewInvoiceModel extends Model<INewInvoiceDocument, {}> {
}
export declare const NewInvoiceModel: INewInvoiceModel;
export default NewInvoiceModel;
//# sourceMappingURL=_invoice_model.d.ts.map