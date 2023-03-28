import { Router } from "express";
import hardQuestionController from "../controllers/hardQuestionController.js";
import checkAuth from "../utils/checkAuth.js";
import checkRole from "../utils/checkRole.js";
import checkAccess from "../utils/checkAccess.js";

const router = new Router();

// GET
router.get("/all", checkAuth, checkRole, hardQuestionController.getAll);
// POST
router.post("/create", checkAuth, checkRole, hardQuestionController.create);
router.post("/save", checkAuth, checkAccess, hardQuestionController.saveAnswer);
// DELETE
router.delete("/delete", checkAuth, checkRole, hardQuestionController.delete);
router.delete("/remove", checkAuth, checkRole, hardQuestionController.removeAnswer);

export default router;
