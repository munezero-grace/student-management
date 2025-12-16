import express from "express";
import { studentRouter } from "./students";
import { userRoute } from "./users";
import { authRoute } from "./auth";
import { attendanceRouter } from "./attendance";

const mainRouter = express.Router();

mainRouter.use(studentRouter);
mainRouter.use(userRoute);
mainRouter.use(authRoute);
mainRouter.use(attendanceRouter);

export { mainRouter };
