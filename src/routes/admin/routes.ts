import userController from "@/controllers/user";
import asyncHandler from "@/middlewares/asyncHandler";
import requireAdmin from "@/middlewares/requireadmin.mw";
import requireSuperAdmin from "@/middlewares/requiresuperadmin.mw";
import { Router } from "express";

const adminRoutes = Router();

// test routes
adminRoutes.get(
  "/super/test",
  requireSuperAdmin,
  asyncHandler((req, res) => {
    res.status(200).json({ message: "Super Admin Route" });
  })
);
adminRoutes.get(
  "/test",
  requireAdmin,
  asyncHandler((req, res) => {
    res.status(200).json({ message: "Admin Route" });
  })
);

// real routes
adminRoutes.get(
  "/grant-admin/:target_id",
  requireSuperAdmin,
  asyncHandler(userController.grantAdmin)
);
adminRoutes.get(
  "/", // ?includeAdmins=true
  requireAdmin,
  asyncHandler(userController.getAllUsers)
);

export default adminRoutes;
