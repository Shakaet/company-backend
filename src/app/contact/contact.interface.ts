import { Document } from "mongoose";

export interface IContact extends Document {
  inquiryType: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  requestNda: boolean;
  status?: "pending" | "resolved";
}
