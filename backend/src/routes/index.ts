import { Router, type Router as ExpressRouter } from "express";

const router: ExpressRouter = Router();

/**
 * ==========================================================
 * Health Check
 * ==========================================================
 */

router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "RenewCred CMS API v1",
    version: "1.0.0",
  });
});

/**
 * ==========================================================
 * Feature Routes
 * ==========================================================
 *
 * These routes will be implemented next.
 */

router.use("/auth", (_req, res) => {
  res.json({
    success: true,
    module: "Authentication Module",
    status: "Coming Soon",
  });
});

router.use("/users", (_req, res) => {
  res.json({
    success: true,
    module: "Users Module",
    status: "Coming Soon",
  });
});

router.use("/pages", (_req, res) => {
  res.json({
    success: true,
    module: "Pages Module",
    status: "Coming Soon",
  });
});

router.use("/media", (_req, res) => {
  res.json({
    success: true,
    module: "Media Module",
    status: "Coming Soon",
  });
});

router.use("/dashboard", (_req, res) => {
  res.json({
    success: true,
    module: "Dashboard Module",
    status: "Coming Soon",
  });
});

/**
 * ==========================================================
 * API 404
 * ==========================================================
 */

router.use("*", (_req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found.",
  });
});

export default router;