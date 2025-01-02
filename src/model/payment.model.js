import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    paymentType: {
      type: Number, // 1 - cash, 2 - UPI, 3 - card
      required: true,
    },
    paymentStatus: {
      type: Number, // 1- paid, 2 - partical payment , 3 - cancelled, 4.not paid
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
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
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
