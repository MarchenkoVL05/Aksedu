import LessonModel from "../models/Lesson.js";
import TestQuestionModel from "../models/TestQuestion.js";
import TestResultModel from "../models/TestResult.js";
import OptionModel from "../models/Option.js";
import HardQuestionModel from "../models/HardQuestion.js";
import HardQuestionAnswerModel from "../models/HardQuestionAnswer.js";
import CourseModel from "../models/Course.js";
import ProgressModel from "../models/Progress.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class lessonController {
  static async getAll(req, res) {
    try {
      const lessons = await LessonModel.find();

      return res.json(lessons);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось загрузить список уроков",
      });
    }
  }

  static async getOne(req, res) {
    try {
      const lessonId = req.params.id;
      const lesson = await LessonModel.findOne({ _id: lessonId })
        .populate({
          path: "testQuestions",
          populate: {
            path: "options",
          },
        })
        .populate("hardQuestions");

      if (!lesson) {
        return res.status(404).json({
          message: "Урок не найден",
        });
      }

      return res.json(lesson);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось загрузить урок",
      });
    }
  }

  static async create(req, res) {
    try {
      const title = req.body.title;
      const content = req.body.content;
      const videoUrl = "/uploads/" + req.file.filename;

      const doc = new LessonModel({
        title,
        content,
        videoUrl,
      });

      const newLesson = await doc.save();

      return res.json(newLesson);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось создать урок",
      });
    }
  }

  static async delete(req, res) {
    try {
      const lessonId = req.body.id;
      const removedLesson = await LessonModel.findByIdAndRemove({ _id: lessonId });

      // Удаление видео
      const videoPath = path.join(__dirname, "..", removedLesson.videoUrl);
      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath);
      }

      // Поиск и удаление всех вопросов и ответов на них, связанных с этим уроком
      const questions = await TestQuestionModel.find({ lessonId });
      for (let question of questions) {
        await OptionModel.deleteMany({ _id: { $in: question.options } });
      }
      await TestQuestionModel.deleteMany({ lessonId });
      await HardQuestionModel.deleteMany({ lessonId });
      await HardQuestionAnswerModel.deleteMany({ lessonId });
      await TestResultModel.deleteMany({ lessonId });

      // При удалении урока - обнулять прогресс всех учеников за курсы в которых содержится этот урок
      // И удалять сам урок из всех этих курсов
      const courses = await CourseModel.find();
      const coursesIncludesLessonIds = [];
      for (let course of courses) {
        if (course.lessons.includes(lessonId)) {
          coursesIncludesLessonIds.push(course._id);
          course.lessons = course.lessons.filter((id) => {
            return id.toString() !== lessonId.toString();
          });
          await course.save();
        }
      }

      for (let courseId of coursesIncludesLessonIds) {
        await ProgressModel.deleteMany({ courseId });
      }

      return res.json(removedLesson);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось удалить урок",
      });
    }
  }
}

export default lessonController;
