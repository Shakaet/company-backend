import express from "express";
import { HomeElementsController } from "./homeElements.controller";
import { VerifyToken } from "../../middlewares/verify.token";

const router = express.Router();
const verify = VerifyToken();

// Testimonials
router.post("/testimonials", verify("home_create", "admin"), HomeElementsController.createTestimonial);
router.get("/admin/testimonials", verify("home_show", "admin"), HomeElementsController.getAllTestimonialsForAdmin);
router.get("/testimonials", HomeElementsController.getAllTestimonials);

// Why Choose Us
router.post("/why-choose-us", verify("home_create", "admin"), HomeElementsController.createWhyChooseUs);
router.get("/admin/why-choose-us", verify("home_show", "admin"), HomeElementsController.getAllWhyChooseUsForAdmin);
router.get("/why-choose-us", HomeElementsController.getAllWhyChooseUs);

export const HomeElementsRoutes = router;
