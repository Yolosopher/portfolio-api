import userController from "@/controllers/user";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import requireAuth from "@/middlewares/requireauth.mw";
import validateZod from "@/middlewares/zodvalidate.mw";
import { updateFullnameSchema, updatePasswordSchema } from "@/lib/zod/user";

const userRoutes = Router();

userRoutes.delete("/delete", requireAuth, asyncHandler(userController.delete));
userRoutes.put(
  "/update/full_name",
  requireAuth,
  validateZod(updateFullnameSchema, "body"),
  asyncHandler(userController.changeFullName)
);

userRoutes.put(
  "/update/password",
  requireAuth,
  validateZod(updatePasswordSchema, "body"),
  asyncHandler(userController.changePassword)
);
export default userRoutes;
