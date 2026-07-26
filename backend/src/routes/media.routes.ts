import { Router, type Router as ExpressRouter } from "express";

import {
  deleteFile,
  getFiles,
  uploadFile
} from "../controllers/media.controller";

import {
  authenticate,
  authorize
} from "../middleware/auth.middleware";

import upload from "../middleware/upload.middleware";

const router: ExpressRouter = Router();

/**
 * ==========================================================
 * Media Routes
 * ==========================================================
 */

/**
 * GET /api/v1/media
 * List uploaded files
 */
router.get(
  "/",
  authenticate,
  getFiles
);

/**
 * POST /api/v1/media/upload
 * Upload a single file
 */
router.post(
  "/upload",
  authenticate,
  authorize("ADMIN", "EDITOR"),
  upload.single("file"),
  uploadFile
);

/**
 * DELETE /api/v1/media/:fileName
 * Delete a file
 */
router.delete(
  "/:fileName",
  authenticate,
  authorize("ADMIN"),
  deleteFile
);

export default router;