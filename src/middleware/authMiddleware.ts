import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { config } from "../config";
import { ResponseService } from "../utils/response";
import { validateToken } from "../utils/lib";

const responseService = new ResponseService();
interface UserDetails {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}
export interface AuthRequestInterface extends Request {
  user?: UserDetails;
}
export const authMiddleware = (
  req: AuthRequestInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationToken = req.headers?.authorization;
    if (!authorizationToken) {
      return responseService.response({
        res,
        statusCode: 401,
        message: "unauthorized actions",
      });
    }
    const headerToken = authorizationToken?.split(" ");
    if (headerToken[0] !== "Bearer") {
      return responseService.response({
        res,
        statusCode: 401,
        message: "unauthorized actions",
      });
    }
    const token = headerToken[1];
    if (!token) {
      return responseService.response({
        res,
        statusCode: 401,
        message: "unauthorized actions",
      });
    }
    const decoded = validateToken(token);
    if (!decoded) {
      return responseService.response({
        res,
        statusCode: 401,
        message: "unauthorized actions",
      });
    }

    jwt.verify(token, config.jwtSecret, function (error: any, decode: any) {
      if (error) {
        return responseService.response({
          res,
          statusCode: 401,
          message: error?.message,
        });
      }
      req.user = decode as UserDetails;
    });
    next();
  } catch (error) {
    const { message, stack } = error as Error;
    return responseService.response({
      res,
      statusCode: 500,
      message,
      data: stack,
    });
  }
};