import Joi from "joi";

export const leaveSchema = Joi.object({
  date: Joi.string().isoDate().required().messages({
    "string.empty": "Date is required",
    "string.isoDate": "Date must be a valid ISO date",
    "any.required": "Date is required",
  }),

  reason: Joi.string().trim().max(100).optional().messages({
    "string.max": "Reason must be at most 100 characters",
  }),
});

export default leaveSchema;
