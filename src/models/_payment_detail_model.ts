import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// Define the structure of a payment record document with TypeScript interfaces
export interface IPaymentRecord {
  paymentRecordId: string;
  paymentStatus: string | null;
  amountDue: number | null;
  type: string;
  timestamp: string;
  currency: string;
  amount: number | null;
  status: string | null;
  details: any | null; // Change 'any' to a more specific type if needed
}

// Extend the payment record document interface to include Mongoose document properties and the special '_id' field
export interface IPaymentRecordDocument extends Document<Types.ObjectId, {}, IPaymentRecord>, IPaymentRecord {}

// Create a Mongoose schema for the payment record document with TypeScript
const PaymentRecordSchema: Schema<IPaymentRecordDocument> = new Schema({
  paymentRecordId: { type: String, required: true },
  paymentStatus: { type: String, default: null },
  amountDue: { type: Number, default: null },
  type: { type: String, required: true },
  timestamp: { type: String, required: true },
  currency: { type: String, required: true },
  amount: { type: Number, default: null },
  status: { type: String, default: null },
  details: { type: Schema.Types.Mixed, default: null }, // Using Schema.Types.Mixed for 'any' type
}, { timestamps: true });

// Create an index for 'paymentRecordId' with a unique constraint
PaymentRecordSchema.index({ paymentRecordId: 1 }, { unique: true });

// Define the Mongoose model for the payment record document
export interface IPaymentRecordModel extends Model<IPaymentRecordDocument, {}> {}

export const PaymentRecordModel = mongoose.model<IPaymentRecordDocument, IPaymentRecordModel>('PaymentRecord', PaymentRecordSchema);

export default PaymentRecordModel;
