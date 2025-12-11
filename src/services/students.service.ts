import { StudentInterface } from "../types";
import { database, writeFile } from "../database";
import { v4 as uuidv4 } from "uuid";

export class StudentService {
  static createStudent(userData: Partial<StudentInterface>): StudentInterface {
    try {
      const db = JSON.parse(database());

      const newStudent: StudentInterface = {
        id: uuidv4(),
        name: userData.name!,
        age: userData.age!,
        isActive: userData.isActive!,
        createdAt: new Date(),
      };

      db.students.push(newStudent);
      writeFile(db);

      return newStudent;
    } catch (error: any) {
      throw new Error(error.message || "Failed to create student");
    }
  }

  static getAllStudents(): StudentInterface[] {
    try {
      const db = JSON.parse(database());
      return db.students || [];
    } catch (error) {
      throw new Error("Failed to retrieve students");
    }
  }

  static getStudentById(studentId: string): StudentInterface | null {
    try {
      const db = JSON.parse(database());
      const student = db.students.find(
        (student: StudentInterface) => student.id === studentId
      );
      return student || null;
    } catch (error) {
      throw new Error("Failed to retrieve student");
    }
  }

  static updateStudent(
    studentId: string,
    updateData: Partial<StudentInterface>
  ): StudentInterface | null {
    try {
      const db = JSON.parse(database());
      const studentIndex = db.students.findIndex(
        (student: StudentInterface) => student.id === studentId
      );

      if (studentIndex === -1) {
        return null;
      }

      const updatedStudent = {
        ...db.students[studentIndex],
        ...updateData,
        updatedAt: new Date(),
      };

      db.students[studentIndex] = updatedStudent;
      writeFile(db);

      return updatedStudent;
    } catch (error: any) {
      throw new Error(error.message || "Failed to update student");
    }
  }

  static deleteStudent(studentId: string): boolean {
    try {
      const db = JSON.parse(database());
      const studentIndex = db.students.findIndex(
        (student: StudentInterface) => student.id === studentId
      );

      if (studentIndex === -1) {
        return false;
      }

      db.students.splice(studentIndex, 1);
      writeFile(db);

      return true;
    } catch (error) {
      throw new Error("Failed to delete student");
    }
  }

  static getStudentByName(name: string): StudentInterface | null {
    try {
      const db = JSON.parse(database());
      const student = db.students.find(
        (student: StudentInterface) => student.name === name
      );
      return student || null;
    } catch (error) {
      throw new Error("Failed to retrieve student");
    }
  }
}

export const createUser = (userData: Partial<StudentInterface>) =>
  StudentService.createStudent(userData);

export const getAllUser = () => StudentService.getAllStudents();

export const findUser = (userId: string) =>
  StudentService.getStudentById(userId);
