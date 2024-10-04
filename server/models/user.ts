import mongoose, { Schema, Document, Model } from "mongoose";

interface userDetails extends Document {
  username: string;
  email: string;
  clerkId: string;
  createdAt: Date;
}

const userSchema: Schema<userDetails> = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  clerkId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel: Model<userDetails> = mongoose.model<userDetails>(
  "User",
  userSchema
);
export default UserModel;
