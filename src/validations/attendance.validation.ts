import Joi from "joi";

const objectId = Joi.string().hex().length(24).messages({
  "string.length": "ID must be a valid MongoDB ObjectId",
  "string.hex": "ID must be a valid MongoDB ObjectId",
});

export const createAttendanceSchema = Joi.object({
  studentId: objectId.required().messages({
    "any.required": "Student ID is required",
  }),

  date: Joi.string().isoDate().required().messages({
    "string.empty": "Date is required",
    "string.isoDate": "Date must be a valid ISO date",
    "any.required": "Date is required",
  }),

  status: Joi.string()
    .valid("present", "absent", "late", "excused")
    .required()
    .messages({
      "any.only": "Status must be one of: present, absent, late, excused",
      "any.required": "Status is required",
    }),
});

export const updateAttendanceSchema = Joi.object({
  studentId: objectId.optional(),
  date: Joi.string().isoDate().optional(),
  status: Joi.string().valid("present", "absent", "late", "excused").optional(),
});
