import { Router, type Router as ExpressRouter } from "express";

import {
  login,
  logout,
  me
} from "@controllers/auth.controller";

import {
  authenticate
} from "@middleware/auth.middleware";

const router: ExpressRouter = Router();

/**
 * ==========================================================
 * Authentication Routes
 * ==========================================================
 */

/**
 * POST /api/v1/auth/login
 */
router.post("/login", login);

/**
 * POST /api/v1/auth/logout
 */
router.post("/logout", authenticate, logout);

/**
 * GET /api/v1/auth/me
 */
router.get("/me", authenticate, me);

export default router;