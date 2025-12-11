import { Request, Response } from "express";
import {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
} from "../services";

export const createAttendanceRecord = (req: Request, res: Response) => {
  const { studentId, date, status } = req.body;

  if (!studentId || !date || !status) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const attendance = createAttendance({ studentId, date, status });
  res.status(201).json({
    message: "Attendance created",
    data: attendance,
  });
};

export const getAllAttendanceRecords = (req: Request, res: Response) => {
  res.json(getAllAttendances());
};

export const getAttendanceRecordById = (req: Request, res: Response) => {
  const { attendanceId } = req.params;
  const attendance = getAttendanceById(attendanceId);

  if (!attendance) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(attendance);
};
