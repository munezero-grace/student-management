import { Request, Response } from "express";
import { LoginInterface } from "../types";
import { comparePassword, ResponseService } from "../utils";
import { AuthService, JwtRole, UserService } from "../services";

const responseService = new ResponseService();
const userService = new UserService();
const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body as LoginInterface;

      // basic input guard (optional but good)
      if (!email || !password) {
        return responseService.response({
          res,
          statusCode: 400,
          message: "Email and password are required",
        });
      }

      // ✅ one DB call only
      const user = await userService.getUser({ email });

      if (!user) {
        return responseService.response({
          res,
          statusCode: 404,
          message: "User doesn't exist",
        });
      }

      // ✅ avoid TS errors + avoid runtime crash
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

      // ✅ normalize role (make sure it matches your JwtRole union)
      const role = (user.role ?? "user") as JwtRole;

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
