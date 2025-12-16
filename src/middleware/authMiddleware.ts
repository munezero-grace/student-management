import { Request, Response, NextFunction } from "express";
import { ResponseService } from "../utils/response";
import { validateToken } from "../utils/lib";

const responseService = new ResponseService();

export interface UserDetails {
  id: string;
  role: "admin" | "user" | "student";
  iat?: number;
  exp?: number;
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
    const authorization = req.headers.authorization;

    if (!authorization) {
      return responseService.response({
        res,
        statusCode: 401,
        message: "unauthorized actions",
      });
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
      return responseService.response({
        res,
        statusCode: 401,
        message: "unauthorized actions",
      });
    }

    // ✅ validate & decode token
    const decoded = validateToken(token);

    // ✅ strict, simple, consistent
    if (!decoded.id || !decoded.role) {
      return responseService.response({
        res,
        statusCode: 401,
        message: "unauthorized actions",
      });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    return next();
  } catch (error: any) {
    return responseService.response({
      res,
      statusCode: 401,
      message: error?.message || "unauthorized actions",
    });
  }
};
