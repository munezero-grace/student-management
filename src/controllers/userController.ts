import { Response } from "express";
import {
  CreateUserRequest,
  GetUserIdParamsReq,
  UpdateUserRequest,
} from "../types/user.interface";
import { UserService } from "../services/user.service";
import { ERROR_MESSAGES } from "../constants/response/errorMessages";
import { SUCCESS_MESSAGES } from "../constants/response/successMessages";
import {
  HTTP_BAD_REQUEST,
  HTTP_CREATED,
  HTTP_NOT_FOUND,
  HTTP_OK,
  HTTP_SERVER_ERROR,
} from "../constants/response/httpStatusCode";

export class UserController {
  static async getAllUsers(req: any, res: Response): Promise<void> {
    try {
      const users = UserService.getAllUsers();

      res.status(HTTP_OK).json({
        status: "success",
        message: SUCCESS_MESSAGES.USER_RETRIEVED,
        data: users,
      });
    } catch (error: any) {
      res.status(HTTP_SERVER_ERROR).json({
        status: "error",
        message: error.message || ERROR_MESSAGES.USER.FAILED_TO_RETRIEVE,
      });
    }
  }

  static async getUserById(
    req: GetUserIdParamsReq,
    res: Response
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const user = UserService.getUserById(userId);

      if (!user) {
        res.status(HTTP_NOT_FOUND).json({
          status: "error",
          message: ERROR_MESSAGES.USER.NOT_FOUND,
        });
        return;
      }

      res.status(HTTP_OK).json({
        status: "success",
        message: SUCCESS_MESSAGES.USER_RETRIEVED_SINGLE,
        data: user,
      });
    } catch (error: any) {
      res.status(HTTP_SERVER_ERROR).json({
        status: "error",
        message: error.message || ERROR_MESSAGES.USER.FAILED_TO_RETRIEVE_SINGLE,
      });
    }
  }


  static async createUser(
    req: CreateUserRequest,
    res: Response
  ): Promise<void> {
    try {
      const newUser = UserService.createUser(req.body);

      res.status(HTTP_CREATED).json({
        status: "success",
        message: SUCCESS_MESSAGES.USER_CREATED,
        data: newUser,
      });
    } catch (error: any) {
      res.status(HTTP_BAD_REQUEST).json({
        status: "error",
        message: error.message || ERROR_MESSAGES.USER.FAILED_TO_CREATE,
      });
    }
  }
  static async updateUser(
    req: UpdateUserRequest,
    res: Response
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const updatedUser = UserService.updateUser(userId, req.body);

      if (!updatedUser) {
        res.status(HTTP_NOT_FOUND).json({
          status: "error",
          message: ERROR_MESSAGES.USER.NOT_FOUND,
        });
        return;
      }

      res.status(HTTP_OK).json({
        status: "success",
        message: SUCCESS_MESSAGES.USER_UPDATED,
        data: updatedUser,
      });
    } catch (error: any) {
      res.status(HTTP_BAD_REQUEST).json({
        status: "error",
        message: error.message || ERROR_MESSAGES.USER.FAILED_TO_UPDATE,
      });
    }
  }

  static async deleteUser(
    req: GetUserIdParamsReq,
    res: Response
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const deleted = UserService.deleteUser(userId);

      if (!deleted) {
        res.status(HTTP_NOT_FOUND).json({
          status: "error",
          message: ERROR_MESSAGES.USER.NOT_FOUND,
        });
        return;
      }

      res.status(HTTP_OK).json({
        status: "success",
        message: SUCCESS_MESSAGES.USER_DELETED,
      });
    } catch (error: any) {
      res.status(HTTP_SERVER_ERROR).json({
        status: "error",
        message: error.message || ERROR_MESSAGES.USER.FAILED_TO_DELETE,
      });
    }
  }
}
