import { Request, Response } from "express";

import Page, { PageStatus } from "../models/Page";
import { HTTP_STATUS } from "../constants/httpStatus";
import logger from "../utils/logger";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

/**
 * ==========================================================
 * Create Page
 * ==========================================================
 */

export const createPage = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const {
      title,
      slug,
      content,
      status,
      description,
      seo,
      featuredImage,
    } = req.body;

    console.log("========== CREATE PAGE ==========");
    console.log("USER :", req.user);
    console.log("BODY :", req.body);

    if (!title || !slug || !content) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Title, slug and content are required.",
      });
    }

    const existing = await Page.findOne({ slug });

    if (existing) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Slug already exists.",
      });
    }

    const page = await Page.create({
      title: title.trim(),

      slug: slug.trim().toLowerCase(),

      description: description ?? "",

      content:
        typeof content === "string"
          ? [
              {
                type: "text",
                content,
                order: 0,
              },
            ]
          : content,

      seo:
        seo ?? {
          metaTitle: title,
          metaDescription: description ?? "",
          keywords: [],
        },

      status:
        status === "published"
          ? PageStatus.PUBLISHED
          : PageStatus.DRAFT,

      featuredImage: featuredImage ?? "",

      author: req.user!.userId,
    });

    logger.info(`Page created : ${page.title}`);

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Page created successfully.",
      data: page,
    });
  } catch (error: any) {
    console.error("==============================");
    console.error("CREATE PAGE ERROR");
    console.error(error);

    if (error.errors) {
      console.error(error.errors);
    }

    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: error.message,
      errors: error.errors ?? null,
    });
  }
};

/**
 * ==========================================================
 * Get Pages
 * ==========================================================
 */

export const getPages = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const pages = await Page.find()
      .populate("author", "firstName lastName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: pages,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ==========================================================
 * Get Page By Slug
 * ==========================================================
 */

export const getPageBySlug = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const page = await Page.findOne({
      slug: req.params.slug,
    }).populate("author", "firstName lastName email");

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found.",
      });
    }

    return res.json({
      success: true,
      data: page,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ==========================================================
 * Update Page
 * ==========================================================
 */

export const updatePage = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  try {
    const page = await Page.findById(req.params.id);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found.",
      });
    }

    Object.assign(page, req.body);

    await page.save();

    return res.json({
      success: true,
      data: page,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ==========================================================
 * Delete Page
 * ==========================================================
 */

export const deletePage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await Page.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: "Page deleted successfully.",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ==========================================================
 * Publish Page
 * ==========================================================
 */

export const publishPage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const page = await Page.findByIdAndUpdate(
      req.params.id,
      {
        status: PageStatus.PUBLISHED,
      },
      {
        new: true,
      }
    );

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Page not found.",
      });
    }

    return res.json({
      success: true,
      data: page,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};