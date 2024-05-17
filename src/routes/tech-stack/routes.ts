import techStackController from "@/controllers/tech-stach";
import {
  createTechStackSchema,
  updateTechStackSchema,
} from "@/lib/zod/tech-stack";
import asyncHandler from "@/middlewares/asyncHandler";
import requireAdmin from "@/middlewares/requireadmin.mw";
import validateZod from "@/middlewares/zodvalidate.mw";
import { Router } from "express";

const techStackRoutes = Router();

techStackRoutes.get("/:idOrName", asyncHandler(techStackController.fetchOne));

techStackRoutes.get("/", asyncHandler(techStackController.fetchAll));

techStackRoutes.post(
  "/",
  requireAdmin,
  validateZod(createTechStackSchema, "body"),
  asyncHandler(techStackController.create)
);

techStackRoutes.put(
  "/:idOrName",
  requireAdmin,
  validateZod(updateTechStackSchema, "body"),
  asyncHandler(techStackController.update)
);

techStackRoutes.delete(
  "/:idOrName",
  requireAdmin,
  asyncHandler(techStackController.delete)
);

export default techStackRoutes;
