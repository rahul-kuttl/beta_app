import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// Define the structure of a payment method details document with TypeScript interfaces
export interface PaymentMethodDetails {
  card_number: string;
  bank_name: string;
}

// Define the structure of a payment method document
export interface IPaymentMethod {
  paymentMethod_id: string;
  method: string;
  details: PaymentMethodDetails;
}

// Extend the interface to include Mongoose document properties
export interface IPaymentMethodDocument extends Document<Types.ObjectId, {}, IPaymentMethod>, IPaymentMethod {}

// Create a Mongoose schema for the payment method document
const PaymentMethodSchema: Schema<IPaymentMethodDocument> = new Schema({
  paymentMethod_id: { type: String, required: true },
  method: { type: String, required: true },
  details: {
    card_number: { type: String, required: true },
    bank_name: { type: String, required: true },
  },
}, { timestamps: true }); // Enable timestamps for 'createdAt' and 'updatedAt' fields

// Create an index for 'paymentMethod_id' with a unique constraint
PaymentMethodSchema.index({ paymentMethod_id: 1 }, { unique: true });

// Define the Mongoose model for the payment method document
export interface IPaymentMethodModel extends Model<IPaymentMethodDocument, {}> {}

export const PaymentMethodModel = mongoose.model<IPaymentMethodDocument, IPaymentMethodModel>('PaymentMethod', PaymentMethodSchema);

export default PaymentMethodModel;
