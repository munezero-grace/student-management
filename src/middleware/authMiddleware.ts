import { Request, Response, NextFunction } from "express";
import { ResponseService } from "../utils/response";
import { validateToken, JwtPayloadShape } from "../utils/lib";

const responseService = new ResponseService();

export interface AuthRequestInterface extends Request {
  user?: JwtPayloadShape;
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

    const decoded = validateToken(token);

    if (!decoded?.id || !decoded?.role) {
      return responseService.response({
        res,
        statusCode: 401,
        message: "unauthorized actions",
      });
    }

    req.user = decoded;
    return next();
  } catch (error: any) {
    return responseService.response({
      res,
      statusCode: 401,
      message: "unauthorized actions",
      data: error?.message,
    });
  }
};
