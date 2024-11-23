import mongoose, { Schema, Document } from "mongoose";

interface Movie extends Document {
  title: string;
  description: string;
  genre: string;
  director: string;
  releaseDate: Date;
  duration: number;
  rating: string;
  imageUrl: string;
  showtimes: object[];
  isVisible: boolean;
}

const MovieSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    genre: { type: String },
    director: { type: String },
    releaseDate: { type: Date },
    duration: { type: Number },
    rating: { type: String },
    imageUrl: { type: String },
    isVisible: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Movie = mongoose.model<Movie>("Movie", MovieSchema);
