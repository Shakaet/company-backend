import { IPortfolioHighlight, IProjectCategory, IProject } from "./portfolio.interface";
import { PortfolioHighlight, ProjectCategory, Project } from "./portfolio.model";

export const PortfolioService = {
  // --- Highlights ---
  createHighlight: async (payload: Partial<IPortfolioHighlight>) => {
    return await PortfolioHighlight.create(payload);
  },
  getAllHighlights: async () => {
    return await PortfolioHighlight.find({ status: "active" }).sort({ createdAt: -1 });
  },
  getAllHighlightsForAdmin: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const data = await PortfolioHighlight.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await PortfolioHighlight.countDocuments();
    return { data, total, page, limit };
  },

  // --- Categories ---
  createCategory: async (payload: Partial<IProjectCategory>) => {
    return await ProjectCategory.create(payload);
  },
  getAllCategories: async () => {
    return await ProjectCategory.find({ status: "active" }).sort({ createdAt: -1 });
  },
  getAllCategoriesForAdmin: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const data = await ProjectCategory.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await ProjectCategory.countDocuments();
    return { data, total, page, limit };
  },

  // --- Projects ---
  createProject: async (payload: Partial<IProject>) => {
    return await Project.create(payload);
  },
  getAllProjects: async (categoryId?: string) => {
    const query: any = { status: "active" };
    if (categoryId) query.category = categoryId;
    return await Project.find(query).populate("category").sort({ createdAt: -1 });
  },
  getAllProjectsForAdmin: async (page = 1, limit = 10, searchTerm = "") => {
    const query: any = {};
    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { client: { $regex: searchTerm, $options: "i" } },
      ];
    }
    const skip = (page - 1) * limit;
    const data = await Project.find(query).populate("category").sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Project.countDocuments(query);
    return { data, total, page, limit };
  },
};
