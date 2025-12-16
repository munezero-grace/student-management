import mongoose from "mongoose";
import LeaveModel from "../models/leave.model";
import AttendanceModel from "../models/attendance.model";

const normalizeDateToUTC = (date: string | Date) => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

export const createLeaveRequest = async (payload: {
  studentId: string;
  date: string;
  reason?: string;
}) => {
  return LeaveModel.create({
    student: payload.studentId,
    date: normalizeDateToUTC(payload.date),
    reason: payload.reason || "",
    status: "pending",
    decidedAt: null,
  });
};

export const getAllLeaveRequests = async () => {
  return LeaveModel.find().sort({ createdAt: -1 }).lean();
};

export const getLeaveRequestsForStudent = async (studentId: string) => {
  return LeaveModel.find({ student: studentId }).sort({ createdAt: -1 }).lean();
};

export const getLeaveRequestById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return LeaveModel.findById(id).lean();
};

export const approveLeaveRequest = async (leaveId: string) => {
  if (!mongoose.Types.ObjectId.isValid(leaveId)) return null;

  const leave = await LeaveModel.findById(leaveId);
  if (!leave) return null;

  leave.status = "approved";
  leave.decidedAt = new Date();
  await leave.save();

  // find attendance on the same day
  const start = new Date(leave.date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(leave.date);
  end.setHours(23, 59, 59, 999);

  const existingAttendance = await AttendanceModel.findOne({
    student: leave.student,
    date: { $gte: start, $lte: end },
    deletedAt: { $exists: false },
  });

  if (existingAttendance) {
    existingAttendance.status = "excused";
    await existingAttendance.save();
  } else {
    await AttendanceModel.create({
      student: leave.student,
      date: leave.date,
      status: "excused",
    });
  }

  return leave;
};

export const rejectLeaveRequest = async (leaveId: string) => {
  if (!mongoose.Types.ObjectId.isValid(leaveId)) return null;

  const leave = await LeaveModel.findById(leaveId);
  if (!leave) return null;

  leave.status = "rejected";
  leave.decidedAt = new Date();
  await leave.save();

  return leave;
};
