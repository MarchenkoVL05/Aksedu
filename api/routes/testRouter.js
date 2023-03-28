import { Router } from "express";
import testController from "../controllers/testController.js";
import checkAuth from "../utils/checkAuth.js";
import checkRole from "../utils/checkRole.js";
import checkAccess from "../utils/checkAccess.js";

const router = new Router();

// GET
router.get("/all", checkAuth, checkRole, testController.getAll);
// POST
router.post("/create", checkAuth, checkRole, testController.create);
router.post("/save", checkAuth, checkAccess, testController.saveResult);
// DELETE
router.delete("/delete", checkAuth, checkRole, testController.delete);
router.delete("/remove", checkAuth, checkRole, testController.removeResult);

export default router;
