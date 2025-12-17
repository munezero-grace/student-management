import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { ResponseService } from "../utils";

const responseService = new ResponseService();

export enum Type {
  BODY = "body",
  PARAMS = "params",
  QUERY = "query",
}

interface JoiRequestType<T> {
  schema: ObjectSchema<T>;
  type: Type;
}

export const validationMiddleware = <T>({ schema, type }: JoiRequestType<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[type];

    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return responseService.response({
        res,
        statusCode: 400,
        message: "Validation error",
        data: error.details.map((d) => d.message),
        success: false,
      });
    }

    (req as any)[type] = value;

    return next();
  };
};
