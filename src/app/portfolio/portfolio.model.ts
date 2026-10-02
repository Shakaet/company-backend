import { Schema, model } from "mongoose";
import { IPortfolioHighlight, IProjectCategory, IProject } from "./portfolio.interface";

const PortfolioHighlightSchema = new Schema<IPortfolioHighlight>(
  {
    icon: { type: String, required: true },
    value: { type: String, required: true },
    label: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);
export const PortfolioHighlight = model<IPortfolioHighlight>("PortfolioHighlight", PortfolioHighlightSchema);

const ProjectCategorySchema = new Schema<IProjectCategory>(
  {
    name: { type: String, required: true },
    value: { type: String, required: true, unique: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);
export const ProjectCategory = model<IProjectCategory>("ProjectCategory", ProjectCategorySchema);

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "ProjectCategory", required: true },
    image: { type: String, required: true },
    client: { type: String, required: true },
    year: { type: String },
    description: { type: String, required: true },
    liveUrl: { type: String },
    tags: [{ type: String }],
    metrics: {
      value: { type: String },
      label: { type: String },
    },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);
export const Project = model<IProject>("Project", ProjectSchema);
