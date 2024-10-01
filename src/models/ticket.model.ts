import mongoose, { Schema, Document } from "mongoose";

interface Ticket extends Document {
  showtimeId: string;
  userId: string;
  seatNumber: string;
}

const TicketSchema: Schema = new Schema(
  {
    showtimeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Showtime",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seatNumber: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Ticket = mongoose.model<Ticket>("Ticket", TicketSchema);
