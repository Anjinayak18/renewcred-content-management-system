import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { HTTP_STATUS } from "@constants/httpStatus";

/**
 * ==========================================================
 * Login Schema
 * ==========================================================
 */

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required."
    })
    .email("Please enter a valid email address.")
    .trim()
    .toLowerCase(),

  password: z
    .string({
      required_error: "Password is required."
    })
    .min(8, "Password must be at least 8 characters.")
});

/**
 * ==========================================================
 * Login Validator
 * ==========================================================
 */

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Validation failed.",
      errors: result.error.flatten().fieldErrors
    });
  }

  req.body = result.data;

  next();
};