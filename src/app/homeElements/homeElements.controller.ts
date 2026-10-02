import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { HomeElementsService } from "./homeElements.service";

export const HomeElementsController = {
  createTestimonial: catchAsync(async (req: Request, res: Response) => {
    const result = await HomeElementsService.createTestimonial(req.body);
    sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: "Testimonial created", data: result });
  }),
  getAllTestimonials: catchAsync(async (req: Request, res: Response) => {
    const result = await HomeElementsService.getAllTestimonials();
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Testimonials fetched", data: result });
  }),
  getAllTestimonialsForAdmin: catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await HomeElementsService.getAllTestimonialsForAdmin(page, limit);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Testimonials fetched for admin", data: result });
  }),

  createWhyChooseUs: catchAsync(async (req: Request, res: Response) => {
    const result = await HomeElementsService.createWhyChooseUs(req.body);
    sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: "Why Choose Us created", data: result });
  }),
  getAllWhyChooseUs: catchAsync(async (req: Request, res: Response) => {
    const result = await HomeElementsService.getAllWhyChooseUs();
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Why Choose Us fetched", data: result });
  }),
  getAllWhyChooseUsForAdmin: catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await HomeElementsService.getAllWhyChooseUsForAdmin(page, limit);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Why Choose Us fetched for admin", data: result });
  })
};
