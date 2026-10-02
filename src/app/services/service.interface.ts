import { Document } from "mongoose";

export interface IService extends Document {
  title: string;
  slug: string;
  category: string;
  shortDesc: string;
  badge?: string;
  icon: string;
  icon_key?: string;
  heroHeadline?: string;
  description: string;
  features: string[];
  deliverables?: string[];
  benefits?: { title: string; desc: string }[];
  techStack?: string[];
  process?: { step: string; title: string; desc: string }[];
  faqs?: { q: string; a: string }[];
  pricingStartingAt?: string;
  status: "active" | "inactive";
}

export interface IServiceConsultation extends Document {
  serviceTitle: string;
  serviceSlug: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget: string;
  timeline: string;
  projectDetails: string;
  status: "pending" | "contacted" | "closed";
}
