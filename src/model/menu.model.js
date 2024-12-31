import mongoose, { Schema } from "mongoose";

const menuSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
      
    },
    description: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      require: true,
    },
    categoryName: {
      type: String,
      lowercase: true,
      trim: true,
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

export const Menu = mongoose.model("Menu", menuSchema);
