import experienceController from "@/controllers/experience";
import {
  createExperienceSchema,
  updateExperienceSchema,
} from "@/lib/zod/experience";
import asyncHandler from "@/middlewares/asyncHandler";
import requireAdmin from "@/middlewares/requireadmin.mw";
import validateZod from "@/middlewares/zodvalidate.mw";
import { Router } from "express";

const experienceRoutes = Router();

experienceRoutes.get(
  "/:idOrPosition",
  asyncHandler(experienceController.fetchOne)
);

experienceRoutes.get("/", asyncHandler(experienceController.fetchAll));

experienceRoutes.post(
  "/",
  requireAdmin,
  validateZod(createExperienceSchema, "body"),
  asyncHandler(experienceController.create)
);

experienceRoutes.put(
  "/:idOrPosition",
  requireAdmin,
  validateZod(updateExperienceSchema, "body"),
  asyncHandler(experienceController.update)
);

experienceRoutes.delete(
  "/:idOrPosition",
  requireAdmin,
  asyncHandler(experienceController.delete)
);

experienceRoutes.patch(
  "/:idOrPosition",
  requireAdmin,
  asyncHandler(experienceController.makeCurrent)
);

export default experienceRoutes;
