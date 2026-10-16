import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { BlogService } from "./blog.service";

export const BlogController = {
  create: catchAsync(async (req: Request, res: Response) => {
    const payload = req.body.data ? JSON.parse(req.body.data) : req.body;
    if (req.file) {
      payload.cover = (req.file as Express.Multer.File).path;
    }
    const result = await BlogService.create(payload);
    sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: "Blog post created", data: result });
  }),

  getPublicPosts: catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.getPublicPosts(req.query.category as string | undefined);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Blog posts fetched", data: result });
  }),

  getPublicPostBySlug: catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.getPublicPostBySlug(String(req.params.slug));
    sendResponse(res, { statusCode: httpStatus.OK, success: true, data: result });
  }),

  getCategories: catchAsync(async (_req: Request, res: Response) => {
    const result = await BlogService.getPublicCategories();
    sendResponse(res, { statusCode: httpStatus.OK, success: true, data: result });
  }),

  createCategory: catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.createCategory({
      name: req.body.name,
      slug: req.body.slug,
    });
    sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: "Blog category created", data: result });
  }),

  getAdminCategories: catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.getAdminCategories(
      Number(req.query.page) || 1,
      Number(req.query.limit) || 10,
      (req.query.searchTerm as string) || "",
    );
    sendResponse(res, { statusCode: httpStatus.OK, success: true, data: result.data, totalData: result.total });
  }),

  updateCategory: catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.updateCategory(String(req.params.id), req.body);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Blog category updated", data: result });
  }),

  removeCategory: catchAsync(async (req: Request, res: Response) => {
    await BlogService.removeCategory(String(req.params.id));
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Blog category deleted" });
  }),

  getAdminPosts: catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.getAdminPosts(
      Number(req.query.page) || 1,
      Number(req.query.limit) || 10,
      (req.query.searchTerm as string) || "",
    );
    sendResponse(res, { statusCode: httpStatus.OK, success: true, data: result.data, totalData: result.total });
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const payload = req.body.data ? JSON.parse(req.body.data) : req.body;
    if (req.file) {
      payload.cover = (req.file as Express.Multer.File).path;
    }
    const result = await BlogService.update(String(req.params.id), payload);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Blog post updated", data: result });
  }),

  remove: catchAsync(async (req: Request, res: Response) => {
    await BlogService.remove(String(req.params.id));
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Blog post deleted" });
  }),
};
