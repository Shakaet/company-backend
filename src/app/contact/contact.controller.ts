import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ContactService } from "./contact.service";

export const ContactController = {
  createContact: catchAsync(async (req: Request, res: Response) => {
    const result = await ContactService.createContact(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Message sent successfully",
      data: result,
    });
  }),

  getAllContacts: catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const searchTerm = (req.query.searchterm as string || req.query.searchTerm as string) || "";

    const result = await ContactService.getAllContacts(page, limit, searchTerm);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Contacts fetched successfully",
      data: result,
    });
  }),

  deleteContact: catchAsync(async (req: Request, res: Response) => {
    await ContactService.deleteContact(req.params.id as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Contact deleted successfully",
      data: null,
    });
  }),
};
