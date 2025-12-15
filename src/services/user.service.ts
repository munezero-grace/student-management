import { UserInterface } from "../types";
import { UserModal } from "../models";

export class UserService {
  userExists = async (email: string): Promise<boolean> => {
    const userExist = await UserModal.exists({ email });
    return !!userExist;
  };

  createUser = async (user: UserInterface) => {
    const newUser = await UserModal.create({ ...user });
    await newUser.save();

    const obj = newUser.toObject ? newUser.toObject() : newUser;
    if (obj.password) delete obj.password;
    return obj;
  };

  getAllUsers = async () => {
    const alluser = await UserModal.find().select("-password").exec();
    return alluser;
  };

  async getUser({ email }: { email: string }) {
    return await UserModal.findOne({ email }).exec();
  }

  async getUserById(id: string) {
    return await UserModal.findById(id).exec();
  }
}
