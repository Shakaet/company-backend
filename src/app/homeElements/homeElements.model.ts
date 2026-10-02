import { Schema, model } from "mongoose";
import { ITestimonial, IWhyChooseUs } from "./homeElements.interface";

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
