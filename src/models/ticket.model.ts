import mongoose, { Schema, Document } from "mongoose";

interface Ticket extends Document {
  showtimeId: string;
  price: number;
  isPurchased: boolean;
  seatNumber: string;
  userId: string;
}

const TicketSchema: Schema = new Schema(
  {
    showtimeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Showtime",
      required: true,
    },
    price: { type: Number, required: true },
    isPurchased: { type: Boolean, default: false },
    seatNumber: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const Ticket = mongoose.model<Ticket>("Ticket", TicketSchema);
