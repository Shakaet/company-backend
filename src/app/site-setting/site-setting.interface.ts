import { Document } from "mongoose";

export interface ISocialLink {
  platform: "facebook" | "twitter" | "linkedin" | "whatsapp" | "instagram" | "youtube";
  url: string;
  isActive: boolean;
}

export interface ISiteSetting extends Document {
  // ─── Company Identity ─────────────────────────────────────────────
  companyName: string;
  tagline?: string;
  logo?: string;
  logo_key?: string;
  favicon?: string;
  favicon_key?: string;

  // ─── Contact Info (TopBar + Footer) ───────────────────────────────
  email: string;
  phone: string;
  whatsappNumber?: string;   // used for wa.me link
  address?: string;

  // ─── Social Links (TopBar) ────────────────────────────────────────
  socialLinks: ISocialLink[];

  // ─── Footer Content ───────────────────────────────────────────────
  footerTagline?: string;           // "Building digital products that matter."
  footerQuickLinks?: { label: string; href: string }[];
  copyrightText?: string;           // "© 2025 ITStartup. All rights reserved."

  // ─── SEO ──────────────────────────────────────────────────────────
  metaTitle?: string;
  metaDescription?: string;
}
