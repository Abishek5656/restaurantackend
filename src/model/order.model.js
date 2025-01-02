import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true, 
      unique: true,
    },
    itemname: {
      type: String, 
      lowercase: true,
    },
    itemprice: {
      type: Number, 
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
