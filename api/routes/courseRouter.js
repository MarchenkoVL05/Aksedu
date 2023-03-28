import { Router } from "express";
import courseController from "../controllers/courseController.js";
import checkAuth from "../utils/checkAuth.js";
import checkRole from "../utils/checkRole.js";
import checkAccess from "../utils/checkAccess.js";

const router = new Router();

// GET
router.get("/all", checkAuth, checkAccess, courseController.getAll);
router.get("/:id", checkAuth, checkAccess, courseController.getOne);
// POST
router.post("/create", checkAuth, checkRole, courseController.create);
router.post("/assign", checkAuth, checkRole, courseController.assign);
router.post("/deAssign", checkAuth, checkRole, courseController.deAssign);
// DELETE
router.delete("/delete", checkAuth, checkRole, courseController.delete);

export default router;
