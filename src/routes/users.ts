import express from "express";
import { UserController } from "../controllers/userController";
import { validate } from "../middleware/validation";
import {
  createUserSchema,
  updateUserSchema,
} from "../validations/user.validation";

const router = express.Router();

router.get("/", UserController.getAllUsers);

router.get("/:userId", UserController.getUserById);

router.post("/", validate(createUserSchema, "body"), UserController.createUser);

router.put(
  "/:userId",
  validate(updateUserSchema, "body"),
  UserController.updateUser
);

router.delete("/:userId", UserController.deleteUser);

export default router;
