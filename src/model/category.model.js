import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category", categorySchema);
