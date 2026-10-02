import express from "express";
import { PortfolioController } from "./portfolio.controller";
import { VerifyToken } from "../../middlewares/verify.token";

const router = express.Router();
const verify = VerifyToken();

// --- Highlights ---
router.post("/highlights", verify("portfolio_create", "admin"), PortfolioController.createHighlight);
router.get("/admin/highlights", verify("portfolio_show", "admin"), PortfolioController.getAllHighlightsForAdmin);
router.get("/highlights", PortfolioController.getAllHighlights);

// --- Categories ---
router.post("/categories", verify("portfolio_create", "admin"), PortfolioController.createCategory);
router.get("/admin/categories", verify("portfolio_show", "admin"), PortfolioController.getAllCategoriesForAdmin);
router.get("/categories", PortfolioController.getAllCategories);

// --- Projects ---
router.post("/projects", verify("portfolio_create", "admin"), PortfolioController.createProject);
router.get("/admin/projects", verify("portfolio_show", "admin"), PortfolioController.getAllProjectsForAdmin);
router.get("/projects", PortfolioController.getAllProjects);

export const PortfolioRoutes = router;
