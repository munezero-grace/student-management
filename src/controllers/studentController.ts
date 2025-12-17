import { Request, Response } from "express";
import { CreateStudentsRequest, GetStudentIdParamsReq } from "../types";
import { StudentService } from "../services/students.service";
import {
  HTTP_BAD_REQUEST,
  HTTP_CREATED,
  HTTP_NOT_FOUND,
  HTTP_OK,
  HTTP_SERVER_ERROR,
} from "../constants/response/httpStatusCode";
import SUCCESS_MESSAGES from "../constants/response/successMessages";
import ERROR_MESSAGES from "../constants/response/errorMessages";

export class StudentController {
  static async createStudent(
    req: CreateStudentsRequest,
    res: Response
  ): Promise<void> {
    try {
      const student = await StudentService.createStudent(req.body);

      res.status(HTTP_CREATED).json({
        status: "success",
        message: SUCCESS_MESSAGES.STUDENT_CREATED,
        data: student,
      });
    } catch (error: any) {
      res.status(HTTP_BAD_REQUEST).json({
        status: "error",
        message: error.message || ERROR_MESSAGES.STUDENT.FAILED_TO_CREATE,
      });
    }
  }

  static async getAllStudents(req: Request, res: Response): Promise<void> {
    try {
      const students = await StudentService.getAllStudents();

      res.status(HTTP_OK).json({
        status: "success",
        message: SUCCESS_MESSAGES.STUDENT_RETRIEVED,
        data: students,
      });
    } catch (error: any) {
      res.status(HTTP_SERVER_ERROR).json({
        status: "error",
        message: error.message || ERROR_MESSAGES.STUDENT.FAILED_TO_RETRIEVE,
      });
    }
  }

  static async getStudent(
    req: GetStudentIdParamsReq,
    res: Response
  ): Promise<void> {
    try {
      const { studentId } = req.params;

      const student = await StudentService.getStudentById(studentId);

      if (!student) {
        res.status(HTTP_NOT_FOUND).json({
          status: "error",
          message: ERROR_MESSAGES.STUDENT.NOT_FOUND,
        });
        return;
      }

      res.status(HTTP_OK).json({
        status: "success",
        message: SUCCESS_MESSAGES.STUDENT_FETCHED,
        data: student,
      });
    } catch (error: any) {
      res.status(HTTP_SERVER_ERROR).json({
        status: "error",
        message: error.message || ERROR_MESSAGES.STUDENT.FAILED_TO_RETRIEVE,
      });
    }
  }
}
