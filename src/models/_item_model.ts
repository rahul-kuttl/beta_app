import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// Define the structure of a line item with TypeScript interfaces
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

// Define the structure of a purchase line item document
export interface IPurchaseLineItem {
  purchaseLineItem_id: string;
  line_items: LineItem[];
}

// Extend the interface to include Mongoose document properties
export interface IPurchaseLineItemDocument extends Document<Types.ObjectId, {}, IPurchaseLineItem>, IPurchaseLineItem {}

// Create a Mongoose schema for the purchase line item document
const PurchaseLineItemSchema: Schema<IPurchaseLineItemDocument> = new Schema({
  purchaseLineItem_id: { type: String, required: true },
  line_items: [{
    sr_no: { type: Number, required: true },
    description: { type: String, required: true },
    unit_of_measure: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit_price: { type: Number, required: true },
    amount: { type: Number, required: true },
    discount: { type: Number, required: true },
    net_assessable_value: { type: Number, required: true },
    SAC: { type: String, default: null },
    period: { type: String, default: null },
    charges: { type: String, default: null },
  }],
}, { timestamps: true });

// Create an index for 'purchaseLineItem_id' with a unique constraint
PurchaseLineItemSchema.index({ purchaseLineItem_id: 1 }, { unique: true });

// Define the Mongoose model for the purchase line item document
export interface IPurchaseLineItemModel extends Model<IPurchaseLineItemDocument, {}> {}

export const PurchaseLineItemModel = mongoose.model<IPurchaseLineItemDocument, IPurchaseLineItemModel>('PurchaseLineItem', PurchaseLineItemSchema);

export default PurchaseLineItemModel;
