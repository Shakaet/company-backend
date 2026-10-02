import { IPricingPlan, IPricingGuarantee } from "./pricing.interface";
import { PricingPlan, PricingGuarantee } from "./pricing.model";

export const PricingService = {
  createPlan: async (payload: Partial<IPricingPlan>): Promise<IPricingPlan> => {
    return await PricingPlan.create(payload);
  },

  getAllPlans: async (): Promise<IPricingPlan[]> => {
    return await PricingPlan.find({ status: "active" }).sort({ createdAt: -1 });
  },

  getAllPlansForAdmin: async (
    page: number = 1,
    limit: number = 10,
    searchTerm: string = ""
  ): Promise<{ data: IPricingPlan[]; total: number; page: number; limit: number }> => {
    const query: any = {};
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { tagline: { $regex: searchTerm, $options: "i" } },
      ];
    }
    const skip = (page - 1) * limit;
    const data = await PricingPlan.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await PricingPlan.countDocuments(query);
    return { data, total, page, limit };
  },

  createGuarantee: async (payload: Partial<IPricingGuarantee>): Promise<IPricingGuarantee> => {
    return await PricingGuarantee.create(payload);
  },

  getAllGuarantees: async (): Promise<IPricingGuarantee[]> => {
    return await PricingGuarantee.find({ status: "active" }).sort({ createdAt: -1 });
  },

  getAllGuaranteesForAdmin: async (
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: IPricingGuarantee[]; total: number; page: number; limit: number }> => {
    const skip = (page - 1) * limit;
    const data = await PricingGuarantee.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await PricingGuarantee.countDocuments();
    return { data, total, page, limit };
  },
};
