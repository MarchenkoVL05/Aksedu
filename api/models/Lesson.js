import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    testQuestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestQuestion",
      },
    ],
    hardQuestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HardQuestion",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Lesson", lessonSchema);
