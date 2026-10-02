import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { PortfolioService } from "./portfolio.service";

export const PortfolioController = {
  // Highlights
  createHighlight: catchAsync(async (req: Request, res: Response) => {
    const result = await PortfolioService.createHighlight(req.body);
    sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: "Highlight created", data: result });
  }),
  getAllHighlights: catchAsync(async (req: Request, res: Response) => {
    const result = await PortfolioService.getAllHighlights();
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Highlights fetched", data: result });
  }),
  getAllHighlightsForAdmin: catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await PortfolioService.getAllHighlightsForAdmin(page, limit);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Highlights fetched for admin", data: result });
  }),

  updateHighlight: catchAsync(async (req: Request, res: Response) => {
    const result = await PortfolioService.updateHighlight(req.params.id, req.body);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Highlight updated", data: result });
  }),
  deleteHighlight: catchAsync(async (req: Request, res: Response) => {
    const result = await PortfolioService.deleteHighlight(req.params.id);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Highlight deleted", data: result });
  }),

  // Categories
  createCategory: catchAsync(async (req: Request, res: Response) => {
    const result = await PortfolioService.createCategory(req.body);
    sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: "Category created", data: result });
  }),
  getAllCategories: catchAsync(async (req: Request, res: Response) => {
    const result = await PortfolioService.getAllCategories();
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Categories fetched", data: result });
  }),
  getAllCategoriesForAdmin: catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await PortfolioService.getAllCategoriesForAdmin(page, limit);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Categories fetched for admin", data: result });
  }),
  updateCategory: catchAsync(async (req: Request, res: Response) => {
    const result = await PortfolioService.updateCategory(req.params.id, req.body);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Category updated", data: result });
  }),
  deleteCategory: catchAsync(async (req: Request, res: Response) => {
    const result = await PortfolioService.deleteCategory(req.params.id);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Category deleted", data: result });
  }),

  // Projects
  createProject: catchAsync(async (req: Request, res: Response) => {
    let payload = req.body.data ? JSON.parse(req.body.data) : req.body;
    if (req.file) {
      payload.image = (req.file as any).path;
      payload.image_key = (req.file as any).filename;
    }
    const result = await PortfolioService.createProject(payload);
    sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: "Project created", data: result });
  }),
  getAllProjects: catchAsync(async (req: Request, res: Response) => {
    const categoryId = req.query.categoryId as string;
    const result = await PortfolioService.getAllProjects(categoryId);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Projects fetched", data: result });
  }),
  getAllProjectsForAdmin: catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const searchTerm = (req.query.searchTerm as string || req.query.searchterm as string) || "";
    const result = await PortfolioService.getAllProjectsForAdmin(page, limit, searchTerm);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Projects fetched for admin", data: result });
  }),
  updateProject: catchAsync(async (req: Request, res: Response) => {
    let payload = req.body.data ? JSON.parse(req.body.data) : req.body;
    if (req.file) {
      payload.image = (req.file as any).path;
      payload.image_key = (req.file as any).filename;
    }
    const result = await PortfolioService.updateProject(req.params.id, payload);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Project updated", data: result });
  }),
  deleteProject: catchAsync(async (req: Request, res: Response) => {
    const result = await PortfolioService.deleteProject(req.params.id);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Project deleted", data: result });
  }),
};
