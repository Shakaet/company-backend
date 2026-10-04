import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { SiteSettingService } from "./site-setting.service";

export const SiteSettingController = {
  /**
   * Admin — POST /api/v1/site-setting
   * Accepts multipart/form-data (logo file + JSON body or FormData "data" field)
   */
  createOrUpdate: catchAsync(async (req: Request, res: Response) => {
    const payload = req.body.data ? JSON.parse(req.body.data) : req.body;
    const result = await SiteSettingService.createOrUpdate(req.file, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Site setting saved successfully",
      data: result,
    });
  }),

  /**
   * Admin — GET /api/v1/site-setting/admin
   * Returns full document including logo_key (for admin panel)
   */
  getForAdmin: catchAsync(async (_req: Request, res: Response) => {
    const result = await SiteSettingService.getForAdmin();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Site setting fetched (admin)",
      data: result,
    });
  }),

  /**
   * Public — GET /api/v1/site-setting
   * Returns public-safe fields for TopBar, Footer, SEO
   */
  getForUser: catchAsync(async (_req: Request, res: Response) => {
    const result = await SiteSettingService.getForUser();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Site setting fetched",
      data: result,
    });
  }),
};
