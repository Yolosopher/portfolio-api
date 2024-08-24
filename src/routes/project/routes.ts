import projectController from "@/controllers/project";
import { createProjectSchema, updateProjectSchema } from "@/lib/zod/project";
import asyncHandler from "@/middlewares/asyncHandler";
import requireAdmin from "@/middlewares/requireadmin.mw";
import validateZod from "@/middlewares/zodvalidate.mw";
import { Router } from "express";

const projectRoutes = Router();

projectRoutes.get("/:idOrName", asyncHandler(projectController.fetchOne));

projectRoutes.get("/", asyncHandler(projectController.fetchAll));

projectRoutes.post(
    "/",
    requireAdmin,
    validateZod(createProjectSchema, "body"),
    asyncHandler(projectController.create)
);

projectRoutes.put(
    "/:idOrName",
    requireAdmin,
    validateZod(updateProjectSchema, "body"),
    asyncHandler(projectController.update)
);

projectRoutes.delete(
    "/:idOrName",
    requireAdmin,
    asyncHandler(projectController.delete)
);

projectRoutes.patch(
    "/:idOrName",
    requireAdmin,
    asyncHandler(projectController.toggleHidden)
);

export default projectRoutes;
