import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { env } from "../config/env";
import { HTTP_STATUS } from "../constants/httpStatus";
import logger from "../utils/logger";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

interface TokenPayload extends JwtPayload {
  userId: string;
}

/**
 * ==========================================================
 * Authentication Middleware
 * ==========================================================
 */

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Authentication token is required."
      });
    }

    const token = authHeader.split(" ")[1] as string;

    if (!env.JWT_SECRET) {
      logger.error("JWT_SECRET is not configured");
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Server configuration error."
      });
    }

    const jwtSecret: string = env.JWT_SECRET as any;
    const decoded = jwt.verify(token, jwtSecret) as unknown as TokenPayload;

    const user = await User.findById(decoded.userId);

if (!user) {
  return res.status(401).json({
    success: false,
    message: "User not found."
  });
}

req.user = {
  userId: user.id,
  role: user.role
};

next();
  } catch (error) {
    logger.warn("Invalid or expired JWT token", error);

    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Invalid or expired authentication token."
    });
  }
};

/**
 * ==========================================================
 * Authorization Middleware
 * ==========================================================
 */

export const authorize =
  (...roles: string[]) =>
  (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const role = (req as any).user?.role;

    if (!role || !roles.includes(role)) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: "You do not have permission to access this resource."
      });
    }

    next();
  };