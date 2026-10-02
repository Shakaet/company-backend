import express from "express";
import { PortfolioController } from "./portfolio.controller";
import { VerifyToken } from "../../middlewares/verify.token";
import { FileUploadHelper } from "../../helpers/image.upload";

const router = express.Router();
const verify = VerifyToken();

// --- Highlights ---
router.post("/highlights", verify("portfolio_create", "admin"), PortfolioController.createHighlight);
router.get("/admin/highlights", verify("portfolio_show", "admin"), PortfolioController.getAllHighlightsForAdmin);
router.patch("/highlights/:id", verify("portfolio_create", "admin"), PortfolioController.updateHighlight);
router.delete("/highlights/:id", verify("portfolio_create", "admin"), PortfolioController.deleteHighlight);
router.get("/highlights", PortfolioController.getAllHighlights);

// --- Categories ---
router.post("/categories", verify("portfolio_create", "admin"), PortfolioController.createCategory);
router.get("/admin/categories", verify("portfolio_show", "admin"), PortfolioController.getAllCategoriesForAdmin);
router.patch("/categories/:id", verify("portfolio_create", "admin"), PortfolioController.updateCategory);
router.delete("/categories/:id", verify("portfolio_create", "admin"), PortfolioController.deleteCategory);
router.get("/categories", PortfolioController.getAllCategories);

// --- Projects ---
router.post("/projects", verify("portfolio_create", "admin"), FileUploadHelper.ImageUpload.single("image"), PortfolioController.createProject);
router.get("/admin/projects", verify("portfolio_show", "admin"), PortfolioController.getAllProjectsForAdmin);
router.patch("/projects/:id", verify("portfolio_create", "admin"), FileUploadHelper.ImageUpload.single("image"), PortfolioController.updateProject);
router.delete("/projects/:id", verify("portfolio_create", "admin"), PortfolioController.deleteProject);
router.get("/projects", PortfolioController.getAllProjects);

export const PortfolioRoutes = router;
