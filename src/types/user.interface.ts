import { Request } from "express";

export type UserRole = "admin" | "user" | "student";
export type Gender = "male" | "female" | "other";

export interface UserInterface {
  // Mongo returns _id. We keep both optional so TS won't fight you.
  _id?: string;
  id?: string;

  name: string;
  email: string;
  password: string;

  role?: UserRole;        // ✅ matches user.model.ts
  gender?: Gender;        // ✅ FIX for your error
  isActive?: boolean;     // ✅ matches user.model.ts

  createdAt?: Date;       // mongoose timestamps
  updatedAt?: Date;

  // you can keep this if you plan soft delete later (optional)
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
