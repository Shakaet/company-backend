import { Document } from "mongoose";

export interface IPartner extends Document {
  name: string;
  status: "active" | "inactive";
}

export interface ITechStack extends Document {
  name: string;
  status: "active" | "inactive";
}

export interface IStat extends Document {
  label: string;
  value: string;
  status: "active" | "inactive";
}


export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  projectTag?: string;
  message: string;
  highlightMetric?: { value: string; label: string };
  status: "active" | "inactive";
}

export interface IWhyChooseUs extends Document {
  icon: string;
  badge: string;
  title: string;
  desc: string;
  perks: string[];
  status: "active" | "inactive";
}
