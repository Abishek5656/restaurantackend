import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      index: { unique: true, collation: { locale: "en", strength: 2 } },
    },
    phonenumber: {
      type: String,
      required: true,
      unique: true
    },
    phonenumber2: {
      type: String,
    },
    address: {
      type: String,
      lowercase: true,
      default: "",
    },
    pendingBalance: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

export const Customer = mongoose.model("Customer", customerSchema);
