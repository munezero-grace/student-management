import { ResponseService } from "../utils";
import { AuthRequestInterface } from "./authMiddleware";
import { Response, NextFunction } from "express";
import { JwtRole } from "../utils/lib";

const responseService = new ResponseService();

type Allowed = JwtRole | "all" | JwtRole[];

export const roleMiddleware = (allowed: Allowed) => {
  return (req: AuthRequestInterface, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return responseService.response({
        res,
        message: "Access Denied",
        statusCode: 403,
      });
    }

    if (allowed === "all") return next();

    if (Array.isArray(allowed)) {
      if (!allowed.includes(userRole)) {
        return responseService.response({
          res,
          message: "Access Denied",
          statusCode: 403,
        });
      }
      return next();
    }

    if (userRole !== allowed) {
      return responseService.response({
        res,
        message: "Access Denied",
        statusCode: 403,
      });
    }

    return next();
  };
};
