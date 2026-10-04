import { Schema, model } from "mongoose";
import { ISiteSetting } from "./site-setting.interface";

const SocialLinkSchema = new Schema(
  {
    platform: {
      type: String,
      enum: ["facebook", "twitter", "linkedin", "whatsapp", "instagram", "youtube"],
      required: true,
    },
    url: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { _id: false }
);

const SiteSettingSchema = new Schema<ISiteSetting>(
  {
    // ─── Company Identity ───────────────────────────────────────────
    companyName: { type: String, required: true, default: "ITStartup" },
    tagline: { type: String },
    logo: { type: String },
    logo_key: { type: String },
    favicon: { type: String },
    favicon_key: { type: String },

    // ─── Contact Info ──────────────────────────────────────────────
    email: { type: String, required: true, default: "hello@itstartup.com" },
    phone: { type: String, required: true, default: "+880 1700-000000" },
    whatsappNumber: { type: String },
    address: { type: String },

    // ─── Social Links ──────────────────────────────────────────────
    socialLinks: { type: [SocialLinkSchema], default: [] },

    // ─── Footer Content ────────────────────────────────────────────
    footerTagline: { type: String },
    footerQuickLinks: [
      {
        label: { type: String },
        href: { type: String },
        _id: false,
      },
    ],
    copyrightText: { type: String },

    // ─── SEO ───────────────────────────────────────────────────────
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  { timestamps: true }
);

export const SiteSetting = model<ISiteSetting>("SiteSetting", SiteSettingSchema);
