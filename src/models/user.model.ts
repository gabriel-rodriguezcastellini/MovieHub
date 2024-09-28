import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  name: string;
  lastName: string;
  birthdate: Date;
  email: string;
  isAdmin: boolean;
  firebaseUid: string;
  tickets: string[];
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String },
    lastName: { type: String },
    birthDate: { type: Date },
    email: { type: String, unique: true },
    isAdmin: { type: Boolean, default: false },
    firebaseUid: { type: String },
    tickets: [{ type: Array<mongoose.Schema.Types.ObjectId>, ref: "Ticket" }],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<User>("User", UserSchema);
