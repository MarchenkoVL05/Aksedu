import ProgressModel from "../models/Progress.js";

class progressController {
  static async getAll(req, res) {
    try {
      const progressAll = await ProgressModel.find();

      return res.json(progressAll);
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось загрусить прогресс учеников",
      });
    }
  }

  static async delete(req, res) {
    try {
      const progressId = req.body.id;

      const removedProgress = await ProgressModel.findByIdAndRemove(progressId);

      return res.json(removedProgress);
    } catch (error) {
      console.log(error);
      res.json({
        message: "Не удалось загрусить прогресс учеников",
      });
    }
  }
}

export default progressController;
