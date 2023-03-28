import TestQuestionModel from "../models/TestQuestion.js";
import TestResultModel from "../models/TestResult.js";
import OptionModel from "../models/Option.js";
import LessonModel from "../models/Lesson.js";
import ProgressModel from "../models/Progress.js";
import CourseModel from "../models/Course.js";

class testQuestionController {
  // Результаты тестирования
  static async getAll(req, res) {
    try {
      const results = await TestResultModel.find();

      res.json(results);
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось загрузить результаты учеников",
      });
    }
  }

  static async create(req, res) {
    try {
      const questionTitle = req.body.questionTitle;
      const options = req.body.options;
      const lessonId = req.body.lessonId;

      const existedLesson = await LessonModel.find({ _id: lessonId });
      if (existedLesson.length == 0) {
        return res.json({
          message: "Урок не найден",
        });
      }

      const optionDocs = options.map((option) => new OptionModel(option));
      const savedOptions = await Promise.all(optionDocs.map((option) => option.save()));
      const optionIds = savedOptions.map((option) => option._id);

      const doc = new TestQuestionModel({
        questionTitle,
        options: optionIds,
        lessonId,
      });

      const newQuestion = await doc.save();
      const populatedQuestion = await TestQuestionModel.findById(newQuestion._id).populate("options");

      await LessonModel.findByIdAndUpdate(lessonId, { $push: { testQuestions: newQuestion._id } }, { new: true });

      return res.json(populatedQuestion);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось создать вопрос",
      });
    }
  }

  static async delete(req, res) {
    try {
      const questionId = req.body.id;

      const question = await TestQuestionModel.findById(questionId);
      const optionsIds = question.options;

      await OptionModel.deleteMany({ _id: { $in: optionsIds } });
      const removedQuestion = await TestQuestionModel.findByIdAndRemove(questionId);
      await LessonModel.findByIdAndUpdate(
        removedQuestion.lessonId,
        { $pull: { testQuestions: questionId } },
        { new: true }
      );

      return res.status(200).json(removedQuestion);
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось удалить вопрос",
      });
    }
  }

  static async saveResult(req, res) {
    try {
      const lessonId = req.body.lessonId;
      const userId = req.userInfo._id;
      const courseId = req.body.courseId;
      const answers = req.body.answers;

      // Проверяем содержится ли урок в курсе
      const checkCourse = await CourseModel.findById(courseId);
      if (!checkCourse.lessons.includes(lessonId)) {
        return res.status(400).json({
          message: "Невозможно сохранить результат",
        });
      }

      const lesson = await LessonModel.findById(lessonId).populate({
        path: "testQuestions",
        populate: {
          path: "options",
        },
      });

      let questionCounter = 0;
      let rightAnswers = 0;
      lesson.testQuestions.forEach((question) => {
        question.options.forEach((option) => {
          if (option.isCorrect) {
            questionCounter++;
          }
          if (option.isCorrect && answers.includes(option._id.toString())) {
            rightAnswers++;
          }
        });
      });

      const userScore = ((rightAnswers / questionCounter) * 100).toFixed(1);

      // Проверка прогресса ученика по этому курсу
      const existedProgress = await ProgressModel.findOne({ userId, courseId });
      // Проверяем, является ли балл пользователя больше или равным 75
      if (userScore >= 75) {
        // Если пользователь еще не прошел ни одного урока
        if (!existedProgress) {
          const progressDoc = new ProgressModel({
            userId,
            courseId,
          });
          await progressDoc.save();

          // Если пользователь уже начал проходить этот курс
        } else {
          // Проверяем, прошел ли пользователь уже этот урок
          if (!existedProgress.passedLessons.includes(lessonId)) {
            // Обновляем документ с прогрессом, увеличивая значение "accessed" на 1 и добавляя lessonId в массив "passedLessons"
            await ProgressModel.findOneAndUpdate(existedProgress._id, {
              $inc: { accessed: 1 },
              $push: { passedLessons: lessonId },
            });
          }
        }
      }

      // Сохранение результата
      const resultDoc = new TestResultModel({
        userId,
        lessonId,
        rightAnswers,
        questionCounter,
        userScore,
      });

      const userTestResult = await resultDoc.save();

      return res.json(userTestResult);
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось сохранить результат тестирования",
      });
    }
  }

  static async removeResult(req, res) {
    try {
      const resultId = req.body.id;

      const removedResult = await TestResult.findByIdAndRemove(resultId);

      return res.json(removedResult);
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось удалить результат тестирования",
      });
    }
  }
}

export default testQuestionController;
