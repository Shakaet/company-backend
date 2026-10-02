import express from "express";
import { ContactController } from "./contact.controller";
import { VerifyToken } from "../../middlewares/verify.token";

const router = express.Router();
const verify = VerifyToken();

router.post(
  "/",
  ContactController.createContact
);

router.get(
  "/",
  verify("contact_show", "admin"),
  ContactController.getAllContacts
);

router.delete(
  "/:id",
  verify("contact_delete", "admin"),
  ContactController.deleteContact
);

export const ContactRoutes = router;
