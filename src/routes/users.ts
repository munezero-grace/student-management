import express, { Router } from "express";
import { UserController } from "../controllers";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { validationMiddleware, Type } from "../middleware";
import { UserSchemaValidation } from "../validations/user.validation";

const userRoute: Router = express.Router();

userRoute.post(
  "/users",
  validationMiddleware({ schema: UserSchemaValidation, type: Type.BODY }),
  UserController.createUser
);

userRoute.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  UserController.getAllUsers
);

userRoute.get(
  "/users/profile",
  authMiddleware,
  roleMiddleware("all"),
  UserController.UserProfile
);

export { userRoute };
