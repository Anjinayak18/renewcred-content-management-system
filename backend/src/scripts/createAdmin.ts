import mongoose from "mongoose";
import dotenv from "dotenv";

import User, { UserRole } from "../models/User.js";

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const existing = await User.findOne({
      email: "admin@renewcred.com",
    });

    if (existing) {
      console.log("✅ Admin user already exists.");
      process.exit(0);
    }

    await User.create({
      firstName: "Admin",
      lastName: "User",
      email: "admin@renewcred.com",
      password: "Admin@123",
      role: UserRole.ADMIN,
      isActive: true,
    });

    console.log("✅ Admin user created successfully.");
    console.log("Email: admin@renewcred.com");
    console.log("Password: Admin@123");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();