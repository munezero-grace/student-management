import express, { Router } from "express";

import { LoginValidation } from "../schemas";
import { Type, validationMiddleware } from "../middlewares";
import { AuthController } from "../controllers/authController";
const authController = new AuthController();
const authRoute: Router = express.Router();
authRoute.post(
  "/auth/login",
  validationMiddleware({
    schema: LoginValidation,
    type: Type["BODY"],
  }),
  authController.login
);

export { authRoute };