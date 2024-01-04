import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// Define the structure of an order status document with TypeScript interfaces
export interface IOrderStatus {
  orderStatusId: string;
  orderPlaced: string;
  orderStatus: string;
  deliveryDate: string;
  purchaseId: string;
  date: Date | null;
  status: string | null;
}

// Extend the order status document interface to include Mongoose document properties and the special '_id' field
export interface IOrderStatusDocument extends Document<Types.ObjectId, {}, IOrderStatus>, IOrderStatus {}

// Create a Mongoose schema for the order status document with TypeScript
const OrderStatusSchema: Schema<IOrderStatusDocument> = new Schema(
  {
    orderStatusId: { type: String, required: true },
    orderPlaced: String,
    orderStatus: String,
    deliveryDate: String,
    purchaseId: String,
    date: { type: Date, default: null },
    status: { type: String, default: null },
  },
  { timestamps: true }, // Enable timestamps for 'createdAt' and 'updatedAt' fields
);

// Create an index for 'orderStatusId' with a unique constraint
OrderStatusSchema.index({ orderStatusId: 1 }, { unique: true });

// Define the Mongoose model for the order status document with TypeScript
export interface IOrderStatusModel extends Model<IOrderStatusDocument, {}> {}

export const OrderStatusModel = mongoose.model<IOrderStatusDocument, IOrderStatusModel>(
  'OrderStatus',
  OrderStatusSchema,
);

export default OrderStatusModel;
