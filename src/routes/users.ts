import express from "express";
import { UserController } from "../controllers/userController";
import { validate } from "../middleware/validation";
import {
  createUserSchema,
  updateUserSchema,
} from "../validations/user.validation";

const router = express.Router();

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Public
 */
router.get("/", UserController.getAllUsers);

/**
 * @route   GET /api/users/:userId
 * @desc    Get user by ID
 * @access  Public
 */
router.get("/:userId", UserController.getUserById);

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Public
 * @body    { name, email, password }
 */
router.post("/", validate(createUserSchema, "body"), UserController.createUser);

/**
 * @route   PUT /api/users/:userId
 * @desc    Update user by ID
 * @access  Public
 * @body    { name?, email?, password? }
 */
router.put(
  "/:userId",
  validate(updateUserSchema, "body"),
  UserController.updateUser
);

/**
 * @route   DELETE /api/users/:userId
 * @desc    Delete user by ID
 * @access  Public
 */
router.delete("/:userId", UserController.deleteUser);

export default router;
