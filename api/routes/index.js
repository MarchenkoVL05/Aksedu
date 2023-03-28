import { Router } from "express";

import departmentRouter from "./departmentRouter.js";
import userRouter from "./userRouter.js";
import lessonRouter from "./lessonRouter.js";
import courseRouter from "./courseRouter.js";
import testRouter from "./testRouter.js";
import hardQuestionRouter from "./hardQuestionRouter.js";
import progressRouter from "./progressRouter.js";

const router = new Router();

router.use("/department", departmentRouter);
router.use("/user", userRouter);
router.use("/lesson", lessonRouter);
router.use("/course", courseRouter);
router.use("/testQuestion", testRouter);
router.use("/hardQuestion", hardQuestionRouter);
router.use("/progress", progressRouter);

export default router;
