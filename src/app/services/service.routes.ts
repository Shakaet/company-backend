import express from "express";
import { ServiceController } from "./service.controller";
import { VerifyToken } from "../../middlewares/verify.token";

const router = express.Router();
const verify = VerifyToken();

// --- Services ---
router.post("/", verify("service_create", "admin"), ServiceController.createService);
router.get("/admin", verify("service_show", "admin"), ServiceController.getAllServicesForAdmin);
router.get("/", ServiceController.getAllServices);
router.get("/:slug", ServiceController.getServiceBySlug);

// --- Consultations (Form) ---
router.post("/consultations", ServiceController.createConsultation);
router.get("/admin/consultations", verify("service_show", "admin"), ServiceController.getAllConsultationsForAdmin);

export const ServiceRoutes = router;
