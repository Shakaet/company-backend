import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { CareerService } from "./career.service";

export const CareerController = {
  createJob: catchAsync(async (req: Request, res: Response) => {
    const result = await CareerService.createJob(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Job posted successfully",
      data: result,
    });
  }),

  getAllJobs: catchAsync(async (req: Request, res: Response) => {
    const result = await CareerService.getAllJobs();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Jobs fetched successfully",
      data: result,
    });
  }),

  getAllJobsForAdmin: catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const searchTerm = (req.query.searchterm as string || req.query.searchTerm as string) || "";

    const result = await CareerService.getAllJobsForAdmin(page, limit, searchTerm);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Jobs fetched successfully for admin",
      data: result,
    });
  }),

  applyForJob: catchAsync(async (req: Request, res: Response) => {
    const result = await CareerService.applyForJob(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Job application submitted successfully",
      data: result,
    });
  }),

  getJobApplications: catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const jobId = req.query.jobId as string;

    const result = await CareerService.getJobApplications(page, limit, jobId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Job applications fetched successfully",
      data: result,
    });
  }),

  updateJob: catchAsync(async (req: Request, res: Response) => {
    const result = await CareerService.updateJob(req.params.id, req.body);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Job updated", data: result });
  }),

  deleteJob: catchAsync(async (req: Request, res: Response) => {
    const result = await CareerService.deleteJob(req.params.id);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Job deleted", data: result });
  }),

  updateApplicationStatus: catchAsync(async (req: Request, res: Response) => {
    const result = await CareerService.updateApplicationStatus(req.params.id, req.body.status);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Application status updated", data: result });
  }),
};
