import { Schema, model } from "mongoose";
import { IBlogCategory, IBlogPost } from "./blog.interface";

const BlogCategorySchema = new Schema<IBlogCategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true },
);

export const BlogCategory = model<IBlogCategory>("BlogCategory", BlogCategorySchema);

const BlogPostSchema = new Schema<IBlogPost>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    cover: { type: String },
    author: { type: String, required: true },
    authorBio: { type: String },
    date: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "BlogCategory", required: true },
    readTime: { type: Number, min: 1 },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true },
);

export const BlogPost = model<IBlogPost>("BlogPost", BlogPostSchema);
