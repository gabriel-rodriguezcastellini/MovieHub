import mongoose, { Schema, Document } from "mongoose";

interface Showtime extends Document {
  startTime: Date;
}

const ShowtimeSchema: Schema = new Schema(
  {
    startTime: { type: Date, required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    theater: { type: mongoose.Schema.Types.ObjectId, ref: "Theater" },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model<Showtime>("Showtime", ShowtimeSchema);
