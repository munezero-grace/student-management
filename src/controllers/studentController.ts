import { Request, Response } from "express";
import {
  CreateStudentsRequest,
  GetStudentIdParamsReq,
  StudentInterface,
} from "../types";
import { createUser, getAllUser, findUser } from "../services";
import { ResponseService } from "../utils";
import * as zod from "zod";
import {
  createStudentValidationSchema,
  CreateStudentValidationSchemaWithZod,
} from "../schemas";
const response = new ResponseService();
export const createStudent = (req: CreateStudentsRequest, res: Response) => {
  try {
    // const { value, error } = createStudentValidationSchema.validate(req.body);
    // if (error) {
    //   return res.status(400).json(error);
    // }
    const { age, name, isActive } = CreateStudentValidationSchemaWithZod.parse(
      req.body
    );

    const student = createUser({
      name: name,
      age: age,
      isActive: isActive,
    });
    response.response({
      res,
      data: student,
      success: true,
      statusCode: 201,
      message: "Student Created Successfully",
    });
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return response.response({
        res,
        statusCode: 400,
        data: JSON.parse(error as unknown as  string),
      });
    }
    console.log(error);
    const { message, stack } = error as Error;
    response.response({
      res,
      statusCode: 500,
      message,
      error: stack,
    });
    res.status(500).json({
      message,
      stack,
    });
  }
};

export const getAllStudents = (req: Request, res: Response) => {
  response.response<StudentInterface[]>({
    res,
    data: getAllUser(),
    message: "fetched well",
  });
};
export const getStudent = (req: GetStudentIdParamsReq, res: Response) => {
  const { studentId } = req.params;

  const studentDetails = findUser({ userId: studentId });
  if (!studentDetails) {
    res.status(404).json({
      message: "Student Not Found",
    });
  }

  res.status(200).json({
    message: "student Fetched well",
    data: studentDetails,
  });
};