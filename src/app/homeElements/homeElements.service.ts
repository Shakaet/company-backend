import { ITestimonial, IWhyChooseUs, IPartner, ITechStack, IStat } from "./homeElements.interface";
import { Testimonial, WhyChooseUs, Partner, TechStack, Stat } from "./homeElements.model";

export const HomeElementsService = {
  // Testimonials
  createTestimonial: async (payload: Partial<ITestimonial>) => {
    return await Testimonial.create(payload);
  },
  getAllTestimonials: async () => {
    return await Testimonial.find({ status: "active" }).sort({ createdAt: -1 });
  },
  getAllTestimonialsForAdmin: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const data = await Testimonial.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Testimonial.countDocuments();
    return { data, total, page, limit };
  },
  updateTestimonial: async (id: string, payload: Partial<ITestimonial>) => {
    return await Testimonial.findByIdAndUpdate(id, payload, { new: true });
  },
  deleteTestimonial: async (id: string) => {
    return await Testimonial.findByIdAndDelete(id);
  },

  // Why Choose Us
  createWhyChooseUs: async (payload: Partial<IWhyChooseUs>) => {
    return await WhyChooseUs.create(payload);
  },
  getAllWhyChooseUs: async () => {
    return await WhyChooseUs.find({ status: "active" }).sort({ createdAt: -1 });
  },
  getAllWhyChooseUsForAdmin: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const data = await WhyChooseUs.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await WhyChooseUs.countDocuments();
    return { data, total, page, limit };
  },
  updateWhyChooseUs: async (id: string, payload: Partial<IWhyChooseUs>) => {
    return await WhyChooseUs.findByIdAndUpdate(id, payload, { new: true });
  },
  deleteWhyChooseUs: async (id: string) => {
    return await WhyChooseUs.findByIdAndDelete(id);
  },

  // Partners
  createPartner: async (payload: Partial<IPartner>) => {
    return await Partner.create(payload);
  },
  getAllPartners: async () => {
    return await Partner.find({ status: "active" }).sort({ createdAt: -1 });
  },
  getAllPartnersForAdmin: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const data = await Partner.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Partner.countDocuments();
    return { data, total, page, limit };
  },
  updatePartner: async (id: string, payload: Partial<IPartner>) => {
    return await Partner.findByIdAndUpdate(id, payload, { new: true });
  },
  deletePartner: async (id: string) => {
    return await Partner.findByIdAndDelete(id);
  },

  // Tech Stack
  createTechStack: async (payload: Partial<ITechStack>) => {
    return await TechStack.create(payload);
  },
  getAllTechStacks: async () => {
    return await TechStack.find({ status: "active" }).sort({ createdAt: -1 });
  },
  getAllTechStacksForAdmin: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const data = await TechStack.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await TechStack.countDocuments();
    return { data, total, page, limit };
  },
  updateTechStack: async (id: string, payload: Partial<ITechStack>) => {
    return await TechStack.findByIdAndUpdate(id, payload, { new: true });
  },
  deleteTechStack: async (id: string) => {
    return await TechStack.findByIdAndDelete(id);
  },

  // Stats
  createStat: async (payload: Partial<IStat>) => {
    return await Stat.create(payload);
  },
  getAllStats: async () => {
    return await Stat.find({ status: "active" }).sort({ createdAt: -1 });
  },
  getAllStatsForAdmin: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const data = await Stat.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Stat.countDocuments();
    return { data, total, page, limit };
  },
  updateStat: async (id: string, payload: Partial<IStat>) => {
    return await Stat.findByIdAndUpdate(id, payload, { new: true });
  },
  deleteStat: async (id: string) => {
    return await Stat.findByIdAndDelete(id);
  }
};
