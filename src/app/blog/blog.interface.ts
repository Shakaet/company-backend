import { Document } from "mongoose";

export interface IBlogCategory extends Document {
  name: string;
  slug: string;
  status: "active" | "inactive";
}

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover?: string;
  author: string;
  authorBio?: string;
  date: string;
  category: string | IBlogCategory;
  readTime?: number;
  featured?: boolean;
  status: "active" | "inactive";
}
