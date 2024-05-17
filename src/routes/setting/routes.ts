import settingController from "@/controllers/setting";
import { updateSettingSchema } from "@/lib/zod/setting";
import asyncHandler from "@/middlewares/asyncHandler";
import requireAdmin from "@/middlewares/requireadmin.mw";
import validateZod from "@/middlewares/zodvalidate.mw";
import { Router } from "express";

const settingRoutes = Router();

settingRoutes.get("/", asyncHandler(settingController.fetch));

settingRoutes.put(
  "/",
  requireAdmin,
  validateZod(updateSettingSchema, "body"),
  asyncHandler(settingController.update)
);

export default settingRoutes;
