import express, { Router } from "express";
import {
  createAttendanceRecord,
  getAllAttendanceRecords,
  getAttendanceRecordById,
  getMyAttendanceRecords,
  updateAttendanceRecord,
  deleteAttendanceRecord,
  submitLeaveRequest,
  getAllLeaveRequestsHandler,
  getMyLeaveRequestsHandler,
  approveLeaveRequestHandler,
  rejectLeaveRequestHandler,
} from "../controllers";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Type, validationMiddleware } from "../middleware";
import {
  createAttendanceSchema,
  updateAttendanceSchema,
} from "../validations/attendance.validation";
import leaveSchema from "../validations/leave.validation";

const attendanceRouter: Router = express.Router();

attendanceRouter.post(
  "/attendance",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware({ schema: createAttendanceSchema, type: Type.BODY }),
  createAttendanceRecord
);
attendanceRouter.get(
  "/attendance",
  authMiddleware,
  roleMiddleware("admin"),
  getAllAttendanceRecords
);
attendanceRouter.get("/attendance/me", authMiddleware, getMyAttendanceRecords);
attendanceRouter.get(
  "/attendance/:attendanceId",
  authMiddleware,
  roleMiddleware("admin"),
  getAttendanceRecordById
);
attendanceRouter.put(
  "/attendance/:attendanceId",
  authMiddleware,
  roleMiddleware("admin"),
  validationMiddleware({ schema: updateAttendanceSchema, type: Type.BODY }),
  updateAttendanceRecord
);
attendanceRouter.delete(
  "/attendance/:attendanceId",
  authMiddleware,
  roleMiddleware("admin"),
  deleteAttendanceRecord
);

attendanceRouter.post(
  "/attendance/leave",
  authMiddleware,
  validationMiddleware({ schema: leaveSchema, type: Type.BODY }),
  submitLeaveRequest
);
attendanceRouter.get(
  "/attendance/leave",
  authMiddleware,
  roleMiddleware("admin"),
  getAllLeaveRequestsHandler
);
attendanceRouter.get(
  "/attendance/leave/me",
  authMiddleware,
  getMyLeaveRequestsHandler
);
attendanceRouter.put(
  "/attendance/leave/:leaveId/approve",
  authMiddleware,
  roleMiddleware("admin"),
  approveLeaveRequestHandler
);
attendanceRouter.put(
  "/attendance/leave/:leaveId/reject",
  authMiddleware,
  roleMiddleware("admin"),
  rejectLeaveRequestHandler
);

export { attendanceRouter };
