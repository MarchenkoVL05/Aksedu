import mongoose from "mongoose";

const hardQuestionAnswerSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    hardQuestionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HardQuestion",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

export default mongoose.model("HardQuestionAnswer", hardQuestionAnswerSchema);
