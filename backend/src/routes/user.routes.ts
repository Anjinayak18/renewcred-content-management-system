

import { Router, type Router as ExpressRouter } from "express";

const router: ExpressRouter = Router();

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";



router.get("/", getUsers);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createUser
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  updateUser
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteUser
);

export default router;