import { Document, Types } from "mongoose";

export interface ICareerJob extends Document {
  title: string;
  department: string;
  type: string;
  workplaceType: string;
  location: string;
  experience: string;
  salary: string;
  deadline: string;
  postedDate: string;
  featured?: boolean;
  urgent?: boolean;
  description: string;
  aboutRole?: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  benefits?: string[];
  techStack?: string[];
  status?: "active" | "inactive";
}

export interface IJobApplication extends Document {
  jobId?: Types.ObjectId | ICareerJob;
  jobTitle: string;
  department?: string;
  fullName: string;
  email: string;
  phone?: string;
  portfolioUrl?: string;
  experience: string;
  expectedSalary?: string;
  noticePeriod: string;
  resumeLink: string;
  coverLetter?: string;
  agreeConsent: boolean;
  status: "pending" | "reviewed" | "rejected" | "hired";
}
