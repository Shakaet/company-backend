import { Schema, model } from "mongoose";
import { IOurCompany, IOurTeam, IFounderMessage } from "./about.interface";

const OurCompanySchema = new Schema<IOurCompany>({
  stats: [
    { value: { type: String }, label: { type: String } }
  ],
  story: [{ type: String }],
  values: [
    { icon: { type: String }, title: { type: String }, desc: { type: String } }
  ]
}, { timestamps: true });

export const OurCompany = model<IOurCompany>("OurCompany", OurCompanySchema);

const OurTeamSchema = new Schema<IOurTeam>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  image_key: { type: String },
  bio: { type: String },
  socialLinks: {
    linkedin: { type: String },
    twitter: { type: String },
    github: { type: String },
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" }
}, { timestamps: true });

export const OurTeam = model<IOurTeam>("OurTeam", OurTeamSchema);

const FounderMessageSchema = new Schema<IFounderMessage>({
  image: { type: String },
  image_key: { type: String },
  name: { type: String },
  role: { type: String },
  shortDesc: { type: String },
  stats: [
    { value: { type: String }, label: { type: String } }
  ],
  highlightQuote: { type: String },
  paragraphs: [{ type: String }],
  commitments: [{ type: String }],
  message: { type: String }
}, { timestamps: true });

export const FounderMessage = model<IFounderMessage>("FounderMessage", FounderMessageSchema);
