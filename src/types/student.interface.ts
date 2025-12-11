import { Request } from "express";
export interface StudentInterface {
  id: string;
  name: string;
  age: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
export interface CreateStudentsRequest extends Request {
  body: Partial<StudentInterface>;
}
export interface GetStudentIdParamsReq extends Request {
  params: {
    studentId: string;
  };
}