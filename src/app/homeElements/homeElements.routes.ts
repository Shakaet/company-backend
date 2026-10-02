import express from "express";
import { HomeElementsController } from "./homeElements.controller";
import { VerifyToken } from "../../middlewares/verify.token";

const router = express.Router();
const verify = VerifyToken();

// Testimonials
router.post("/testimonials", verify("home_create", "admin"), HomeElementsController.createTestimonial);
router.get("/admin/testimonials", verify("home_show", "admin"), HomeElementsController.getAllTestimonialsForAdmin);
router.patch("/testimonials/:id", verify("home_update", "admin"), HomeElementsController.updateTestimonial);
router.delete("/testimonials/:id", verify("home_delete", "admin"), HomeElementsController.deleteTestimonial);
router.get("/testimonials", HomeElementsController.getAllTestimonials);

// Why Choose Us
router.post("/why-choose-us", verify("home_create", "admin"), HomeElementsController.createWhyChooseUs);
router.get("/admin/why-choose-us", verify("home_show", "admin"), HomeElementsController.getAllWhyChooseUsForAdmin);
router.patch("/why-choose-us/:id", verify("home_update", "admin"), HomeElementsController.updateWhyChooseUs);
router.delete("/why-choose-us/:id", verify("home_delete", "admin"), HomeElementsController.deleteWhyChooseUs);
router.get("/why-choose-us", HomeElementsController.getAllWhyChooseUs);

// Partners
router.post("/partners", verify("home_create", "admin"), HomeElementsController.createPartner);
router.get("/admin/partners", verify("home_show", "admin"), HomeElementsController.getAllPartnersForAdmin);
router.patch("/partners/:id", verify("home_update", "admin"), HomeElementsController.updatePartner);
router.delete("/partners/:id", verify("home_delete", "admin"), HomeElementsController.deletePartner);
router.get("/partners", HomeElementsController.getAllPartners);

// Tech Stack
router.post("/tech-stack", verify("home_create", "admin"), HomeElementsController.createTechStack);
router.get("/admin/tech-stack", verify("home_show", "admin"), HomeElementsController.getAllTechStacksForAdmin);
router.patch("/tech-stack/:id", verify("home_update", "admin"), HomeElementsController.updateTechStack);
router.delete("/tech-stack/:id", verify("home_delete", "admin"), HomeElementsController.deleteTechStack);
router.get("/tech-stack", HomeElementsController.getAllTechStacks);

// Stats
router.post("/stats", verify("home_create", "admin"), HomeElementsController.createStat);
router.get("/admin/stats", verify("home_show", "admin"), HomeElementsController.getAllStatsForAdmin);
router.patch("/stats/:id", verify("home_update", "admin"), HomeElementsController.updateStat);
router.delete("/stats/:id", verify("home_delete", "admin"), HomeElementsController.deleteStat);
router.get("/stats", HomeElementsController.getAllStats);

export const HomeElementsRoutes = router;
