import { Schema, model } from "mongoose";
import { IPricingPlan, IPricingGuarantee } from "./pricing.interface";

const PricingPlanSchema = new Schema<IPricingPlan>(
  {
    name: { type: String, required: true },
    badge: { type: String },
    popular: { type: Boolean, default: false },
    priceMonthly: { type: String, required: true },
    priceQuarterly: { type: String },
    period: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    idealFor: { type: String, required: true },
    features: [{ type: String }],
    notIncluded: [{ type: String }],
    ctaText: { type: String, required: true },
    ctaHref: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export const PricingPlan = model<IPricingPlan>("PricingPlan", PricingPlanSchema);

const PricingGuaranteeSchema = new Schema<IPricingGuarantee>(
  {
    icon: { type: String, required: true },
    label: { type: String, required: true },
    desc: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export const PricingGuarantee = model<IPricingGuarantee>("PricingGuarantee", PricingGuaranteeSchema);
