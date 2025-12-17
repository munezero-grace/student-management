import { UserInterface } from "../types";
import { UserModel } from "../models";
import { hashPassword } from "../utils/lib";

export class UserService {
  async userExists(email: string): Promise<boolean> {
    const exists = await UserModel.exists({ email });
    return !!exists;
  }

  async createUser(user: UserInterface) {
    const hashedPassword = await hashPassword(user.password);

    const newUser = await UserModel.create({
      ...user,
      email: user.email.toLowerCase().trim(),
      role: "user",
      password: hashedPassword,
    });

    const obj = newUser.toObject();
    delete (obj as any).password;

    return obj;
  }

  async getAllUsers() {
    return UserModel.find().select("-password").exec();
  }
  async getUser({ email }: { email: string }) {
    return UserModel.findOne({ email: email.toLowerCase().trim() })
      .select("+password")
      .exec();
  }

  async getUserById(id: string) {
    return UserModel.findById(id).select("-password").exec();
  }
}
