import express, { Router } from "express";
import { createStudent, getAllStudents, getStudent } from "../controllers";

const studentRouter: Router = express.Router();

studentRouter.post("/students", createStudent);

studentRouter.get("/students", getAllStudents);
studentRouter.get("/students/:studentId", getStudent);

export { studentRouter };