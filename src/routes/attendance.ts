import express, { Router } from "express";
import {
  createAttendanceRecord,
  getAllAttendanceRecords,
  getAttendanceRecordById,
} from "../controllers";

const attendanceRouter: Router = express.Router();

attendanceRouter.post("/attendance", createAttendanceRecord);
attendanceRouter.get("/attendance", getAllAttendanceRecords);
attendanceRouter.get("/attendance/:attendanceId", getAttendanceRecordById);

export { attendanceRouter };
