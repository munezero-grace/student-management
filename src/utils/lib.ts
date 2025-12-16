import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { config } from "../config";

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = async (
  db_password: string,
  password: string
): Promise<boolean> => {
  return bcrypt.compare(password, db_password);
};

export interface GenerateTokenPayload {
  id: string;
  role: "admin" | "user" | "student";
}

export const generateToken = ({ id, role }: GenerateTokenPayload): string => {
  return jwt.sign(
    { id, role },              // ✅ standardize: use id (not sub)
    config.jwtSecret,
    { expiresIn: "1h" }        // ✅ use "1h"
  );
};

export interface DecodedTokenPayload {
  id: string;
  role: "admin" | "user";
  iat: number;
  exp: number;
}

export const validateToken = (token: string): DecodedTokenPayload => {
  // ✅ throws if invalid/expired — middleware catch will return 401
  return jwt.verify(token, config.jwtSecret) as DecodedTokenPayload;
};
