import { Request } from "express";

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface CreateUserRequest extends Request {
  body: Partial<UserInterface>;
}

export interface GetUserIdParamsReq extends Request {
  params: {
    userId: string;
  };
}

export interface UpdateUserRequest extends Request {
  params: {
    userId: string;
  };
  body: Partial<UserInterface>;
}
