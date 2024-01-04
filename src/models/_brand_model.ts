import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the TypeScript interface to match the Brand document structure
export interface IBrand {
  brandId: string;
  banner: string;
  brandName: string;
}

// Extend the interface to include Mongoose document properties

// Utilize Types.ObjectId for the '_id' field for strict typing
export interface IBrandDocument extends Document<Types.ObjectId, {}, IBrand>, IBrand {}

// Create a Mongoose schema for the "Brand" document with TypeScript
const BrandSchema: Schema<IBrandDocument> = new Schema(
  {
    brandId: { type: String, required: true },
    banner: { type: String, required: true },
    brandName: { type: String, required: true },
  },
  { timestamps: true } // Assuming you want to use timestamps as in the user_routes.ts
);

// Create the Mongoose model for the "Brand" collection
const BrandModel = mongoose.model<IBrandDocument>('Brand', BrandSchema);

export default BrandModel;