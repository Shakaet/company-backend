import express from "express";
import { SiteSettingController } from "./site-setting.controller";
import { VerifyToken } from "../../middlewares/verify.token";
import { FileUploadHelper } from "../../helpers/image.upload";

const router = express.Router();
const verify = VerifyToken();

// ─── Admin Routes ────────────────────────────────────────────────────────────

// POST  /api/v1/site-setting  →  Create or Update (with optional logo upload)
router.post(
  "/",
  verify("site_setting_create", "admin"),
  FileUploadHelper.ImageUpload.single("logo"),
  SiteSettingController.createOrUpdate
);

// GET   /api/v1/site-setting/admin  →  Full data for admin panel
router.get(
  "/admin",
  verify("site_setting_show", "admin"),
  SiteSettingController.getForAdmin
);

// ─── Public Routes ───────────────────────────────────────────────────────────

// GET   /api/v1/site-setting  →  Public data for TopBar, Footer, SEO
router.get("/", SiteSettingController.getForUser);

export const SiteSettingRoutes = router;
