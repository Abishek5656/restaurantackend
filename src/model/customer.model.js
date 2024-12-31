import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      index: true,
    },
    phonenumber: {
      type: String,
      required: true,
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
    orderDetails: [
      {
        orderId: {
          type: Schema.Types.ObjectId,
          ref: "Order",
        },
        amount: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
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
