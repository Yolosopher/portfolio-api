import educationController from "@/controllers/education";
import {
  createEducationSchema,
  updateEducationSchema,
} from "@/lib/zod/education";
import asyncHandler from "@/middlewares/asyncHandler";
import requireAdmin from "@/middlewares/requireadmin.mw";
import validateZod from "@/middlewares/zodvalidate.mw";
import { Router } from "express";

const educationRoutes = Router();

educationRoutes.get("/:idOrField", asyncHandler(educationController.fetchOne));

educationRoutes.get("/", asyncHandler(educationController.fetchAll));

educationRoutes.post(
  "/",
  requireAdmin,
  validateZod(createEducationSchema, "body"),
  asyncHandler(educationController.create)
);

educationRoutes.put(
  "/:idOrField",
  requireAdmin,
  validateZod(updateEducationSchema, "body"),
  asyncHandler(educationController.update)
);

educationRoutes.delete(
  "/:idOrField",
  requireAdmin,
  asyncHandler(educationController.delete)
);

educationRoutes.patch(
  "/:idOrField",
  requireAdmin,
  asyncHandler(educationController.makeCurrent)
);

export default educationRoutes;
