import mongoose, { Schema, Document } from "mongoose";

interface Screen extends Document {
  name: string;
  location: string;
  capacity: number;
  showtimes: string[];
}

const ScreenSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
    capacity: { type: Number },
    showtimes: [
      { type: Array<mongoose.Schema.Types.ObjectId>, ref: "Showtime" },
    ],
  },
  {
    timestamps: true,
  }
);

export const Screen = mongoose.model<Screen>("Screen", ScreenSchema);
