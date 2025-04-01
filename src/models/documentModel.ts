import mongoose, { Document as MongooseDocument, Schema } from "mongoose";

interface IPlaceholder {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IPlaceholders {
  namePlaceholder?: IPlaceholder;
  signPlaceholder?: IPlaceholder;
}

export interface IDocument extends MongooseDocument {
  pdfUrl: string;
  placeholders?: IPlaceholders;
  name?: string;
  signatureUrl?: string;
  createdAt: Date;
}

const DocumentSchema: Schema = new Schema(
  {
    pdfUrl: { type: String, required: true },
    placeholders: {
      namePlaceholder: {
        x: Number,
        y: Number,
        width: Number,
        height: Number,
      },
      signPlaceholder: {
        x: Number,
        y: Number,
        width: Number,
        height: Number,
      },
    },
    name: { type: String },
    signatureUrl: { type: String },
  },
  { timestamps: true }
);

const Document = mongoose.model<IDocument>("Document", DocumentSchema);

export default Document;
