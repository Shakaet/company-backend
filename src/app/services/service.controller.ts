import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ServiceService } from "./service.service";

export const ServiceController = {
  // --- Services ---
  createService: catchAsync(async (req: Request, res: Response) => {
    let payload = req.body;
    if (req.body.data) {
      payload = JSON.parse(req.body.data);
    }
    if (req.file) {
      payload.icon = (req.file as any).path;
      payload.icon_key = (req.file as any).filename;
    }
    const result = await ServiceService.createService(payload);
    sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: "Service created successfully", data: result });
  }),

  getAllServices: catchAsync(async (req: Request, res: Response) => {
    const result = await ServiceService.getAllServices();
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Services fetched successfully", data: result });
  }),
  
  getServiceBySlug: catchAsync(async (req: Request, res: Response) => {
    const result = await ServiceService.getServiceBySlug(req.params.slug);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Service fetched successfully", data: result });
  }),

  getAllServicesForAdmin: catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const searchTerm = (req.query.searchTerm as string || req.query.searchterm as string) || "";
    const result = await ServiceService.getAllServicesForAdmin(page, limit, searchTerm);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Services fetched for admin", data: result });
  }),

  updateService: catchAsync(async (req: Request, res: Response) => {
    let payload = req.body;
    if (req.body.data) {
      payload = JSON.parse(req.body.data);
    }
    if (req.file) {
      payload.icon = (req.file as any).path;
      payload.icon_key = (req.file as any).filename;
    }
    const result = await ServiceService.updateService(req.params.id, payload);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Service updated successfully", data: result });
  }),

  deleteService: catchAsync(async (req: Request, res: Response) => {
    const result = await ServiceService.deleteService(req.params.id);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Service deleted successfully", data: result });
  }),

  // --- Consultations ---
  createConsultation: catchAsync(async (req: Request, res: Response) => {
    const result = await ServiceService.createConsultation(req.body);
    sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: "Consultation submitted successfully", data: result });
  }),

  getAllConsultationsForAdmin: catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await ServiceService.getAllConsultationsForAdmin(page, limit);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Consultations fetched successfully", data: result });
  }),
  updateConsultationStatus: catchAsync(async (req: Request, res: Response) => {
    const result = await ServiceService.updateConsultationStatus(req.params.id, req.body.status);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Consultation status updated", data: result });
  }),
};
