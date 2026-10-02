import { Document, Types } from "mongoose";

export interface IPortfolioHighlight extends Document {
  icon: string;
  value: string;
  label: string;
  status: "active" | "inactive";
}

export interface IProjectCategory extends Document {
  name: string; // e.g. "Web Development"
  value: string; // e.g. "web"
  status: "active" | "inactive";
}

export interface IProject extends Document {
  title: string;
  slug?: string;
  category: Types.ObjectId | IProjectCategory;
  image: string;
  client: string;
  year?: string;
  description: string;
  liveUrl?: string;
  tags: string[];
  metrics?: { value: string; label: string };
  featured?: boolean;
  status: "active" | "inactive";
}
