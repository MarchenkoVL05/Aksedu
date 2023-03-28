import mongoose from "mongoose";

const hardQuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("HardQuestion", hardQuestionSchema);
