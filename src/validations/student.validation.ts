import Joi from "joi";

export const studentSchema = Joi.object({
  name: Joi.string().trim().min(2).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "any.required": "Name is required",
  }),

  age: Joi.number().integer().min(1).max(120).required().messages({
    "number.base": "Age must be a number",
    "number.integer": "Age must be an integer",
    "number.min": "Age must be at least 1",
    "number.max": "Age must be at most 120",
    "any.required": "Age is required",
  }),

  isActive: Joi.boolean().required().messages({
    "boolean.base": "isActive must be a boolean",
    "any.required": "isActive is required",
  }),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().trim().min(2).optional(),
  age: Joi.number().integer().min(1).max(120).optional(),
  isActive: Joi.boolean().optional(),
});
