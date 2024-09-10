import mongoose, { Schema, Document } from "mongoose";

interface Showtime extends Document {
  startTime: Date;
}

const ShowtimeSchema: Schema = new Schema(
  {
    startTime: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model<Showtime>("Showtime", ShowtimeSchema);
