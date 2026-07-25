import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";




dotenv.config();

const app: Application = express();

/**
 * ==========================================================
 * Security Middleware
 * ==========================================================
 */

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

/**
 * ==========================================================
 * CORS
 * ==========================================================
 */

const allowedOrigins =
  process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()) || [];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

/**
 * ==========================================================
 * Request Parsing
 * ==========================================================
 */

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * ==========================================================
 * Compression
 * ==========================================================
 */

app.use(compression());

/**
 * ==========================================================
 * Logging
 * ==========================================================
 */

app.use(morgan("dev"));

/**
 * ==========================================================
 * Rate Limiting
 * ==========================================================
 */

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", limiter);

/**
 * ==========================================================
 * Static Uploads
 * ==========================================================
 */

app.use("/uploads", express.static("src/uploads"));

/**
 * ==========================================================
 * Root Route
 * ==========================================================
 */

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "RenewCred CMS API is running.",
    version: "v1",
  });
});

/**
 * ==========================================================
 * Health Check
 * ==========================================================
 */

app.get("/api/v1/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/**
 * ==========================================================
 * API Routes
 * ==========================================================
 */

// Authentication
app.use("/api/v1/auth", authRoutes);

// Future Routes
import pageRoutes from "./routes/page.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import userRoutes from "./routes/user.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

app.use("/api/v1/pages", pageRoutes);
app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
/**
 * ==========================================================
 * API Root
 * ==========================================================
 */

app.get("/api/v1", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "RenewCred CMS API v1",
  });
});

/**
 * ==========================================================
 * 404 Handler
 * ==========================================================
 */

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

/**
 * ==========================================================
 * Global Error Handler
 * ==========================================================
 */

app.use(
  (
    err: Error,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: express.NextFunction
  ) => {
    console.error(err);

    res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : err.message,
    });
  }
);

export default app;