import HardQuestionModel from "../models/HardQuestion.js";
import HardQuestionAnswerModel from "../models/HardQuestionAnswer.js";
import LessonModel from "../models/Lesson.js";

// HQ - Hard Question
class hardQuestionController {
  static async getAll(req, res) {
    try {
      const hqAnswers = await HardQuestionAnswerModel.find();

      res.json(hqAnswers);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось загрузить ответы учеников",
      });
    }
  }

  static async create(req, res) {
    try {
      const title = req.body.title;
      const lessonId = req.body.lessonId;

      const existedLesson = await LessonModel.findOne({ _id: lessonId });
      if (existedLesson.length == 0) {
        return res.json({
          message: "Урок не найден",
        });
      }

      // Пока что так, дабы не заморачиваться с несколькими формами на странице урока
      if (existedLesson.hardQuestions.length !== 0) {
        return res.json({
          message: "Вопрос уже создан",
        });
      }

      const doc = new HardQuestionModel({
        title,
        lessonId,
      });

      const newHQ = await doc.save();
      await LessonModel.findByIdAndUpdate(lessonId, { $push: { hardQuestions: newHQ._id } }, { new: true });

      return res.json(newHQ);
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось создать сложный вопрос",
      });
    }
  }

  static async delete(req, res) {
    try {
      const hqId = req.body.id;

      const removedHq = await HardQuestionModel.findByIdAndRemove(hqId);

      await LessonModel.findByIdAndUpdate(
        removedHq.lessonId,
        { $pull: { hardQuestions: removedHq._id } },
        { new: true }
      );

      await HardQuestionAnswerModel.deleteMany({ hardQuestionId: hqId });

      return res.json(removedHq);
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось удалить сложный вопрос",
      });
    }
  }

  static async saveAnswer(req, res) {
    try {
      const value = req.body.value;
      const hardQuestionId = req.body.hardQuestionId;
      const lessonId = req.body.lessonId;
      const userId = req.userInfo._id;

      const doc = new HardQuestionAnswerModel({
        value,
        hardQuestionId,
        lessonId,
        userId,
      });

      const savedHQAnswer = await doc.save();

      return res.json(savedHQAnswer);
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось сохранить ответ",
      });
    }
  }

  static async removeAnswer(req, res) {
    try {
      const hqId = req.body.id;

      const removedHqAnswer = await HardQuestionAnswerModel.findByIdAndRemove(hqId);

      return res.json(removedHqAnswer);
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось удалить ответ",
      });
    }
  }
}

export default hardQuestionController;
