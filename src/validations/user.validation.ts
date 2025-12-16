import Joi from "joi";

export const UserSchemaValidation = Joi.object({
  name: Joi.string().trim().min(2).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "any.required": "Name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),

  role: Joi.string().valid("admin", "user", "student").default("user"),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(2).optional(),
  email: Joi.string().email().optional().messages({
    "string.email": "Please provide a valid email",
  }),
  password: Joi.string().min(6).optional().messages({
    "string.min": "Password must be at least 6 characters",
  }),
  role: Joi.string().valid("admin", "user", "student").optional(),
});
