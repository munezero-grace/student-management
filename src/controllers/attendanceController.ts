import { Request, Response } from "express";
import {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  getAttendancesForStudent,
  updateAttendanceById,
  deleteAttendanceById,
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestsForStudent,
  approveLeaveRequest as svcApproveLeaveRequest,
  rejectLeaveRequest as svcRejectLeaveRequest,
} from "../services";
import { AuthRequestInterface } from "../middleware/authMiddleware";
import {
  HTTP_BAD_REQUEST,
  HTTP_CREATED,
  HTTP_NOT_FOUND,
  HTTP_OK,
  HTTP_SERVER_ERROR,
} from "../constants/response/httpStatusCode";
import SUCCESS_MESSAGES from "../constants/response/successMessages";
import ERROR_MESSAGES from "../constants/response/errorMessages";

/**
 * ADMIN: Create attendance record
 */
export const createAttendanceRecord = async (req: Request, res: Response) => {
  try {
    const { studentId, date, status } = req.body;

    if (!studentId || !date || !status) {
      return res.status(HTTP_BAD_REQUEST).json({
        status: "error",
        message: ERROR_MESSAGES.ATTENDANCE.MISSING_REQUIRED_FIELDS,
      });
    }

    const attendance = await createAttendance({ studentId, date, status });

    return res.status(HTTP_CREATED).json({
      status: "success",
      message: SUCCESS_MESSAGES.ATTENDANCE_CREATED,
      data: attendance,
    });
  } catch (error: any) {
    return res.status(HTTP_SERVER_ERROR).json({
      status: "error",
      message: error.message || ERROR_MESSAGES.ATTENDANCE.FAILED_TO_CREATE,
    });
  }
};

/**
 * ADMIN: Get all attendance records
 */
export const getAllAttendanceRecords = async (req: Request, res: Response) => {
  try {
    const attendances = await getAllAttendances();

    return res.status(HTTP_OK).json({
      status: "success",
      message: SUCCESS_MESSAGES.ATTENDANCE_RETRIEVED,
      data: attendances,
    });
  } catch (error: any) {
    return res.status(HTTP_SERVER_ERROR).json({
      status: "error",
      message: error.message || ERROR_MESSAGES.ATTENDANCE.FAILED_TO_RETRIEVE,
    });
  }
};

/**
 * ADMIN: Get one attendance record by ID
 */
export const getAttendanceRecordById = async (req: Request, res: Response) => {
  try {
    const { attendanceId } = req.params;
    const attendance = await getAttendanceById(attendanceId);

    if (!attendance) {
      return res.status(HTTP_NOT_FOUND).json({
        status: "error",
        message: ERROR_MESSAGES.ATTENDANCE.NOT_FOUND,
      });
    }

    return res.status(HTTP_OK).json({
      status: "success",
      message: SUCCESS_MESSAGES.ATTENDANCE_FETCHED,
      data: attendance,
    });
  } catch (error: any) {
    return res.status(HTTP_SERVER_ERROR).json({
      status: "error",
      message:
        error.message || ERROR_MESSAGES.ATTENDANCE.FAILED_TO_RETRIEVE_SINGLE,
    });
  }
};

/**
 * USER/STUDENT: Get my attendance records
 * (Uses req.user.id from authMiddleware)
 */
export const getMyAttendanceRecords = async (
  req: AuthRequestInterface,
  res: Response
) => {
  try {
    const userId = req.user?.id; // ✅ standardize to id
    if (!userId) {
      return res.status(HTTP_BAD_REQUEST).json({
        status: "error",
        message: "User information missing",
      });
    }

    const attendances = await getAttendancesForStudent(userId);

    return res.status(HTTP_OK).json({
      status: "success",
      message: SUCCESS_MESSAGES.ATTENDANCE_RETRIEVED,
      data: attendances,
    });
  } catch (error: any) {
    return res.status(HTTP_SERVER_ERROR).json({
      status: "error",
      message: error.message || ERROR_MESSAGES.ATTENDANCE.FAILED_TO_RETRIEVE,
    });
  }
};

/**
 * ADMIN: Update attendance record by ID
 */
export const updateAttendanceRecord = async (req: Request, res: Response) => {
  try {
    const { attendanceId } = req.params;

    const updated = await updateAttendanceById(attendanceId, req.body);

    if (!updated) {
      return res.status(HTTP_NOT_FOUND).json({
        status: "error",
        message: ERROR_MESSAGES.ATTENDANCE.NOT_FOUND,
      });
    }

    return res.status(HTTP_OK).json({
      status: "success",
      message: SUCCESS_MESSAGES.ATTENDANCE_UPDATED || "Attendance updated",
      data: updated,
    });
  } catch (error: any) {
    return res.status(HTTP_SERVER_ERROR).json({
      status: "error",
      message:
        error.message || ERROR_MESSAGES.ATTENDANCE.FAILED_TO_RETRIEVE_SINGLE,
    });
  }
};

/**
 * ADMIN: Soft delete attendance record by ID
 */
