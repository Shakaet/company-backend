import { IOurCompany, IOurTeam, IFounderMessage } from "./about.interface";
import { OurCompany, OurTeam, FounderMessage } from "./about.model";
import { FileUploadHelper } from "../../helpers/image.upload";
import ApiError from "../../errors/ApiError";

export const AboutService = {
  // Our Company
  createOrUpdateCompany: async (payload: Partial<IOurCompany>) => {
    let company = await OurCompany.findOne();
    if (company) {
      Object.assign(company, payload);
      return await company.save();
    }
    return await OurCompany.create(payload);
  },
  getCompany: async () => {
    return await OurCompany.findOne();
  },

  // Our Team
  createTeamMember: async (file: any, payload: Partial<IOurTeam>) => {
    if (!file) throw new ApiError(400, "Team member image is required");
    const uploaded = await FileUploadHelper.uploadToSpaces(file);
    return await OurTeam.create({
      ...payload,
      image: uploaded.Location,
      image_key: uploaded.Key,
    });
  },
  getAllTeamMembers: async () => {
    return await OurTeam.find({ status: "active" }).sort({ createdAt: -1 });
  },
  getAllTeamMembersForAdmin: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const data = await OurTeam.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await OurTeam.countDocuments();
    return { data, total, page, limit };
  },
  updateTeamMember: async (id: string, file: any, payload: Partial<IOurTeam>) => {
    const existing = await OurTeam.findById(id);
    if (!existing) throw new ApiError(404, "Team member not found");

    let updateData = { ...payload };

    if (file) {
      if (existing.image_key) {
        await FileUploadHelper.deleteFromSpaces(existing.image_key);
      }
      const uploaded = await FileUploadHelper.uploadToSpaces(file);
      updateData.image = uploaded.Location;
      updateData.image_key = uploaded.Key;
    }

    return await OurTeam.findByIdAndUpdate(id, updateData, { new: true });
  },
  deleteTeamMember: async (id: string) => {
    const existing = await OurTeam.findById(id);
    if (!existing) throw new ApiError(404, "Team member not found");

    if (existing.image_key) {
      await FileUploadHelper.deleteFromSpaces(existing.image_key);
    }
    return await OurTeam.findByIdAndDelete(id);
  },

  // Founder Message
  createOrUpdateFounderMessage: async (file: any, payload: Partial<IFounderMessage>) => {
    let msg = await FounderMessage.findOne();
    let updateData = { ...payload };

    if (file) {
      if (msg && msg.image_key) {
        await FileUploadHelper.deleteFromSpaces(msg.image_key);
      }
      const uploaded = await FileUploadHelper.uploadToSpaces(file);
      updateData.image = uploaded.Location;
      updateData.image_key = uploaded.Key;
    }

    if (msg) {
      Object.assign(msg, updateData);
      return await msg.save();
    }
    return await FounderMessage.create(updateData);
  },
  getFounderMessage: async () => {
    return await FounderMessage.findOne();
  }
};
