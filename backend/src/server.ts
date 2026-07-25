import http from "node:http";

import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";

const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // Create HTTP Server
    const server = http.createServer(app);

    // Start Listening
    server.listen(env.PORT, () => {
      console.log("========================================");
      console.log("🚀 RenewCred CMS Backend");
      console.log("========================================");
      console.log(`Environment : ${env.NODE_ENV}`);
      console.log(`Server      : http://localhost:${env.PORT}`);
      console.log(`API Base    : http://localhost:${env.PORT}/api/v1`);
      console.log("========================================");
    });

    // Graceful Shutdown
    const shutdown = (signal: string) => {
      console.log(`\n${signal} received. Shutting down...`);

      server.close(() => {
        console.log("HTTP Server Closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Failed to start application");
    console.error(error);
    process.exit(1);
  }
};

startServer();