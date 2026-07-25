import mongoose from "mongoose";
import { env } from "./env.js";

let isConnected = false;

/**
 * ==========================================================
 * Connect MongoDB
 * ==========================================================
 */
export const connectDatabase = async (): Promise<void> => {
  if (isConnected) {
    console.log("📦 MongoDB already connected.");
    return;
  }

  try {
    mongoose.set("strictQuery", true);

    const connection = await mongoose.connect(env.MONGODB_URI, {
      autoIndex: env.NODE_ENV !== "production",
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      minPoolSize: 2,
      retryWrites: true,
    });

    isConnected = true;

    console.log("========================================");
    console.log("🍃 MongoDB Connected Successfully");
    console.log("========================================");
    console.log(`Database : ${connection.connection.name}`);
    console.log(`Host     : ${connection.connection.host}`);
    console.log("========================================");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);

    process.exit(1);
  }
};

/**
 * ==========================================================
 * MongoDB Events
 * ==========================================================
 */

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connection established.");
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected.");
  isConnected = false;
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB reconnected.");
  isConnected = true;
});

mongoose.connection.on("error", (error) => {
  console.error("❌ MongoDB error:", error);
});

/**
 * ==========================================================
 * Graceful Shutdown
 * ==========================================================
 */

const closeDatabase = async (): Promise<void> => {
  try {
    await mongoose.connection.close();

    console.log("📦 MongoDB connection closed.");

    process.exit(0);
  } catch (error) {
    console.error("Error while closing MongoDB connection:", error);

    process.exit(1);
  }
};

process.on("SIGINT", closeDatabase);
process.on("SIGTERM", closeDatabase);