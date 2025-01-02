import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    paymentType: {
      type: Number, // 1 - cash, 2 - UPI, 3 - card
      required: true,
    },
    paymentStatus: {
      type: Number,
      default: 1, // 1 - paid, 2 - not paid, 3 - cancelled
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    orderNumber: {
      type: String,
      required: true, 
      unique: true,
    },
    totalBill: {
      type: Number,
      default: 0
    },
    amountPaid: {
      type: Number,
      default: 0
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", paymentSchema);
