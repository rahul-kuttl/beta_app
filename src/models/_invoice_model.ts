import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// Define the structure of a Invoice document with TypeScript interfaces
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
  line_items: { list: ILineItem[] };
  payment: IPayment;
  invoice_id: string;
}

// Extend the interface to include Mongoose document properties
export interface INewInvoiceDocument extends Document<Types.ObjectId, {}, INewInvoice>, INewInvoice {}

// Create a Mongoose schema for the new Invoice document with TypeScript
const NewInvoiceSchema: Schema<INewInvoiceDocument> = new Schema(
  {
    buyer: {
        name: { type: String, required: true },
        contact: {
          phoneNumber: String,
          address: {
            street: String,
            city: String,
            state: String,
            postal_code: String,
            country: String,
          },
        },
        seller: {
          name: { type: String, required: true },
          contact: {
            phoneNumber: String,
            address: {
              street: String,
              city: String,
              state: String,
              postal_code: String,
              country: String,
            },
          },
          linkedBusinessId: String,
        },
      },
      line_items: {
        list: [
          {
            product_name: { type: String, required: true },
            quantity: { type: Number, required: true },
            gross_amount: { type: Number, required: true },
            discount: { type: Number, required: true },
            taxable_value: { type: Number, required: true },
            igst: { type: Number, required: true },
            total: { type: Number, required: true },
            hsn_sac_code: { type: String, required: true },
            hsn_sac_category: {
              section: { type: Number, required: true },
              chapter: { type: Number, required: true },
              heading: { type: Number, required: true },
              description: { type: String, required: true },
            },
          },
        ],
      },
      payment: {
        payment_method: { type: String, required: true },
        payment_method_type: { type: String, required: true },
        payment_status: { type: String, required: true },
        total_paid_tax: { type: Number, required: true },
        grand_total: { type: Number, required: true },
      },
      invoice_id: { type: String, required: true },
  },
  { timestamps: true },
);

// Create the Mongoose model for the new Invoice document with TypeScript
export interface INewInvoiceModel extends Model<INewInvoiceDocument, {}> {}

export const NewInvoiceModel = mongoose.model<INewInvoiceDocument, INewInvoiceModel>('NewInvoice', NewInvoiceSchema);

export default NewInvoiceModel;
