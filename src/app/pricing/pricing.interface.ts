import { Document } from "mongoose";

export interface IPricingPlan extends Document {
  name: string;
  badge?: string;
  popular?: boolean;
  priceMonthly: string;
  priceQuarterly?: string;
  period: string;
  tagline: string;
  description: string;
  idealFor: string;
  features: string[];
  notIncluded?: string[];
  ctaText: string;
  ctaHref: string;
  status: "active" | "inactive";
}

export interface IPricingGuarantee extends Document {
  icon: string;
  label: string;
  desc: string;
  status: "active" | "inactive";
}
