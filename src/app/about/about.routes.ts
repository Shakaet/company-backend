import express from "express";
import { AboutController } from "./about.controller";
import { VerifyToken } from "../../middlewares/verify.token";
import { FileUploadHelper } from "../../helpers/image.upload";

const router = express.Router();
const verify = VerifyToken();

// Our Company
router.post("/company", verify("about_create", "admin"), AboutController.createOrUpdateCompany);
router.get("/admin/company", verify("about_show", "admin"), AboutController.getCompany);
router.get("/company", AboutController.getCompany);

// Our Team
router.post("/team", verify("about_create", "admin"), FileUploadHelper.ImageUpload.single("avatar"), AboutController.createTeamMember);
router.get("/admin/team", verify("about_show", "admin"), AboutController.getAllTeamMembersForAdmin);
router.patch("/team/:id", verify("about_create", "admin"), FileUploadHelper.ImageUpload.single("avatar"), AboutController.updateTeamMember);
router.delete("/team/:id", verify("about_create", "admin"), AboutController.deleteTeamMember);
router.get("/team", AboutController.getAllTeamMembers);

// Founder Message
router.post("/founder-message", verify("about_create", "admin"), FileUploadHelper.ImageUpload.single("image"), AboutController.createOrUpdateFounderMessage);
router.get("/admin/founder-message", verify("about_show", "admin"), AboutController.getFounderMessage);
router.get("/founder-message", AboutController.getFounderMessage);

export const AboutRoutes = router;
