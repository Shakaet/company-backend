import { IOurCompany, IOurTeam, IFounderMessage } from "./about.interface";
import { OurCompany, OurTeam, FounderMessage } from "./about.model";

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
  createTeamMember: async (payload: Partial<IOurTeam>) => {
    return await OurTeam.create(payload);
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

  // Founder Message
  createOrUpdateFounderMessage: async (payload: Partial<IFounderMessage>) => {
    let msg = await FounderMessage.findOne();
    if (msg) {
      Object.assign(msg, payload);
      return await msg.save();
    }
    return await FounderMessage.create(payload);
  },
  getFounderMessage: async () => {
    return await FounderMessage.findOne();
  }
};
