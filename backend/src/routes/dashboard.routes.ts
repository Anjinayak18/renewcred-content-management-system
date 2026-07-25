import { Router, type Router as ExpressRouter } from "express";

import { getDashboardStats } from "@controllers/dashboard.controller";

import {
  authenticate,
  authorize
} from "@middleware/auth.middleware";

const router: ExpressRouter = Router();

/**
 * ==========================================================
 * Dashboard Routes
 * ==========================================================
 */

/**
 * GET /api/v1/dashboard
 * Dashboard statistics
 */
router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  getDashboardStats
);

export default router;