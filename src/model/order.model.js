import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    orderDetails: [
      {
        itemId: {
          type: String,
        },
        itemPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    customerName: {
      type: String,
      lowercase: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    orderBillAmount: {
      type: Number,
      default: 0,
    },
    orderStatus: {
      type: Number,
      default: 1, //1-order   2-cancel
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
