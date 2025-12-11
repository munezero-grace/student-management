import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export type ValidationSource = "body" | "query" | "params";

export function validate(
  schema: ObjectSchema,
  source: ValidationSource = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {

    const data = req[source];

    
    const { error, value } = schema.validate(data);

  
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0]?.message || "Invalid input",
      });
    }

    
    req[source] = value;
    next();
  };
}
