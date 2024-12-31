import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      unique: true,
      required: true, 
    },
    phonenumber: {
      type: Number,
      required: true, 
    },
    phonenumber2: {
      type: Number,
    },
    address: {
      type: String,
      lowercase: true,
      default: ""
    },
    remainingBalance: {
      type: Number,
      default:0
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Customer = mongoose.model("Customer", customerSchema);
