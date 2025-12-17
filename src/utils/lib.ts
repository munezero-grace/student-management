import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { config } from "../config";

export type JwtRole = "admin" | "user" | "student";

export interface JwtPayloadShape {
  id: string;
  role: JwtRole;
  iat?: number;
  exp?: number;
}

const getJwtSecret = (): string => {
  const secret = config.jwtSecret;
  if (!secret) throw new Error("JWT secret is missing. Set JWT_SECRET in .env");
  return secret;
};

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePassword = (
  db_password: string,
  password: string
): Promise<boolean> => {
  return bcrypt.compare(password, db_password);
};

export const generateToken = ({
  id,
  role,
}: {
  id: string;
  role: JwtRole;
}): string => {
  return jwt.sign({ id, role }, getJwtSecret(), { expiresIn: "1h" });
};

export const validateToken = (token: string): JwtPayloadShape => {
  // throws if invalid/expired → your middleware catch handles it
  const decoded = jwt.verify(token, getJwtSecret());
  return decoded as JwtPayloadShape;
};
