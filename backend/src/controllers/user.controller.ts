import { Request, Response } from "express";

import User from "@models/User";
import { HTTP_STATUS } from "@constants/httpStatus";
import logger from "@utils/logger";

/**
 * ==========================================================
 * Get All Users
 * ==========================================================
 */

export const getUsers = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    logger.error("Get users failed", error);

    return res.status(
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    ).json({
      success: false,
      message: "Unable to fetch users.",
    });
  }
};

/**
 * ==========================================================
 * Create User
 * ==========================================================
 */

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
    } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(
        HTTP_STATUS.CONFLICT
      ).json({
        success: false,
        message: "User already exists.",
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    return res.status(
      HTTP_STATUS.CREATED
    ).json({
      success: true,
      data: user,
    });
  } catch (error) {
    logger.error("Create user failed", error);

    return res.status(
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    ).json({
      success: false,
      message: "Unable to create user.",
    });
  }
};

/**
 * ==========================================================
 * Update User
 * ==========================================================
 */

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updateData = { ...req.body };

    // Don't update password unless a new one is provided
    if (
      !updateData.password ||
      updateData.password.trim() === ""
    ) {
      delete updateData.password;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(
        HTTP_STATUS.NOT_FOUND
      ).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: user,
    });
  } catch (error) {
    logger.error("Update user failed", error);

    return res.status(
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    ).json({
      success: false,
      message: "Unable to update user.",
    });
  }
};

/**
 * ==========================================================
 * Delete User
 * ==========================================================
 */

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await User.findByIdAndDelete(
      req.params.id
    );

    if (!user) {
      return res.status(
        HTTP_STATUS.NOT_FOUND
      ).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    logger.error("Delete user failed", error);

    return res.status(
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    ).json({
      success: false,
      message: "Unable to delete user.",
    });
  }
};