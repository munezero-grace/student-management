import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { config } from "../config";

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};
interface GenerateTokenPayload {
  id: string;
  role: string;
}

export const comparePassword = async (
  db_password: string,
  password: string
): Promise<boolean> => {
  return await bcrypt.compare(password, db_password);
};
export const generateToken = async ({ id, role }: GenerateTokenPayload) => {
  return jwt.sign(
    {
      sub: id,
      role,
    },
    config.jwtSecret,
    { expiresIn: "1hr" }
  );
};

export const validateToken = async (token: string) => {
  return
  
};