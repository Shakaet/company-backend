import { ITestimonial, IWhyChooseUs } from "./homeElements.interface";
import { Testimonial, WhyChooseUs } from "./homeElements.model";

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
  }
};
