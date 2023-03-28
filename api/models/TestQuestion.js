import mongoose from "mongoose";

const testQuestionSchema = new mongoose.Schema(
  {
    questionTitle: {
      type: String,
      required: true,
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Option",
      },
    ],
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TestQuestion", testQuestionSchema);
