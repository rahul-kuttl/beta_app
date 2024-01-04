import mongoose, { Schema, Document, Model, Types } from 'mongoose';

//card: widget holding metadata related to purchase 
export interface ICardData { 
  id: string;
  name: string;
  status: string;
  banner: string;
  summary: string;
  amount: string;
  brand: {
    name: string;
    banner: string;
  };
  placed_at: string;
}

export interface ICardDocument extends Document {
  data: ICardData[];
}

const cardDataSchema = new Schema<ICardDocument>({
  data: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    banner: { type: String, required: true },
    summary: { type: String, required: true },
    amount: { type: String, required: true },
    brand: {
      name: { type: String, required: true },
      banner: { type: String, required: true },
    },
    placed_at: { type: String, required: true }
  }]
});

export const CardDataModel: Model<ICardDocument> = mongoose.model<ICardDocument>('CardData', cardDataSchema);

export const findItemById = async (itemId: string) => {
  try {
    const item = await CardDataModel.findOne({ 'data.id': itemId }).exec();
    return item;
  } catch (error) {
    console.error('Error while finding the item by id:', error);
    throw error;
  }
};
