import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      lowercase: true,
      required: true,
    },
    phoneNumber: {
      type: Number,
      require: true,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
