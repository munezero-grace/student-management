import { ResponseService } from "../utils";
import { AuthRequestInterface } from "./authMiddleware";
import { Response, NextFunction } from "express";

const responseService = new ResponseService();

type Role = "admin" | "user" | "student";
type AllowedRole = Role | "all";

export const roleMiddleware = (requiredRole: AllowedRole) => {
  return (req: AuthRequestInterface, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return responseService.response({
        res,
        message: "Access Denied",
        statusCode: 403,
      });
    }

    // ✅ allow everyone if route is open to all logged-in users
    if (requiredRole === "all") return next();

    // ✅ treat "student" like "user" for permissions (common pattern)
    const normalizedRole: Role = userRole === "student" ? "user" : userRole;

    if (normalizedRole !== requiredRole) {
      return responseService.response({
        res,
        message: "Access Denied",
        statusCode: 403,
      });
    }

    return next();
  };
};
