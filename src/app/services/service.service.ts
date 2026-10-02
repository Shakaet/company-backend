import ApiError from "../../errors/ApiError";
import { IService, IServiceConsultation } from "./service.interface";
import { ServiceModel, ServiceConsultation } from "./service.model";

export const ServiceService = {
  // --- Services ---
  createService: async (payload: Partial<IService>): Promise<IService> => {
    return await ServiceModel.create(payload);
  },

  getAllServices: async (): Promise<IService[]> => {
    return await ServiceModel.find({ status: "active" }).sort({ createdAt: -1 });
  },
  
  getServiceBySlug: async (slug: string): Promise<IService> => {
    const service = await ServiceModel.findOne({ slug, status: "active" });
    if (!service) throw new ApiError(404, "Service not found");
    return service;
  },

  getAllServicesForAdmin: async (
    page: number = 1,
    limit: number = 10,
    searchTerm: string = ""
  ) => {
    const query: any = {};
    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
      ];
    }
    const skip = (page - 1) * limit;
    const data = await ServiceModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await ServiceModel.countDocuments(query);
    return { data, total, page, limit };
  },

  updateService: async (id: string, payload: Partial<IService>): Promise<IService | null> => {
    const existing = await ServiceModel.findById(id);
    if (!existing) throw new ApiError(404, "Service not found");
    return await ServiceModel.findByIdAndUpdate(id, payload, { new: true });
  },

  deleteService: async (id: string): Promise<IService | null> => {
    const existing = await ServiceModel.findById(id);
    if (!existing) throw new ApiError(404, "Service not found");
    return await ServiceModel.findByIdAndDelete(id);
  },

  // --- Consultations (Form) ---
  createConsultation: async (payload: Partial<IServiceConsultation>): Promise<IServiceConsultation> => {
    return await ServiceConsultation.create(payload);
  },

  getAllConsultationsForAdmin: async (
    page: number = 1,
    limit: number = 10
  ) => {
    const skip = (page - 1) * limit;
    const data = await ServiceConsultation.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await ServiceConsultation.countDocuments();
    return { data, total, page, limit };
  },

  updateConsultationStatus: async (id: string, status: string): Promise<IServiceConsultation | null> => {
    const existing = await ServiceConsultation.findById(id);
    if (!existing) throw new ApiError(404, "Consultation not found");
    return await ServiceConsultation.findByIdAndUpdate(id, { status }, { new: true });
  },
};
