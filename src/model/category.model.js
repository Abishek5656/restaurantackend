import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      index: { unique: true, collation: { locale: "en", strength: 2 } },
    },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category", categorySchema);
