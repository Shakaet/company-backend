import { Document } from "mongoose";

export interface IOurCompany extends Document {
  stats: { value: string; label: string }[];
  story: string[];
  values: { icon: string; title: string; desc: string }[];
}

export interface IOurTeam extends Document {
  name: string;
  role: string;
  image: string;
  status: "active" | "inactive";
}

export interface IFounderMessage extends Document {
  image: string;
  name: string;
  role: string;
  shortDesc: string;
  stats: { value: string; label: string }[];
  highlightQuote: string;
  paragraphs: string[];
  commitments: string[];
}
