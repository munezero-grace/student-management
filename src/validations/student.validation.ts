import Joi from "joi";

export const studentSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  age: Joi.number().integer().min(1).required().messages({
    "number.base": "Age must be a number",
    "number.integer": "Age must be an integer",
    "number.min": "Age must be at least 1",
    "any.required": "Age is required",
  }),
  isActive: Joi.boolean().required().messages({
    "boolean.base": "isActive must be a boolean",
    "any.required": "isActive is required",
  }),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().trim().optional(),
  age: Joi.number().integer().min(1).optional(),
  isActive: Joi.boolean().optional(),
});
