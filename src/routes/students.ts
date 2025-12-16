import express, { Router } from "express";
import { StudentController } from "../controllers/studentController";

const studentRouter: Router = express.Router();

studentRouter.post("/students", StudentController.createStudent);
studentRouter.get("/students", StudentController.getAllStudents);
studentRouter.get("/students/:studentId", StudentController.getStudent);

export { studentRouter };
