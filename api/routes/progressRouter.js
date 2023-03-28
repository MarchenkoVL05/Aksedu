import Router from "express";
import progressController from "../controllers/progressController.js";
import checkAuth from "../utils/checkAuth.js";
import checkRole from "../utils/checkRole.js";

const router = new Router();

// GET
router.get("/all", checkAuth, checkRole, progressController.getAll);
// DELETE
router.delete("/delete", checkAuth, checkRole, progressController.delete);

export default router;
