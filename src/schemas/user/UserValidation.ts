import joi from "joi";
import { LoginInterface, UserInterface } from "../../types";
import { email } from "zod";

export const UserSchemaValidation = joi.object<UserInterface>({
  name: joi
    .string()
    .min(4)
    .messages({
      "any.min": "User Must Have name with more than 4 letters",
    })
    .presence("required"),
  email: joi.string().email().presence("required"),
  password: joi.string().regex(RegExp("^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$")),
  gender: joi.string(),
  isActive: joi.boolean().default(true).presence("optional"),
});

export const LoginValidation = joi.object<LoginInterface>({
  email: joi.string().email().presence("required"),
  password: joi.string().required(),
});