import joi, { ObjectSchema } from "joi";
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

export const validationMiddleware = <T>({
  schema,
  type,
}: JoiRequestType<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[type];
    const validates = schema.validate(data);
    if (validates.error) {
      responseService.response({
        res,
        statusCode: 400,
        data: validates.error.details,
        success: false,
      });
    }
    next();
  };
};