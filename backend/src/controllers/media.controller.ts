import fs from "node:fs/promises";
import path from "node:path";

import { Request, Response } from "express";

import { HTTP_STATUS } from "../constants/httpStatus";
import logger from "../utils/logger";

const uploadDirectory = path.resolve("src/uploads");

/**
 * ==========================================================
 * Upload File
 * ==========================================================
 */

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.file) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "No file uploaded."
      });
    }

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "File uploaded successfully.",
      data: {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: `/uploads/${req.file.filename}`
      }
    });
  } catch (error) {
    logger.error("File upload failed", error);

    return res.status(
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    ).json({
      success: false,
      message: "Unable to upload file."
    });
  }
};

/**
 * ==========================================================
 * List Uploaded Files
 * ==========================================================
 */

export const getFiles = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const fileNames = await fs.readdir(uploadDirectory);

    const files = await Promise.all(
      fileNames.map(async (fileName) => {
        const filePath = path.join(uploadDirectory, fileName);
        const stat = await fs.stat(filePath);

        const extension = path.extname(fileName).toLowerCase();

        let mimeType = "application/octet-stream";

        if ([".jpg", ".jpeg"].includes(extension))
          mimeType = "image/jpeg";
        else if (extension === ".png")
          mimeType = "image/png";
        else if (extension === ".gif")
          mimeType = "image/gif";
        else if (extension === ".webp")
          mimeType = "image/webp";
        else if (extension === ".svg")
          mimeType = "image/svg+xml";
        else if (extension === ".mp4")
          mimeType = "video/mp4";
        else if (extension === ".pdf")
          mimeType = "application/pdf";

        return {
          id: fileName,
          filename: fileName,
          originalName: fileName,
          url: `/uploads/${fileName}`,
          mimeType,
          size: stat.size,
          uploadedBy: "Admin",
          createdAt: stat.birthtime
        };
      })
    );

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: files
    });
  } catch (error) {
    logger.error("Unable to read uploads directory", error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Unable to fetch uploaded files."
    });
  }
};
/**
 * ==========================================================
 * Delete File
 * ==========================================================
 */

export const deleteFile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const fileName = req.params.fileName as string;
    const filePath = path.join(
      uploadDirectory,
      fileName
    );

    await fs.unlink(filePath);

    logger.info(`Deleted file: ${fileName}`);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "File deleted successfully."
    });
  } catch (error) {
    logger.error("Delete file failed", error);

    return res.status(
      HTTP_STATUS.NOT_FOUND
    ).json({
      success: false,
      message: "File not found."
    });
  }
};