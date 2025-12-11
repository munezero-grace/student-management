import { Response } from "express";
import {
  CreateUserRequest,
  GetUserIdParamsReq,
  UpdateUserRequest,
} from "../types/user.interface";
import { UserService } from "../services/user.service";

export class UserController {
  static async getAllUsers(req: any, res: Response): Promise<void> {
    try {
      const users = UserService.getAllUsers();

      res.status(200).json({
        status: "success",
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message || "Failed to retrieve users",
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
        res.status(404).json({
          status: "error",
          message: "User not found",
        });
        return;
      }

      res.status(200).json({
        status: "success",
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message || "Failed to retrieve user",
      });
    }
  }

  static async createUser(
    req: CreateUserRequest,
    res: Response
  ): Promise<void> {
    try {
      const newUser = UserService.createUser(req.body);

      res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: newUser,
      });
    } catch (error: any) {
      res.status(400).json({
        status: "error",
        message: error.message || "Failed to create user",
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
        res.status(404).json({
          status: "error",
          message: "User not found",
        });
        return;
      }

      res.status(200).json({
        status: "success",
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error: any) {
      res.status(400).json({
        status: "error",
        message: error.message || "Failed to update user",
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
        res.status(404).json({
          status: "error",
          message: "User not found",
        });
        return;
      }

      res.status(200).json({
        status: "success",
        message: "User deleted successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message || "Failed to delete user",
      });
    }
  }
}
