import express, { Router } from "express";
import { StudentController } from "../controllers/studentController";
import { Type, validationMiddleware } from "../middleware";
import { studentSchema } from "../validations/student.validation";
const studentRouter: Router = express.Router();

studentRouter.post(
  "/students",
  validationMiddleware({ schema: studentSchema, type: Type.BODY }),
  StudentController.createStudent
);
studentRouter.get("/students", StudentController.getAllStudents);
studentRouter.get("/students/:studentId", StudentController.getStudent);

export { studentRouter };
