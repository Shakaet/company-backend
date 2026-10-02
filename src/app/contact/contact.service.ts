import ApiError from "../../errors/ApiError";
import { IContact } from "./contact.interface";
import { Contact } from "./contact.model";

export const ContactService = {
  createContact: async (payload: Partial<IContact>): Promise<IContact> => {
    return await Contact.create(payload);
  },

  getAllContacts: async (
    page: number = 1,
    limit: number = 10,
    searchTerm: string = "",
  ): Promise<{ data: IContact[]; total: number; page: number; limit: number }> => {
    const query: any = {};
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { inquiryType: { $regex: searchTerm, $options: "i" } },
        { company: { $regex: searchTerm, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const data = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments(query);

    return {
      data,
      total,
      page,
      limit,
    };
  },

  deleteContact: async (id: string): Promise<void> => {
    const existing = await Contact.findById(id);
    if (!existing) throw new ApiError(404, "Contact not found");
    await Contact.findByIdAndDelete(id);
  },
};
