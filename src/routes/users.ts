import {
  Type,
  validationMiddleware,
  authMiddleware,
  roleMiddleware,
} from "../middleware";
import { UserSchemaValidation } from "../schemas";
import express, { Router } from "express";
import { UserController } from "../controllers";

const userRoute: Router = express.Router();
userRoute.post(
  "/users",
  validationMiddleware({
    schema: UserSchemaValidation,
    type: Type.BODY,
  }),
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
