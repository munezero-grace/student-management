import { Request, Response } from "express";
import { CreateUserRequest } from "../types/user.interface";
import { hashPassword } from "../utils/lib";
import { ResponseService } from "../utils/response";
import { UserService } from "../services";
import { AuthRequestInterface } from "../middleware/authMiddleware";

const responseService = new ResponseService();
const userService = new UserService();

export class UserController {
  public async createUser(req: CreateUserRequest, res: Response) {
    try {
      const { email, name, gender, isActive, password } = req.body as any;
      const userExist = await userService.userExists(email);
      if (userExist) {
        return responseService.response({
          res,
          message: "user Already Exists",
          statusCode: 400,
        });
      }
      const newUser = await userService.createUser({
        email,
        name,
        gender,
        isActive,
        password: hashPassword(password),
        role: "user",
      } as any);

      return responseService.response({
        res,
        statusCode: 201,
        message: "User Created Successfully",
        success: true,
        data: newUser,
      });
    } catch (err) {
      const { message, stack } = err as Error;
      responseService.response({
        res,
        data: stack,
        message,
        statusCode: 500,
      });
    }
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      return responseService.response({
        res,
        message: "all Users",
        success: true,
        data: users,
      });
    } catch (error) {
      const { message, stack } = error as Error;
      return responseService.response({
        res,
        data: stack,
        message,
        statusCode: 500,
      });
    }
  }

  public async UserProfile(req: AuthRequestInterface, res: Response) {
    try {
      const user = req?.user;
      const userDetails = await userService.getUserById(user?.sub as string);
      return responseService.response({
        res,
        data: userDetails,
        message: "UserFetched",
      });
    } catch (error) {
      const { message, stack } = error as Error;
      responseService.response({
        res,
        data: stack,
        message,
        statusCode: 500,
      });
    }
  }
}
