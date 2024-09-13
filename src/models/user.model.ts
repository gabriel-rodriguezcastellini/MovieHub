import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  username: string;
  email: string;
  passwordHash: string;
  registeredAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<User>("User", UserSchema);
