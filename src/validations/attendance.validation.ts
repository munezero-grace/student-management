import Joi from "joi";

export const createAttendanceSchema = Joi.object({
  studentId: Joi.string().uuid().required().messages({
    "string.empty": "Student ID is required",
    "string.guid": "Student ID must be a valid UUID",
    "any.required": "Student ID is required",
  }),
  date: Joi.string()
    .isoDate()
    .required()
    .messages({
      "string.empty": "Date is required",
      "string.isoDate": "Date must be in ISO format (YYYY-MM-DD)",
      "any.required": "Date is required",
    }),
  status: Joi.string()
    .valid("present", "absent")
    .required()
    .messages({
      "any.only": "Status must be either 'present' or 'absent'",
      "any.required": "Status is required",
    }),
});

export const updateAttendanceSchema = Joi.object({
  studentId: Joi.string().uuid().optional(),
  date: Joi.string().isoDate().optional(),
  status: Joi.string().valid("present", "absent").optional(),
});
