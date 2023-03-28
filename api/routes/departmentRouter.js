import { Router } from "express";
import departmentController from "../controllers/departmentController.js";
import checkAuth from "../utils/checkAuth.js";
import checkRole from "../utils/checkRole.js";

const router = new Router();

// GET
router.get("/all", departmentController.getAll);
// POST
router.post("/create", checkAuth, checkRole, departmentController.create);
// DELETE
router.delete("/delete", checkAuth, checkRole, departmentController.delete);

export default router;
