import { AttendanceInterface } from "../types";
import { database, writeFile } from "../database";

export const createAttendance = ({
  studentId,
  date,
  status,
}: {
  studentId: string;
  date: string;
  status: "present" | "absent";
}): AttendanceInterface => {
  const db = JSON.parse(database());
  const newAttendance: AttendanceInterface = {
    id: String(db.attendances.length + 1),
    studentId,
    date,
    status,
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
