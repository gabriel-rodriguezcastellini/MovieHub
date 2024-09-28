import mongoose, { Schema, Document } from "mongoose";

interface Movie extends Document {
  title: string;
  description: string;
  genre: string;
  director: string;
  releaseDate: Date;
  duration: number;
  rating: string;
  showtimes: string[];
}

const MovieSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    genre: { Type: String },
    director: { Type: String },
    releaseDate: { Type: Date },
    duration: { Type: Number },
    rating: { Type: String },
    // showtimes: [
    //   { type: Array<mongoose.Schema.Types.ObjectId>, ref: "Showtime" },
    // ],
  },
  {
    timestamps: true,
  }
);

export const Movie = mongoose.model<Movie>("Movie", MovieSchema);
