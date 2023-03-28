import { Router } from "express";
import userController from "../controllers/userController.js";
import checkAuth from "../utils/checkAuth.js";
import checkRole from "../utils/checkRole.js";

const router = new Router();

// GET
router.get("/all", checkAuth, checkRole, userController.getAll);
router.get("/me", userController.authMe);
// POST
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/approve", checkAuth, checkRole, userController.approve);
router.post("/block", checkAuth, checkRole, userController.block);
router.post("/changeRoleToAdmin", checkAuth, checkRole, userController.changeRoleToAdmin);
router.post("/changeRoleToUser", checkAuth, checkRole, userController.changeRoleToUser);
// DELETE
router.delete("/delete", checkAuth, checkRole, userController.delete);

export default router;
