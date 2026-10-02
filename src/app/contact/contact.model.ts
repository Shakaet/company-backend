import { Schema, model } from "mongoose";
import { IContact } from "./contact.interface";

const ContactSchema = new Schema<IContact>(
  {
    inquiryType: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    service: { type: String, required: true },
    budget: { type: String, required: true },
    timeline: { type: String, required: true },
    message: { type: String, required: true },
    requestNda: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "resolved"], default: "pending" },
  },
  { timestamps: true },
);

export const Contact = model<IContact>("Contact", ContactSchema);
