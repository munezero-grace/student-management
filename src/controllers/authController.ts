import { Request, Response } from "express";
import { LoginInterface } from "../types";
import { comparePassword, ResponseService } from "../utils";
import { AuthService, UserService } from "../services";
import { JwtRole } from "../utils/lib";

const responseService = new ResponseService();
const userService = new UserService();
const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body as LoginInterface;

      if (!email || !password) {
        return responseService.response({
          res,
          statusCode: 400,
          message: "Email and password are required",
        });
      }

      const cleanEmail = String(email).toLowerCase().trim();
      const user = await userService.getUser({ email: cleanEmail });

      if (!user) {
        return responseService.response({
          res,
          statusCode: 404,
          message: "User doesn't exist",
        });
      }

      if (!user.password) {
        return responseService.response({
          res,
          statusCode: 400,
          message: "Invalid email or password",
        });
      }

      const passwordMatch = await comparePassword(user.password, password);

      if (!passwordMatch) {
        return responseService.response({
          res,
          statusCode: 400,
          message: "Invalid email or password",
        });
      }

      const role: JwtRole =
        user.role === "admin" || user.role === "student" ? user.role : "user";

      const token = await authService.loginService({
        id: user._id.toString(),
        role,
      });

      return responseService.response({
        res,
        statusCode: 200,
        message: "Login Successfully",
        data: token,
      });
    } catch (error: any) {
      return responseService.response({
        res,
        statusCode: 500,
        message: error?.message || "Internal server error",
        data: error?.stack,
      });
    }
  }
}
