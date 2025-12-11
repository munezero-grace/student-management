import { database, writeFile } from "../database";
import { UserInterface } from "../types/user.interface";
import { v4 as uuidv4 } from "uuid";

export class UserService {
  static getAllUsers(): UserInterface[] {
    try {
      const db = JSON.parse(database());
      return db.users || [];
    } catch (error) {
      throw new Error("Failed to retrieve users");
    }
  }

  static getUserById(userId: string): UserInterface | null {
    try {
      const db = JSON.parse(database());
      const user = db.users.find((user: UserInterface) => user.id === userId);
      return user || null;
    } catch (error) {
      throw new Error("Failed to retrieve user");
    }
  }

  static createUser(userData: Partial<UserInterface>): UserInterface {
    try {
      const db = JSON.parse(database());

      const existingUser = db.users.find(
        (user: UserInterface) => user.email === userData.email
      );
      if (existingUser) {
        throw new Error("Email already exists");
      }

      const newUser: UserInterface = {
        id: uuidv4(),
        name: userData.name!,
        email: userData.email!,
        password: userData.password!,
        createdAt: new Date(),
      };

      db.users.push(newUser);
      writeFile(db);

      return newUser;
    } catch (error: any) {
      throw new Error(error.message || "Failed to create user");
    }
  }

  static updateUser(
    userId: string,
    updateData: Partial<UserInterface>
  ): UserInterface | null {
    try {
      const db = JSON.parse(database());
      const userIndex = db.users.findIndex(
        (user: UserInterface) => user.id === userId
      );

      if (userIndex === -1) {
        return null;
      }

      if (updateData.email && updateData.email !== db.users[userIndex].email) {
        const emailExists = db.users.some(
          (user: UserInterface) =>
            user.email === updateData.email && user.id !== userId
        );
        if (emailExists) {
          throw new Error("Email already exists");
        }
      }

      const updatedUser = {
        ...db.users[userIndex],
        ...updateData,
        updatedAt: new Date(),
      };

      db.users[userIndex] = updatedUser;
      writeFile(db);

      return updatedUser;
    } catch (error: any) {
      throw new Error(error.message || "Failed to update user");
    }
  }

  static deleteUser(userId: string): boolean {
    try {
      const db = JSON.parse(database());
      const userIndex = db.users.findIndex(
        (user: UserInterface) => user.id === userId
      );

      if (userIndex === -1) {
        return false;
      }

      db.users.splice(userIndex, 1);
      writeFile(db);

      return true;
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  }

  static getUserByEmail(email: string): UserInterface | null {
    try {
      const db = JSON.parse(database());
      const user = db.users.find((user: UserInterface) => user.email === email);
      return user || null;
    } catch (error) {
      throw new Error("Failed to retrieve user");
    }
  }
}
