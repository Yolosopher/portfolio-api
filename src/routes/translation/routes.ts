import requireAdmin from "@/middlewares/requireadmin.mw";
import asyncHandler from "@/middlewares/asyncHandler";
import validateZod from "@/middlewares/zodvalidate.mw";
import { Router } from "express";
import translationController from "@/controllers/translation";
import {
    deleteTranslationSchema,
    updateTranslationSchema,
} from "@/lib/zod/translation";

const translationRoutes = Router();

translationRoutes.get("/", asyncHandler(translationController.fetch));

translationRoutes.patch(
    "/",
    requireAdmin,
    validateZod(updateTranslationSchema, "body"),
    asyncHandler(translationController.update)
);

translationRoutes.delete(
    "/",
    requireAdmin,
    validateZod(deleteTranslationSchema, "query"),
    asyncHandler(translationController.delete)
);

translationRoutes.post("/", asyncHandler(translationController.compareVersion));

export default translationRoutes;
