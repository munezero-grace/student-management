import { Request, Response } from "express";
import {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
} from "../services";
import {
  HTTP_BAD_REQUEST,
  HTTP_CREATED,
  HTTP_NOT_FOUND,
  HTTP_OK,
  HTTP_SERVER_ERROR,
} from "../constants/response/httpStatusCode";
import SUCCESS_MESSAGES from "../constants/response/successMessages";
import ERROR_MESSAGES from "../constants/response/errorMessages";

export const createAttendanceRecord = (req: Request, res: Response) => {
  try {
    const { studentId, date, status } = req.body;

    if (!studentId || !date || !status) {
      return res.status(HTTP_BAD_REQUEST).json({
        status: "error",
        message: ERROR_MESSAGES.ATTENDANCE.MISSING_REQUIRED_FIELDS,
      });
    }

    const attendance = createAttendance(req.body);
    res.status(HTTP_CREATED).json({
      status: "success",
      message: SUCCESS_MESSAGES.ATTENDANCE_CREATED,
      data: attendance,
    });
  } catch (error: any) {
    res.status(HTTP_BAD_REQUEST).json({
      status: "error",
      message: error.message || ERROR_MESSAGES.ATTENDANCE.FAILED_TO_CREATE,
    });
  }
};

export const getAllAttendanceRecords = (req: Request, res: Response) => {
  try {
    const attendances = getAllAttendances();
    res.status(HTTP_OK).json({
      status: "success",
      message: SUCCESS_MESSAGES.ATTENDANCE_RETRIEVED,
      data: attendances,
    });
  } catch (error: any) {
    res.status(HTTP_SERVER_ERROR).json({
      status: "error",
      message: error.message || ERROR_MESSAGES.ATTENDANCE.FAILED_TO_RETRIEVE,
    });
  }
};

export const getAttendanceRecordById = (req: Request, res: Response) => {
  try {
    const { attendanceId } = req.params;
    const attendance = getAttendanceById(attendanceId);

    if (!attendance) {
      return res.status(HTTP_NOT_FOUND).json({
        status: "error",
        message: ERROR_MESSAGES.ATTENDANCE.NOT_FOUND,
      });
    }

    res.status(HTTP_OK).json({
      status: "success",
      message: SUCCESS_MESSAGES.ATTENDANCE_FETCHED,
      data: attendance,
    });
  } catch (error: any) {
    res.status(HTTP_SERVER_ERROR).json({
      status: "error",
      message: error.message || ERROR_MESSAGES.ATTENDANCE.FAILED_TO_RETRIEVE_SINGLE,
    });
  }
};
