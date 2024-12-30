import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
  {
    itemname: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
    },
    itemDescription: {
      type: String,
      lowercase: true,
    },
    itemImage: {
      type: String,
    },
    itemPrice: {
      type: Float,
      require: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

export const Item = mongoose.model("Item", itemSchema);
