import express from "express";
import { CareerController } from "./career.controller";
import { VerifyToken } from "../../middlewares/verify.token";

const router = express.Router();
const verify = VerifyToken();

// Admin: Create Job Post
router.post("/jobs", verify("career_create", "admin"), CareerController.createJob);

// Admin: Get all Jobs with pagination
router.get("/admin/jobs", verify("career_show", "admin"), CareerController.getAllJobsForAdmin);

// Admin: Update / Delete Job
router.patch("/jobs/:id", verify("career_create", "admin"), CareerController.updateJob);
router.delete("/jobs/:id", verify("career_create", "admin"), CareerController.deleteJob);

// Public: Get all Jobs
router.get("/jobs", CareerController.getAllJobs);

// Public: Apply for Job
router.post("/apply", CareerController.applyForJob);

// Admin: Get Job Applications
router.get("/applications", verify("career_show", "admin"), CareerController.getJobApplications);

// Admin: Update Application Status
router.patch("/applications/:id", verify("career_create", "admin"), CareerController.updateApplicationStatus);

export const CareerRoutes = router;
