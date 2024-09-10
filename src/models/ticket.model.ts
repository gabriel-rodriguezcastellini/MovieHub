import mongoose, { Schema, Document } from "mongoose";

interface Ticket extends Document {
  price: number;
  isPurchased: boolean;
}

const TicketSchema: Schema = new Schema(
  {
    price: { type: Number, required: true },
    isPurchased: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Ticket = mongoose.model<Ticket>("Ticket", TicketSchema);
