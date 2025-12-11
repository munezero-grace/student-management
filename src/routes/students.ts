import express, { Router } from "express";
import { StudentController } from "../controllers/studentController";
import { validate } from "../middleware/validation";
import { studentSchema } from "../validations/student.validation";

const studentRouter: Router = express.Router();

studentRouter.post(
  "/students",
  validate(studentSchema, "body"),
  StudentController.createStudent
);

studentRouter.get("/students", StudentController.getAllStudents);
studentRouter.get("/students/:studentId", StudentController.getStudent);

export { studentRouter };
