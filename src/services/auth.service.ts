import { generateToken } from "../utils/lib";

export class AuthService {
  async loginService(user: { _id: string; role: string }): Promise<string> {
    return generateToken({ id: user._id, role: user.role });
  }
}
