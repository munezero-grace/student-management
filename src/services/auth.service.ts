import { generateToken, JwtRole } from "../utils/lib";

export interface LoginTokenPayload {
  id: string;
  role: JwtRole;
}

export class AuthService {
  async loginService(user: LoginTokenPayload): Promise<string> {
    return generateToken({ id: user.id, role: user.role });
  }
}
