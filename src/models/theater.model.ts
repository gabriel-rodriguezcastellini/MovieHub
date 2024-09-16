import mongoose, { Schema, Document } from "mongoose";

interface Theater extends Document {
  name: string;
  location: string;
  capacity: number;
  showtimes: string[];
}

const TheaterSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
    capacity: { type: Number },
    showtimes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Showtime" }],
  },
  {
    timestamps: true,
  }
);

export const Theater = mongoose.model<Theater>("Theater", TheaterSchema);
