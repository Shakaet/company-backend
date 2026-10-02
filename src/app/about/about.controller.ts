import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AboutService } from "./about.service";

export const AboutController = {
  // Our Company
  createOrUpdateCompany: catchAsync(async (req: Request, res: Response) => {
    const result = await AboutService.createOrUpdateCompany(req.body);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Company details updated", data: result });
  }),
  getCompany: catchAsync(async (req: Request, res: Response) => {
    const result = await AboutService.getCompany();
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Company details fetched", data: result });
  }),

  // Our Team
  createTeamMember: catchAsync(async (req: Request, res: Response) => {
    // If payload is sent as stringified JSON in FormData
    const payload = req.body.data ? JSON.parse(req.body.data) : req.body;
    const result = await AboutService.createTeamMember(req.file, payload);
    sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: "Team member created", data: result });
  }),
  getAllTeamMembers: catchAsync(async (req: Request, res: Response) => {
    const result = await AboutService.getAllTeamMembers();
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Team members fetched", data: result });
  }),
  getAllTeamMembersForAdmin: catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await AboutService.getAllTeamMembersForAdmin(page, limit);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Team members fetched for admin", data: result });
  }),
  updateTeamMember: catchAsync(async (req: Request, res: Response) => {
    const payload = req.body.data ? JSON.parse(req.body.data) : req.body;
    const result = await AboutService.updateTeamMember(req.params.id, req.file, payload);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Team member updated", data: result });
  }),
  deleteTeamMember: catchAsync(async (req: Request, res: Response) => {
    await AboutService.deleteTeamMember(req.params.id);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Team member deleted", data: null });
  }),

  // Founder Message
  createOrUpdateFounderMessage: catchAsync(async (req: Request, res: Response) => {
    const payload = req.body.data ? JSON.parse(req.body.data) : req.body;
    const result = await AboutService.createOrUpdateFounderMessage(req.file, payload);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Founder message updated", data: result });
  }),
  getFounderMessage: catchAsync(async (req: Request, res: Response) => {
    const result = await AboutService.getFounderMessage();
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Founder message fetched", data: result });
  }),
};
