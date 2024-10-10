import mongoose, { Schema, Document, Model } from "mongoose";

interface UserDetails extends Document {
  username: string;
  email: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  dateOfBirth?: Date;
  dateOfAnniversary?: Date;
  imageUrl: string;
  createdAt: Date;
}

const userSchema: Schema<UserDetails> = new mongoose.Schema({
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
  firstName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  dateOfAnniversary: {
    type: Date,
  },
  address: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel: Model<UserDetails> = mongoose.model<UserDetails>(
  "User",
  userSchema
);
export default UserModel;
