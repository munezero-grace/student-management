import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { HTTP_BAD_REQUEST } from "../constants/response/httpStatusCode";

export type ValidationSource = "body" | "query" | "params";

export function validate(
  schema: ObjectSchema,
  source: ValidationSource = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[source];

    const { error, value } = schema.validate(data);

    if (error) {
      const messages = error.details.map((detail: any) => detail.message);
      return res.status(HTTP_BAD_REQUEST).json({
        status: "error",
        message: "Validation failed",
        errors: messages,
      });
    }

    req[source] = value;
    next();
  };
}
