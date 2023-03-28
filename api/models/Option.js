import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Option", optionSchema);
