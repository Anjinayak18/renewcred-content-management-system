import fs from "node:fs";
import path from "node:path";

import multer from "multer";

import { env } from "../config/env";
const uploadDirectory = path.resolve("src/uploads");

/**
 * ==========================================================
 * Create Upload Directory
 * ==========================================================
 */

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true
  });
}

/**
 * ==========================================================
 * Storage
 * ==========================================================
 */

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (_req, file, cb) => {
    const timestamp = Date.now();

    const extension = path.extname(file.originalname);

    const baseName = path
      .basename(file.originalname, extension)
      .replace(/\s+/g, "-")
      .toLowerCase();

    cb(
      null,
      `${timestamp}-${baseName}${extension}`
    );
  }
});

/**
 * ==========================================================
 * Allowed File Types
 * ==========================================================
 */

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",

  "application/pdf",

  "application/msword",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

/**
 * ==========================================================
 * File Filter
 * ==========================================================
 */

const fileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  cb
) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Unsupported file type."
    )
  );
};

/**
 * ==========================================================
 * Multer Instance
 * ==========================================================
 */

export const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: env.MAX_FILE_SIZE
  }
});

export default upload;