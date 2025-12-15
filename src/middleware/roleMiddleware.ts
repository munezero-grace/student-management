import { ResponseService } from "../utils";
import { AuthRequestInterface } from "./authMiddleware";
import { Request, Response, NextFunction } from "express";
const responseService = new ResponseService();

export const roleMiddleware = (reqRole: "admin" | "user" | "all") => {
  return (req: AuthRequestInterface, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (reqRole == "all") {
      return next();
    }
    if (!userRole) {
      return responseService.response({
        res,
        message: "Access Denied",
        statusCode: 403,
      });
    }
    if (reqRole !== userRole) {
      return responseService.response({
        res,
        message: "Access Denied",
        statusCode: 403,
      });
    }
    return next();
  };
};