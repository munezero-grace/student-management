import mongoose from "mongoose";
import { AttendanceModel } from "../models/attendance.model";

export type AttendanceStatus = "present" | "absent" | "late" | "excused";

const normalizeDateToUTC = (date: string | Date) => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

export const createAttendance = async (payload: {
  studentId: string;
  date: string | Date;
  status: AttendanceStatus;
  notes?: string;
}) => {
  const date = normalizeDateToUTC(payload.date);

  try {
    return await AttendanceModel.create({
      student: payload.studentId,
      date,
      status: payload.status,
      notes: payload.notes,
    });
  } catch (err: any) {
    // only works if you add a UNIQUE index on (student, date)
    if (err?.code === 11000) {
      throw new Error("Attendance for this student and date already exists");
    }
    throw err;
  }
};

export const getAllAttendances = async () => {
  return AttendanceModel.find({ deletedAt: { $exists: false } })
    .sort({ date: -1 })
    .lean();
};

export const getAttendanceById = async (attendanceId: string) => {
  if (!mongoose.Types.ObjectId.isValid(attendanceId)) return null;

  return AttendanceModel.findOne({
    _id: attendanceId,
    deletedAt: { $exists: false },
  }).lean();
};

export const getAttendancesForStudent = async (studentId: string) => {
  return AttendanceModel.find({
    student: studentId,
    deletedAt: { $exists: false },
  })
    .sort({ date: -1 })
    .lean();
};

export const updateAttendanceById = async (
  attendanceId: string,
  updates: Partial<{
    status: AttendanceStatus;
    notes?: string;
    date?: string | Date;
  }>
) => {
  if (!mongoose.Types.ObjectId.isValid(attendanceId)) return null;

  const payload: any = { ...updates };

  if (updates.date) {
    payload.date = normalizeDateToUTC(updates.date);
  }

  return AttendanceModel.findOneAndUpdate(
    { _id: attendanceId, deletedAt: { $exists: false } },
    { $set: { ...payload, updatedAt: new Date() } },
    { new: true }
  ).lean();
};

export const deleteAttendanceById = async (attendanceId: string) => {
  if (!mongoose.Types.ObjectId.isValid(attendanceId)) return false;

  const updated = await AttendanceModel.findOneAndUpdate(
    { _id: attendanceId, deletedAt: { $exists: false } },
    { $set: { deletedAt: new Date(), updatedAt: new Date() } },
    { new: true }
  );

  return !!updated;
};
