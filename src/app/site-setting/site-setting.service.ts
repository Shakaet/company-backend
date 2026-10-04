import { ISiteSetting } from "./site-setting.interface";
import { SiteSetting } from "./site-setting.model";
import { FileUploadHelper } from "../../helpers/image.upload";
import ApiError from "../../errors/ApiError";

export const SiteSettingService = {
  /**
   * Admin — Create or Update site settings (singleton document)
   * Handles optional logo image upload
   */
  createOrUpdate: async (file: Express.Multer.File | undefined, payload: Partial<ISiteSetting>) => {
    let setting = await SiteSetting.findOne();
    let updateData: Partial<ISiteSetting> = { ...payload };

    if (file) {
      // Delete old logo from Cloudinary if exists
      if (setting?.logo_key) {
        await FileUploadHelper.deleteFromSpaces(setting.logo_key);
      }
      const uploaded = await FileUploadHelper.uploadToSpaces(file);
      updateData.logo = uploaded.Location;
      updateData.logo_key = uploaded.Key;
    }

    if (setting) {
      Object.assign(setting, updateData);
      return await setting.save();
    }

    return await SiteSetting.create(updateData);
  },

  /**
   * Admin — GET full site settings (all fields)
   */
  getForAdmin: async () => {
    const setting = await SiteSetting.findOne();
    if (!setting) throw new ApiError(404, "Site setting not found");
    return setting;
  },

  /**
   * Public User — GET site settings (same document, public safe)
   */
  getForUser: async () => {
    const setting = await SiteSetting.findOne().select(
      "companyName tagline logo email phone whatsappNumber address socialLinks footerTagline footerQuickLinks copyrightText metaTitle metaDescription"
    );
    if (!setting) throw new ApiError(404, "Site setting not found");
    return setting;
  },
};
