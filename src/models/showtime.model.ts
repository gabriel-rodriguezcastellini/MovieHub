import mongoose, { Schema, Document } from "mongoose";

interface Showtime extends Document {
  startTime: Date;
  endTime: Date;
  price: number;
  movieId: string;
  screenId: string;
  tickets: string[];
}

const ShowtimeSchema: Schema = new Schema(
  {
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    price: { type: Number, required: true },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    screenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screen",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Showtime = mongoose.model<Showtime>("Showtime", ShowtimeSchema);
