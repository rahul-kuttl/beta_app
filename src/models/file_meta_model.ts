import mongoose, { Document, Schema } from 'mongoose';

interface IFileMeta extends Document {
  filename: string;
  url: string;
  size: number;
  lastModified: Date;
  uploadDate: Date; // Include this if you want to store the date of metadata creation
}

const fileMetaSchema = new Schema<IFileMeta>({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  size: { type: Number, required: true },
  lastModified: { type: Date, required: true },
  uploadDate: { type: Date, default: Date.now } // Default to the current date/time
});

export const FileMeta = mongoose.model<IFileMeta>('FileMeta', fileMetaSchema, 'object_meta');
