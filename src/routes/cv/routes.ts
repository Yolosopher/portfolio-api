import asyncHandler from "@/middlewares/asyncHandler";
import { Router } from "express";
import settingController from "@/controllers/setting";
import requireAdmin from "@/middlewares/requireadmin.mw";
import { upload } from "@/lib/zod/multer";

const cvRoutes = Router();

cvRoutes.get("/", asyncHandler(settingController.downloadCV));

cvRoutes.post(
  "/",
  requireAdmin,
  upload.single("cv"),
  asyncHandler(settingController.uploadCV)
);

export default cvRoutes;
