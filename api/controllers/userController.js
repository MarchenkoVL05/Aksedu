import UserModel from "../models/User.js";
import AssignmentModel from "../models/Assignment.js";
import ProgressModel from "../models/Progress.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class userController {
  static async register(req, res) {
    try {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const password = req.body.password.toString();
      const department = req.body.department;

      const existedUser = await UserModel.find({ firstName, lastName });

      if (existedUser.length !== 0) {
        return res.status(400).json({
          message: "Думаю, вы уже зарегестрировались",
        });
      }

      const salt = await bcrypt.genSalt(7);
      const passwordHash = await bcrypt.hash(password, salt);

      const userDoc = new UserModel({
        firstName,
        lastName,
        password: passwordHash,
        department,
        role: "USER",
        approved: false,
      });

      const newUser = await userDoc.save();

      // Создание модели назначения курсов
      const assignmentDoc = new AssignmentModel({
        userId: newUser._id,
      });
      await assignmentDoc.save();

      // Создание токена
      const token = jwt.sign(
        {
          _id: newUser._id,
          department: newUser.department,
          role: newUser.role,
          approved: newUser.approved,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

      return res.json({
        newUser,
        token,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось зарегестрироваться",
      });
    }
  }

  static async login(req, res) {
    try {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const password = req.body.password.toString();

      const existedUser = await UserModel.findOne({ firstName, lastName });

      if (!existedUser) {
        return res.status(400).json({
          message: "Не удалось авторизоваться",
        });
      }

      const isValidPass = await bcrypt.compare(password, existedUser.password);

      if (!isValidPass) {
        return res.status(400).json({
          message: "Неверный логин или пароль",
        });
      }

      const token = jwt.sign(
        {
          _id: existedUser._id,
          department: existedUser.department,
          role: existedUser.role,
          approved: existedUser.approved,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

      return res.json({
        existedUser,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось авторизоваться",
      });
    }
  }

  static async authMe(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded._id;

      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(400).json({
          message: "Пользователь не найден",
        });
      }

      return res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Нет доступа",
      });
    }
  }

  static async getAll(req, res) {
    try {
      const users = await UserModel.find().populate("department");

      return res.json(users);
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось загрузить список пользователей",
      });
    }
  }

  static async delete(req, res) {
    try {
      const userId = req.body.id;

      const removedUser = await UserModel.findByIdAndRemove(userId);
      await AssignmentModel.deleteMany({ userId });
      await ProgressModel.deleteMany({ userId });

      return res.status(200).json(removedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось удалить пользователя",
      });
    }
  }

  static async changeUserAccess(req, res, accessValue) {
    try {
      const userId = req.body.id;
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        { approved: accessValue },
        { new: true }
      ).populate("department");

      if (!updatedUser) {
        return res.status(404).json({
          message: "Ученик не найден",
        });
      }
      return res.json({
        updatedUser,
        message: accessValue ? "Ученик допусчен к платформе" : "Доступ для ученика закрыт",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Не удалось изменить параметр допуска",
      });
    }
  }

  static async approve(req, res) {
    await userController.changeUserAccess(req, res, true);
  }

  static async block(req, res) {
    await userController.changeUserAccess(req, res, false);
  }

  static async changeUserRole(req, res, newRole) {
    try {
      const userId = req.body.id;
      const updatedUser = await UserModel.findOneAndUpdate({ _id: userId }, { role: newRole }, { new: true }).populate(
        "department"
      );

      if (!updatedUser) {
        return res.status(404).json({
          message: "Ученик не найден",
        });
      }
      return res.json({
        updatedUser,
        message: `Роль ученика изменена на ${newRole}`,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Не удалось изменить роль ученика",
      });
    }
  }

  static async changeRoleToAdmin(req, res) {
    await userController.changeUserRole(req, res, "ADMIN");
  }

  static async changeRoleToUser(req, res) {
    await userController.changeUserRole(req, res, "USER");
  }
}

export default userController;
