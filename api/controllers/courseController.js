import CourseModel from "../models/Course.js";
import ProgressModel from "../models/Progress.js";
import AssignmentModel from "../models/Assignment.js";
import User from "../models/User.js";

class courseController {
  static async getAll(req, res) {
    try {
      if (req.userInfo.role === "ADMIN") {
        const courses = await CourseModel.find().populate("department");

        return res.json(courses);
      } else if (req.userInfo.role === "USER") {
        const userId = req.userInfo._id;
        // Вытаскиваем назначенные ученику курсы
        const assignments = await AssignmentModel.find({ userId }).populate({
          path: "courses",
          populate: {
            path: "department",
          },
        });
        const courses = assignments[0].courses;

        return res.json(courses);
      }
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось загрузить список курсов",
      });
    }
  }

  static async getOne(req, res) {
    try {
      const courseId = req.params.id;
      const userId = req.userInfo._id;

      const course = await CourseModel.findOne({ _id: courseId }).populate("lessons");
      const progress = await ProgressModel.find({ courseId, userId });

      if (!course) {
        return res.status(404).json({
          message: "Курс не найден",
        });
      }

      if (progress.length == 0) {
        let accessedLessonsCount = 1;
        return res.json({ course, accessedLessonsCount });
      }

      const accessedLessonsCount = progress[0].accessed;

      return res.json({ course, accessedLessonsCount });
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось открыть курс",
      });
    }
  }

  static async create(req, res) {
    try {
      const title = req.body.title;
      const lessons = req.body.lessons;
      const department = req.body.department;

      const doc = new CourseModel({
        title,
        lessons,
        department,
      });

      const newCourse = await doc.save();
      const populatedCourse = await CourseModel.findById(newCourse._id).populate("department");

      return res.json(populatedCourse);
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось создать курс",
      });
    }
  }

  static async delete(req, res) {
    try {
      const courseId = req.body.id;

      const removedCourse = await CourseModel.findByIdAndRemove(courseId);
      // Удаление прогресса учеников по этому курсу
      await ProgressModel.deleteMany({ courseId });
      // Удаление курса из назначенных
      const assignments = await AssignmentModel.find();
      for (let assignment of assignments) {
        assignment.courses = assignment.courses.filter((course) => {
          return course.toString() !== removedCourse._id.toString();
        });
        await assignment.save();
      }

      return res.json(removedCourse);
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось удалить курс",
      });
    }
  }

  static async assign(req, res) {
    try {
      const userId = req.body.userId;
      const courseId = req.body.courseId;

      const user = await User.findById(userId);

      const existedAssignment = await AssignmentModel.findOne({ userId });
      if (existedAssignment.courses.includes(courseId)) {
        return res.status(400).json({
          message: "Курс уже назначен",
        });
      } else {
        const assignment = await AssignmentModel.findOneAndUpdate(
          { userId: user._id },
          {
            $push: {
              courses: courseId,
            },
          },
          {
            new: true,
          }
        );

        const populatedAssignment = await AssignmentModel.findById(assignment._id).populate("userId");
        return res.json(populatedAssignment);
      }
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось назначить курс",
      });
    }
  }

  static async deAssign(req, res) {
    try {
      const userId = req.body.userId;
      const courseId = req.body.courseId;

      const user = await User.findById(userId);
      const assignment = await AssignmentModel.findOneAndUpdate(
        { userId: user._id },
        {
          $pull: {
            courses: courseId,
          },
        },
        {
          new: true,
        }
      );

      const populatedAssignment = await AssignmentModel.findById(assignment._id).populate("userId");
      return res.json(populatedAssignment);
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось снять с назначения",
      });
    }
  }
}

export default courseController;
