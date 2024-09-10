import mongoose, { Schema, Document } from "mongoose";

interface Theater extends Document {
  name: string;
  location: string;
  capacity: number;
}

const TheaterSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
    capacity: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const Theater = mongoose.model<Theater>("Theater", TheaterSchema);
