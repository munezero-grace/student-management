import { UserInterface } from "../types";
import { UserModel } from "../models";

export class UserService {
  async userExists(email: string): Promise<boolean> {
    const exists = await UserModel.exists({ email });
    return !!exists;
  }

  async createUser(user: UserInterface) {
    // ✅ create() already saves
    const newUser = await UserModel.create(user);

    // Convert to plain object so we can safely remove password
    const obj = newUser.toObject();
    delete (obj as any).password;

    return obj;
  }

  async getAllUsers() {
    return UserModel.find().select("-password").exec();
  }

  async getUser({ email }: { email: string }) {
    // ✅ returns password too (needed for login compare)
    return UserModel.findOne({ email }).exec();
  }

  async getUserById(id: string) {
    return UserModel.findById(id).select("-password").exec(); // ✅ safer default
  }
}
