import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/User";
import { env } from "../config/env";
import { HTTP_STATUS } from "../constants/httpStatus";
import logger from "../utils/logger";

const generateToken = (userId: string): string => {
  const jwtSecret: string = env.JWT_SECRET as any;
  const expiresIn: string | number = env.JWT_EXPIRES_IN as any;
  
  return jwt.sign(
    { userId },
    jwtSecret,
    { expiresIn } as any
  );
};

/**
 * ==========================================================
 * Login
 * ==========================================================
 */

export const login = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase()
    }).select("+password");

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    if (!user.isActive) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: "Your account has been deactivated."
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    user.lastLogin = new Date();

    await user.save();

    const token = generateToken(user.id);

    logger.info(`User logged in: ${user.email}`);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    logger.error("Login failed", error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Unable to login."
    });
  }
};

/**
 * ==========================================================
 * Logout
 * ==========================================================
 */

export const logout = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Logout successful."
  });
};

/**
 * ==========================================================
 * Current User
 * ==========================================================
 */

export const me = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = (req as any).user?.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "User not found."
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    logger.error("Unable to fetch current user", error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong."
    });
  }
};