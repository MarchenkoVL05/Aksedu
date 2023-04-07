import DepartmentModel from "../models/Department.js";
import CourseModel from "../models/Course.js";

class departmentController {
  static async getAll(req, res) {
    try {
      const departments = await DepartmentModel.find();

      return res.json(departments);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось загрузить список отделов",
      });
    }
  }

  static async create(req, res) {
    try {
      const newDepartmentName = req.body.name;

      const existedDepartment = await DepartmentModel.findOne({ name: newDepartmentName });

      if (existedDepartment) {
        return res.status(400).json({
          message: "Такой отдел уже существует",
        });
      }

      const doc = new DepartmentModel({
        name: newDepartmentName,
      });

      const newDepartment = await doc.save();

      return res.json(newDepartment);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось создать отдел",
      });
    }
  }

  static async delete(req, res) {
    try {
      const departmentId = req.body.id;

      const removedDepartment = await DepartmentModel.findByIdAndRemove(departmentId);
      // Удаление курсов, связанных с удаляемым отделом
      await CourseModel.deleteMany({ department: removedDepartment._id });

      return res.json(removedDepartment);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось удалить отдел",
      });
    }
  }
}

export default departmentController;
