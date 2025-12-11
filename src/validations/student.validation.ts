import Joi from "joi";

export const studentSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().required(),
  isActive: Joi.boolean().required(),
});
