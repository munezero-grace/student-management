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

const attendanceRouter: Router = express.Router();

attendanceRouter.post("/attendance", authMiddleware, roleMiddleware("admin"), createAttendanceRecord);
attendanceRouter.get("/attendance", authMiddleware, roleMiddleware("admin"), getAllAttendanceRecords);
attendanceRouter.get("/attendance/me", authMiddleware, getMyAttendanceRecords);
attendanceRouter.get("/attendance/:attendanceId", authMiddleware, roleMiddleware("admin"), getAttendanceRecordById);
attendanceRouter.put("/attendance/:attendanceId", authMiddleware, roleMiddleware("admin"), updateAttendanceRecord);
attendanceRouter.delete("/attendance/:attendanceId", authMiddleware, roleMiddleware("admin"), deleteAttendanceRecord);

// Leave / absence routes
attendanceRouter.post("/attendance/leave", authMiddleware, submitLeaveRequest);
attendanceRouter.get("/attendance/leave", authMiddleware, roleMiddleware("admin"), getAllLeaveRequestsHandler);
attendanceRouter.get("/attendance/leave/me", authMiddleware, getMyLeaveRequestsHandler);
attendanceRouter.put("/attendance/leave/:leaveId/approve", authMiddleware, roleMiddleware("admin"), approveLeaveRequestHandler);
attendanceRouter.put("/attendance/leave/:leaveId/reject", authMiddleware, roleMiddleware("admin"), rejectLeaveRequestHandler);

export { attendanceRouter };
