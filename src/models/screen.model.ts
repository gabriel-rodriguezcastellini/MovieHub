import mongoose, { Schema, Document } from "mongoose";

interface Screen extends Document {
  name: string;
  location: string;
  capacity: number;
  showtimes: object[];
}

const ScreenSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
    capacity: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const Screen = mongoose.model<Screen>("Screen", ScreenSchema);
