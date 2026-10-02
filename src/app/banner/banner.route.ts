// banner.route.ts
import express from "express";
import { BannerController } from "./banner.controller";
import { FileUploadHelper } from "../../helpers/image.upload";
import { VerifyToken } from "../../middlewares/verify.token";

const router = express.Router();
const verify = VerifyToken();

router.post(
  "/",
  verify("banner_create", "admin"),
  FileUploadHelper.ImageUpload.single("banner_image"),
  BannerController.createBanner,
);

router.get("/admin", verify("banner_show", "admin"), BannerController.getAllBanners);
router.get("/", BannerController.getAllBanners);

router.get("/:id", BannerController.getSingleBanner);

router.patch(
  "/:id",
  verify("banner_update", "admin"),
  FileUploadHelper.ImageUpload.single("banner_image"),
  BannerController.updateBanner,
);

router.patch("/:id/toggle-status", verify("banner_update", "admin"), BannerController.toggleStatus);

router.delete("/:id", verify("banner_delete", "admin"), BannerController.deleteBanner);

export const BannerRoutes = router;