export const deleteAttendanceRecord = async (req: Request, res: Response) => {
  try {
    const { attendanceId } = req.params;

    const ok = await deleteAttendanceById(attendanceId);

    if (!ok) {
      return res.status(HTTP_NOT_FOUND).json({
        status: "error",
        message: ERROR_MESSAGES.ATTENDANCE.NOT_FOUND,
      });
    }

    return res.status(HTTP_OK).json({
      status: "success",
      message: SUCCESS_MESSAGES.ATTENDANCE_DELETED || "Attendance deleted",
    });
  } catch (error: any) {
    return res.status(HTTP_SERVER_ERROR).json({
      status: "error",
      message:
        error.message || ERROR_MESSAGES.ATTENDANCE.FAILED_TO_RETRIEVE_SINGLE,
    });
  }
};

/**
 * USER/STUDENT: Submit leave request
 */
export const submitLeaveRequest = async (
  req: AuthRequestInterface,
  res: Response
) => {
  try {
    const userId = req.user?.id; // ✅ standardize to id
    const { date, reason } = req.body;

    if (!userId || !date) {
      return res.status(HTTP_BAD_REQUEST).json({
        status: "error",
        message: ERROR_MESSAGES.ATTENDANCE.MISSING_REQUIRED_FIELDS,
      });
    }

    const leave = await createLeaveRequest({
      studentId: userId,
      date,
      reason,
    });

    return res.status(HTTP_CREATED).json({
      status: "success",
      message: SUCCESS_MESSAGES.LEAVE_REQUEST_SUBMITTED,
      data: leave,
    });
  } catch (error: any) {
    return res.status(HTTP_SERVER_ERROR).json({
      status: "error",
      message: error.message || "Failed to submit leave request",
    });
  }
};

/**
 * ADMIN: Get all leave requests
 */
export const getAllLeaveRequestsHandler = async (req: Request, res: Response) => {
  try {
    const leaves = await getAllLeaveRequests();

    return res.status(HTTP_OK).json({
      status: "success",
      message: SUCCESS_MESSAGES.LEAVE_REQUEST_RETRIEVED,
      data: leaves,
    });
  } catch (error: any) {
    return res.status(HTTP_SERVER_ERROR).json({
      status: "error",
      message: error.message || ERROR_MESSAGES.LEAVE.FAILED_TO_RETRIEVE,
    });
  }
};

/**
 * USER/STUDENT: Get my leave requests
 */
export const getMyLeaveRequestsHandler = async (
  req: AuthRequestInterface,
  res: Response
) => {
  try {
    const userId = req.user?.id; // ✅ standardize to id
    if (!userId) {
      return res
        .status(HTTP_BAD_REQUEST)
        .json({ status: "error", message: "User missing" });
    }

    const leaves = await getLeaveRequestsForStudent(userId);

    return res.status(HTTP_OK).json({
      status: "success",
      message: SUCCESS_MESSAGES.LEAVE_REQUEST_RETRIEVED,
      data: leaves,
    });
  } catch (error: any) {
    return res.status(HTTP_SERVER_ERROR).json({
      status: "error",
      message: error.message || ERROR_MESSAGES.LEAVE.FAILED_TO_RETRIEVE,
    });
  }
};

/**
 * ADMIN: Approve leave request
 */
export const approveLeaveRequestHandler = async (
  req: AuthRequestInterface,
  res: Response
) => {
  try {
    const { leaveId } = req.params;

    const updated = await svcApproveLeaveRequest(leaveId); // ✅ no adminId needed

    if (!updated) {
      return res.status(HTTP_NOT_FOUND).json({
        status: "error",
        message: ERROR_MESSAGES.LEAVE.NOT_FOUND,
      });
    }

    return res.status(HTTP_OK).json({
      status: "success",
      message: SUCCESS_MESSAGES.LEAVE_REQUEST_APPROVED,
      data: updated,
    });
  } catch (error: any) {
    return res.status(HTTP_SERVER_ERROR).json({
      status: "error",
      message: error.message || ERROR_MESSAGES.LEAVE.FAILED_TO_CREATE,
    });
  }
};

/**
 * ADMIN: Reject leave request
 */
export const rejectLeaveRequestHandler = async (
  req: AuthRequestInterface,
  res: Response
) => {
  try {
    const { leaveId } = req.params;

    const updated = await svcRejectLeaveRequest(leaveId); // ✅ no adminId needed

    if (!updated) {
      return res.status(HTTP_NOT_FOUND).json({
        status: "error",
        message: ERROR_MESSAGES.LEAVE.NOT_FOUND,
      });
    }

    return res.status(HTTP_OK).json({
      status: "success",
      message: SUCCESS_MESSAGES.LEAVE_REQUEST_REJECTED,
      data: updated,
    });
  } catch (error: any) {
    return res.status(HTTP_SERVER_ERROR).json({
      status: "error",
      message: error.message || ERROR_MESSAGES.LEAVE.FAILED_TO_CREATE,
    });
  }
};
