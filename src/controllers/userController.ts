import { Request, Response } from "express";
import { UserService } from "../services";
import { ResponseService } from "../utils/response";
import { AuthRequestInterface } from "../middleware/authMiddleware";

const userService = new UserService();
const responseService = new ResponseService();

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, gender } = req.body;

      const user = await userService.createUser({
        name,
        email: String(email).toLowerCase().trim(),
        password,
        gender,
        role: "user",
        isActive: true,
      });

      return responseService.response({
        res,
        statusCode: 201,
        message: "User created",
        data: user,
      });
    } catch (error: any) {
      return responseService.response({
        res,
        statusCode: 400,
        message: error.message,
      });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      return responseService.response({
        res,
        statusCode: 200,
        message: "Users retrieved",
        data: users,
      });
    } catch (error: any) {
      return responseService.response({
        res,
        statusCode: 500,
        message: error.message,
      });
    }
  }

  static async UserProfile(req: AuthRequestInterface, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return responseService.response({
          res,
          statusCode: 401,
          message: "Unauthorized",
        });
      }

      const user = await userService.getUserById(userId);

      return responseService.response({
        res,
        statusCode: 200,
        message: "Profile retrieved",
        data: user,
      });
    } catch (error: any) {
      return responseService.response({
        res,
        statusCode: 500,
        message: error.message,
      });
    }
  }
}
