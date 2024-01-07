import mongoose, { Schema, Document } from 'mongoose';

// Interface for Item Details
interface IItemDetails extends Document {
    purchaseItemId: string;  // Added field for unique purchase item identifier
    itemStatusColor: string;
    dateOfPurchase: string;
    isBookmarked: boolean;
    itemTitle: string;
    itemStatus: string;
    itemInsight: string;
    itemImage: string;
    brandBanner: string;
}

// Interface for Purchase Item
interface IPurchaseItem extends Document {
    itemDetails: IItemDetails;
}

// Interface for Purchase
interface IPurchase extends Document {
    purchaseItems: IPurchaseItem[];
}

// Schema for Item Details
const itemDetailsSchema = new Schema<IItemDetails>({
    purchaseItemId:String,
    dateOfPurchase: String,
    isBookmarked: Boolean,
    itemTitle: String,
    itemStatus: String,
    itemStatusColor:String,
    itemInsight: String,
    itemImage: String,
    brandBanner: String
});

// Schema for Purchase Item
const purchaseItemSchema = new Schema<IPurchaseItem>({
    itemDetails: itemDetailsSchema
});

// Schema for Purchase
const purchaseSchema = new Schema<IPurchase>({
    purchaseItems: [purchaseItemSchema]
});

export const Purchase = mongoose.model<IPurchase>('Purchase', purchaseSchema,'purchase');// The third parameter ('purchase') here specifies the name of the MongoDB collection to which this model corresponds.
