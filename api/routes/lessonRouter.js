import Router from "express";
import lessonController from "../controllers/lessonController.js";
import checkAuth from "../utils/checkAuth.js";
import checkRole from "../utils/checkRole.js";
import checkAccess from "../utils/checkAccess.js";
import upload from "../utils/storage.js";

const router = new Router();

// GET
router.get("/all", checkAuth, checkRole, lessonController.getAll);
router.get("/:id", checkAuth, checkAccess, lessonController.getOne);
// POST
router.post("/create", upload.single("videoUrl"), checkAuth, checkRole, lessonController.create);
// DELETE
router.delete("/delete", checkAuth, checkRole, lessonController.delete);

export default router;
