import { StudentInterface } from "../types";
import { database, writeFile } from "../database";
export const createUser = ({
  name,
  age,
  isActive,
}: {
  name: string;
  age: number;
  isActive: boolean;
}): StudentInterface => {
  const studentTable = JSON.parse(database());
  const index = (studentTable?.students.length + 1).toString();
  studentTable.students.push({
    id: index,
    name,
    age,
    isActive,
    createdAt: new Date(),
  });
  writeFile(studentTable);
  return studentTable.students[Number(index)];
};
export const getAllUser = (): StudentInterface[] => {
  const studentTable = JSON.parse(database());
  const students = studentTable["students"] as StudentInterface[];
  return students;
};
export const findUser = ({
  userId,
}: {
  userId: string;
}): StudentInterface | boolean => {
  const studentTable = JSON.parse(database());
  const students = studentTable["students"] as StudentInterface[];
  const studentIndex = students.findIndex((va) => va.id == userId);
  if (studentIndex === -1) {
    return false;
  }
  return students[studentIndex];
};