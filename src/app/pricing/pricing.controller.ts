import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { PricingService } from "./pricing.service";

export const PricingController = {
  createPlan: catchAsync(async (req: Request, res: Response) => {
    const result = await PricingService.createPlan(req.body);
    sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: "Pricing plan created successfully", data: result });
  }),

  getAllPlans: catchAsync(async (req: Request, res: Response) => {
    const result = await PricingService.getAllPlans();
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Pricing plans fetched successfully", data: result });
  }),

  getAllPlansForAdmin: catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const searchTerm = (req.query.searchTerm as string || req.query.searchterm as string) || "";
    const result = await PricingService.getAllPlansForAdmin(page, limit, searchTerm);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Pricing plans fetched successfully for admin", data: result });
  }),

  createGuarantee: catchAsync(async (req: Request, res: Response) => {
    const result = await PricingService.createGuarantee(req.body);
    sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: "Pricing guarantee created successfully", data: result });
  }),

  getAllGuarantees: catchAsync(async (req: Request, res: Response) => {
    const result = await PricingService.getAllGuarantees();
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Pricing guarantees fetched successfully", data: result });
  }),

  getAllGuaranteesForAdmin: catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await PricingService.getAllGuaranteesForAdmin(page, limit);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Pricing guarantees fetched successfully for admin", data: result });
  }),

  updatePlan: catchAsync(async (req: Request, res: Response) => {
    const result = await PricingService.updatePlan(req.params.id as string, req.body);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Plan updated", data: result });
  }),

  deletePlan: catchAsync(async (req: Request, res: Response) => {
    const result = await PricingService.deletePlan(req.params.id as string);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Plan deleted", data: result });
  }),

  updateGuarantee: catchAsync(async (req: Request, res: Response) => {
    const result = await PricingService.updateGuarantee(req.params.id as string, req.body);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Guarantee updated", data: result });
  }),

  deleteGuarantee: catchAsync(async (req: Request, res: Response) => {
    const result = await PricingService.deleteGuarantee(req.params.id as string);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Guarantee deleted", data: result });
  }),
};
