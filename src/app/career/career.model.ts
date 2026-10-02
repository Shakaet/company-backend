import { Schema, model } from "mongoose";
import { ICareerJob, IJobApplication } from "./career.interface";

const CareerJobSchema = new Schema<ICareerJob>(
  {
    title: { type: String, required: true },
    department: { type: String, required: true },
    type: { type: String, required: true },
    workplaceType: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: String, required: true },
    salary: { type: String, required: true },
    deadline: { type: String, required: true },
    postedDate: { type: String, required: true },
    featured: { type: Boolean, default: false },
    urgent: { type: Boolean, default: false },
    description: { type: String, required: true },
    aboutRole: { type: String },
    responsibilities: [{ type: String }],
    requirements: [{ type: String }],
    niceToHave: [{ type: String }],
    benefits: [{ type: String }],
    techStack: [{ type: String }],
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export const CareerJob = model<ICareerJob>("CareerJob", CareerJobSchema);

const JobApplicationSchema = new Schema<IJobApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "CareerJob" },
    jobTitle: { type: String, required: true },
    department: { type: String },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    portfolioUrl: { type: String },
    experience: { type: String, required: true },
    expectedSalary: { type: String },
    noticePeriod: { type: String, required: true },
    resumeLink: { type: String, required: true },
    coverLetter: { type: String },
    agreeConsent: { type: Boolean, required: true },
    status: { type: String, enum: ["pending", "reviewed", "rejected", "hired"], default: "pending" },
  },
  { timestamps: true }
);

export const JobApplication = model<IJobApplication>("JobApplication", JobApplicationSchema);
