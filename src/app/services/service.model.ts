import { Schema, model } from "mongoose";
import { IService, IServiceConsultation } from "./service.interface";

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    shortDesc: { type: String, required: true },
    badge: { type: String },
    icon: { type: String, required: true },
    heroHeadline: { type: String },
    description: { type: String, required: true },
    features: [{ type: String }],
    deliverables: [{ type: String }],
    benefits: [
      {
        title: { type: String, required: true },
        desc: { type: String, required: true },
      },
    ],
    techStack: [{ type: String }],
    process: [
      {
        step: { type: String, required: true },
        title: { type: String, required: true },
        desc: { type: String, required: true },
      },
    ],
    faqs: [
      {
        q: { type: String, required: true },
        a: { type: String, required: true },
      },
    ],
    pricingStartingAt: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export const ServiceModel = model<IService>("Service", ServiceSchema);

const ServiceConsultationSchema = new Schema<IServiceConsultation>(
  {
    serviceTitle: { type: String, required: true },
    serviceSlug: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    budget: { type: String, required: true },
    timeline: { type: String, required: true },
    projectDetails: { type: String, required: true },
    status: { type: String, enum: ["pending", "contacted", "closed"], default: "pending" },
  },
  { timestamps: true }
);

export const ServiceConsultation = model<IServiceConsultation>("ServiceConsultation", ServiceConsultationSchema);
