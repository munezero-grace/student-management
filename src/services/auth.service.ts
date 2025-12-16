import { generateToken } from "../utils/lib";

export type JwtRole = "admin" | "user" | "student";

export interface LoginTokenPayload {
  id: string;
  role: JwtRole;
}

export class AuthService {
  async loginService(user: LoginTokenPayload): Promise<string> {
    // Keep the token payload small and consistent across the app
    return generateToken({
      id: user.id,
      role: user.role,
    });
  }
}
