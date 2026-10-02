import express from "express";
import { PricingController } from "./pricing.controller";
import { VerifyToken } from "../../middlewares/verify.token";

const router = express.Router();
const verify = VerifyToken();

// --- Plans ---
router.post("/plans", verify("pricing_create", "admin"), PricingController.createPlan);
router.get("/admin/plans", verify("pricing_show", "admin"), PricingController.getAllPlansForAdmin);
router.get("/plans", PricingController.getAllPlans);

// --- Guarantees (Cards) ---
router.post("/guarantees", verify("pricing_create", "admin"), PricingController.createGuarantee);
router.get("/admin/guarantees", verify("pricing_show", "admin"), PricingController.getAllGuaranteesForAdmin);
router.get("/guarantees", PricingController.getAllGuarantees);

export const PricingRoutes = router;
