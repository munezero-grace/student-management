import dotenv from "dotenv";
dotenv.config();

import { databaseconnection } from "../src/config/database";
import { UserModel } from "../src/models";
import { hashPassword } from "../src/utils/lib";

async function run() {
  try {
    await databaseconnection();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error("Missing ADMIN_EMAIL / ADMIN_PASSWORD in .env");
    }

    const email = adminEmail.toLowerCase().trim();

    const existing = await UserModel.findOne({ email }).exec();
    if (existing) {
      console.log(`✅ Admin already exists: ${email}`);
      process.exit(0);
    }

    const hashedPassword = await hashPassword(adminPassword);

    await UserModel.create({
      name: "Administrator",
      email,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    console.log(`✅ Admin created: ${email}`);
    process.exit(0);
  } catch (err: any) {
    console.error("❌ Failed to seed admin:", err?.message || err);
    process.exit(1);
  }
}

run();
