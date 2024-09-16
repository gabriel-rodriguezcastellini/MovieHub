import mongoose, { Schema, Document } from "mongoose";

interface Ticket extends Document {
  showtime: string;
  price: number;
  isPurchased: boolean;
  user: string;
}

const TicketSchema: Schema = new Schema(
  {
    showtime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Showtime",
      required: true,
    },
    price: { type: Number, required: true },
    isPurchased: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const Ticket = mongoose.model<Ticket>("Ticket", TicketSchema);
