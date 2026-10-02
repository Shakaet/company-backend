import express from "express";
import { ServiceController } from "./service.controller";
import { VerifyToken } from "../../middlewares/verify.token";

import { FileUploadHelper } from "../../helpers/image.upload";

const router = express.Router();
const verify = VerifyToken();

// --- Services ---
router.post("/", verify("service_create", "admin"), FileUploadHelper.ImageUpload.single("icon"), ServiceController.createService);
router.get("/admin", verify("service_show", "admin"), ServiceController.getAllServicesForAdmin);
router.patch("/:id", verify("service_create", "admin"), FileUploadHelper.ImageUpload.single("icon"), ServiceController.updateService);
router.delete("/:id", verify("service_create", "admin"), ServiceController.deleteService);
router.get("/", ServiceController.getAllServices);
router.get("/:slug", ServiceController.getServiceBySlug);

// --- Consultations (Form) ---
router.post("/consultations", ServiceController.createConsultation);
router.get("/admin/consultations", verify("service_show", "admin"), ServiceController.getAllConsultationsForAdmin);
router.patch("/admin/consultations/:id", verify("service_create", "admin"), ServiceController.updateConsultationStatus);

export const ServiceRoutes = router;
