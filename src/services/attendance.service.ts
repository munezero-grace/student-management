import { AttendanceInterface } from "../types";
import { database, writeFile } from "../database";
import { v4 as uuidv4 } from "uuid";

export const createAttendance = (
  attendanceData: Partial<AttendanceInterface>
): AttendanceInterface => {
  const db = JSON.parse(database());
  const newAttendance: AttendanceInterface = {
    id: uuidv4(),
    studentId: attendanceData.studentId!,
    date: attendanceData.date!,
    status: attendanceData.status!,
    createdAt: new Date(),
  };
  db.attendances.push(newAttendance);
  writeFile(db);
  return newAttendance;
};

export const getAllAttendances = (): AttendanceInterface[] => {
  const db = JSON.parse(database());
  return db.attendances;
};

export const getAttendanceById = (
  attendanceId: string
): AttendanceInterface | undefined => {
  const db = JSON.parse(database());
  return db.attendances.find((a: AttendanceInterface) => a.id === attendanceId);
};
