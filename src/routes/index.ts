import express from "express";
import { studentRouter } from "./students";
import { attendanceRouter } from "./attendance";
import usersRouter from "./users";

const mainRouter = express.Router();

mainRouter.use(studentRouter);
mainRouter.use(attendanceRouter);
mainRouter.use("/users", usersRouter);

export { mainRouter };
