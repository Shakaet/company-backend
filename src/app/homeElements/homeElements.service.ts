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
  }
};
