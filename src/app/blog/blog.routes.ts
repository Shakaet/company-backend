import express from "express";
import { VerifyToken } from "../../middlewares/verify.token";
import { BlogController } from "./blog.controller";
import { FileUploadHelper } from "../../helpers/image.upload";

const router = express.Router();
const verify = VerifyToken();

router.get("/posts", BlogController.getPublicPosts);
router.get("/posts/:slug", BlogController.getPublicPostBySlug);
router.get("/categories", BlogController.getCategories);
router.post("/categories", verify("blog_create", "admin"), BlogController.createCategory);
router.get("/admin/categories", verify("blog_show", "admin"), BlogController.getAdminCategories);
router.patch("/categories/:id", verify("blog_update", "admin"), BlogController.updateCategory);
router.delete("/categories/:id", verify("blog_delete", "admin"), BlogController.removeCategory);

router.post(
  "/posts",
  verify("blog_create", "admin"),
  FileUploadHelper.ImageUpload.single("cover"),
  BlogController.create,
);
router.get("/admin/posts", verify("blog_show", "admin"), BlogController.getAdminPosts);
router.patch(
  "/posts/:id",
  verify("blog_update", "admin"),
  FileUploadHelper.ImageUpload.single("cover"),
  BlogController.update,
);
router.delete("/posts/:id", verify("blog_delete", "admin"), BlogController.remove);

export const BlogRoutes = router;
