import { Request, Response } from "express";

import fs from "node:fs/promises";
import path from "node:path";

import Page, { PageStatus } from "@models/Page";
import User from "@models/User";
import { HTTP_STATUS } from "@constants/httpStatus";
import logger from "@utils/logger";

/**
 * ==========================================================
 * Dashboard Statistics
 * ==========================================================
 */

export const getDashboardStats = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Count uploaded media files
    const uploadDirectory = path.resolve("src/uploads");
    const mediaFiles = await fs.readdir(uploadDirectory);
    const totalMedia = mediaFiles.length;

    const [
      totalUsers,
      activeUsers,
      totalPages,
      publishedPages,
      draftPages,
      archivedPages,
      recentPages
    ] = await Promise.all([
      User.countDocuments(),

      User.countDocuments({
        isActive: true
      }),

      Page.countDocuments(),

      Page.countDocuments({
        status: PageStatus.PUBLISHED
      }),

      Page.countDocuments({
        status: PageStatus.DRAFT
      }),

      Page.countDocuments({
        status: PageStatus.ARCHIVED
      }),

      Page.find()
        .populate(
          "author",
          "firstName lastName email"
        )
        .sort({
          createdAt: -1
        })
        .limit(5)
    ]);

    return res.status(HTTP_STATUS.OK).json({
      success: true,

      data: {
        users: {
          total: totalUsers,
          active: activeUsers
        },

        pages: {
          total: totalPages,
          published: publishedPages,
          draft: draftPages,
          archived: archivedPages
        },

        media: {
          total: totalMedia
        },

        recentPages
      }
    });
  } catch (error) {
    logger.error(
      "Failed to fetch dashboard statistics",
      error
    );

    return res
      .status(
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      )
      .json({
        success: false,
        message:
          "Unable to load dashboard statistics."
      });
  }
};