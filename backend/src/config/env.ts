import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z
    .string()
    .default("5000")
    .transform((value) => Number(value)),

  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),

  JWT_SECRET: z.string().min(32, "JWT_SECRET should be at least 32 characters"),

  JWT_EXPIRES_IN: z.string().default("7d"),

  CORS_ORIGIN: z.string().default("http://localhost:3000"),

  RATE_LIMIT_WINDOW_MS: z
    .string()
    .default("900000")
    .transform((value) => Number(value)),

  RATE_LIMIT_MAX_REQUESTS: z
    .string()
    .default("100")
    .transform((value) => Number(value)),

  MAX_FILE_SIZE: z
    .string()
    .default("5242880")
    .transform((value) => Number(value))
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables\n");

  console.error(parsedEnv.error.flatten().fieldErrors);

  process.exit(1);
}

export const env = parsedEnv.data as z.infer<typeof envSchema>;