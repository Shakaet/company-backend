import { Schema, model } from "mongoose";
import { ITestimonial, IWhyChooseUs, IPartner, ITechStack, IStat } from "./homeElements.interface";

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  avatar: { type: String, required: true },
  rating: { type: Number, default: 5 },
  projectTag: { type: String },
  message: { type: String, required: true },
  highlightMetric: {
    value: { type: String },
    label: { type: String }
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" }
}, { timestamps: true });

export const Testimonial = model<ITestimonial>("Testimonial", TestimonialSchema);

const WhyChooseUsSchema = new Schema<IWhyChooseUs>({
  icon: { type: String, required: true },
  badge: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  perks: [{ type: String }],
  status: { type: String, enum: ["active", "inactive"], default: "active" }
}, { timestamps: true });

export const WhyChooseUs = model<IWhyChooseUs>("WhyChooseUs", WhyChooseUsSchema);

const PartnerSchema = new Schema<IPartner>({
  name: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" }
}, { timestamps: true });

export const Partner = model<IPartner>("Partner", PartnerSchema);

const TechStackSchema = new Schema<ITechStack>({
  name: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" }
}, { timestamps: true });

export const TechStack = model<ITechStack>("TechStack", TechStackSchema);

const StatSchema = new Schema<IStat>({
  label: { type: String, required: true },
  value: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" }
}, { timestamps: true });

export const Stat = model<IStat>("Stat", StatSchema);
