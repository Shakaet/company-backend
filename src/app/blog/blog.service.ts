import ApiError from "../../errors/ApiError";
import { IBlogCategory, IBlogPost } from "./blog.interface";
import { BlogCategory, BlogPost } from "./blog.model";

export const BlogService = {
  async create(payload: Partial<IBlogPost>) {
    return BlogPost.create(payload);
  },

  async getPublicPosts(category?: string) {
    const query: Record<string, string> = { status: "active" };
    if (category) query.category = category;
    return BlogPost.find(query)
      .populate("category", "name slug")
      .sort({ featured: -1, date: -1, createdAt: -1 });
  },

  async getPublicPostBySlug(slug: string) {
    return BlogPost.findOne({ slug: slug.toLowerCase(), status: "active" }).populate("category", "name slug");
  },

  async getCategories() {
    return BlogCategory.find({ status: "active" }).sort({ name: 1 });
  },

  async createCategory(payload: Partial<IBlogCategory>) {
    const name = payload.name?.trim();
    if (!name) throw new ApiError(400, "Category name is required");
    const slug = (payload.slug || name).toLowerCase().trim().replace(/\s+/g, "-");
    return BlogCategory.create({ name, slug, status: "active" });
  },

  async getAdminCategories(page = 1, limit = 10, searchTerm = "") {
    const query: Record<string, unknown> = {};
    if (searchTerm) query.name = { $regex: searchTerm, $options: "i" };
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      BlogCategory.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      BlogCategory.countDocuments(query),
    ]);
    return { data, total, page, limit };
  },

  async getPublicCategories() {
    return BlogCategory.find({ status: "active" }).sort({ name: 1 });
  },

  async updateCategory(id: string, payload: Partial<IBlogCategory>) {
    const result = await BlogCategory.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!result) throw new ApiError(404, "Blog category not found");
    return result;
  },

  async removeCategory(id: string) {
    const used = await BlogPost.exists({ category: id });
    if (used) throw new ApiError(400, "Category is in use by a blog post");
    const result = await BlogCategory.findByIdAndDelete(id);
    if (!result) throw new ApiError(404, "Blog category not found");
    return result;
  },

  async getAdminPosts(page = 1, limit = 10, searchTerm = "") {
    const query: Record<string, unknown> = {};
    if (searchTerm) {
      const matchingCategories = await BlogCategory.find({
        name: { $regex: searchTerm, $options: "i" },
      }).select("_id");
      query.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { excerpt: { $regex: searchTerm, $options: "i" } },
        { category: { $in: matchingCategories.map((category) => category._id) } },
      ];
    }
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      BlogPost.find(query)
        .populate("category", "name slug")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      BlogPost.countDocuments(query),
    ]);
    return { data, total, page, limit };
  },

  async update(id: string, payload: Partial<IBlogPost>) {
    const result = await BlogPost.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    if (!result) throw new ApiError(404, "Blog post not found");
    return result;
  },

  async remove(id: string) {
    const result = await BlogPost.findByIdAndDelete(id);
    if (!result) throw new ApiError(404, "Blog post not found");
    return result;
  },
};
