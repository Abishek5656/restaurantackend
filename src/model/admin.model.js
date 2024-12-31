import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      trim:true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
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
      default:""
    },
  },
  {
    timestamps: true,
  }
);

export const Admin = mongoose.model("Admin", adminSchema);
