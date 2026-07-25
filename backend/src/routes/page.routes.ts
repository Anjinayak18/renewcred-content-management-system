import { Router, type Router as ExpressRouter } from "express";

import {
  createPage,
  deletePage,
  getPageBySlug,
  getPages,
  publishPage,
  updatePage
} from "@controllers/page.controller";

import {
  authenticate,
  authorize
} from "@middleware/auth.middleware";

const router: ExpressRouter = Router();

/**
 * ==========================================================
 * Page Routes
 * ==========================================================
 */

/**
 * GET /api/v1/pages
 * Get all pages
 */
router.get(
  "/",
  authenticate,
  getPages
);

/**
 * GET /api/v1/pages/:slug
 * Get page by slug
 */
router.get(
  "/:slug",
  authenticate,
  getPageBySlug
);

/**
 * POST /api/v1/pages
 * Create page
 */
router.post(
  "/",
  authenticate,
  authorize("ADMIN", "EDITOR"),
  createPage
);

/**
 * PUT /api/v1/pages/:id
 * Update page
 */
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN", "EDITOR"),
  updatePage
);

/**
 * PATCH /api/v1/pages/:id/publish
 * Publish page
 */
router.patch(
  "/:id/publish",
  authenticate,
  authorize("ADMIN", "EDITOR"),
  publishPage
);

/**
 * DELETE /api/v1/pages/:id
 * Delete page
 */
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deletePage
);

export default router;