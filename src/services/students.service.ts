import { StudentInterface } from "../types";
import { StudentModel } from "../models";

export class StudentService {
  static async createStudent(
    userData: Partial<StudentInterface>
  ): Promise<Partial<StudentInterface>> {
    try {
      const doc = await StudentModel.create({
        name: userData.name,
        age: userData.age,
        isActive: userData.isActive ?? true,
      });

      const obj = doc.toObject();
      return {
        id: obj._id.toString(),
        name: obj.name,
        age: obj.age,
        isActive: obj.isActive,
        createdAt: obj.createdAt,
        updatedAt: obj.updatedAt,
      };
    } catch (error: any) {
      throw new Error(error.message || "Failed to create student");
    }
  }

  static async getAllStudents(): Promise<Partial<StudentInterface>[]> {
    try {
      const docs = await StudentModel.find().lean().exec();
      return docs.map((d: any) => ({
        id: d._id.toString(),
        name: d.name,
        age: d.age,
        isActive: d.isActive,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      }));
    } catch (error: any) {
      throw new Error(error.message || "Failed to retrieve students");
    }
  }

  static async getStudentById(
    studentId: string
  ): Promise<Partial<StudentInterface> | null> {
    try {
      const d = await StudentModel.findById(studentId).lean().exec();
      if (!d) return null;
      return {
        id: d._id.toString(),
        name: d.name,
        age: d.age,
        isActive: d.isActive,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      };
    } catch (error: any) {
      throw new Error(error.message || "Failed to retrieve student");
    }
  }

  static async updateStudent(
    studentId: string,
    updateData: Partial<StudentInterface>
  ): Promise<Partial<StudentInterface> | null> {
    try {
      const d = await StudentModel.findByIdAndUpdate(
        studentId,
        { ...updateData },
        { new: true }
      )
        .lean()
        .exec();

      if (!d) return null;
      return {
        id: d._id.toString(),
        name: d.name,
        age: d.age,
        isActive: d.isActive,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      };
    } catch (error: any) {
      throw new Error(error.message || "Failed to update student");
    }
  }

  static async deleteStudent(studentId: string): Promise<boolean> {
    try {
      const res = await StudentModel.findByIdAndDelete(studentId).exec();
      return !!res;
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete student");
    }
  }

  static async getStudentByName(
    name: string
  ): Promise<Partial<StudentInterface> | null> {
    try {
      const d = await StudentModel.findOne({ name }).lean().exec();
      if (!d) return null;
      return {
        id: d._id.toString(),
        name: d.name,
        age: d.age,
        isActive: d.isActive,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      };
    } catch (error: any) {
      throw new Error(error.message || "Failed to retrieve student");
    }
  }
}

export const createUser = (userData: Partial<StudentInterface>) =>
  StudentService.createStudent(userData);

export const getAllUser = () => StudentService.getAllStudents();

export const findUser = (userId: string) =>
  StudentService.getStudentById(userId);
