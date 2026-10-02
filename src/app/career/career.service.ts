import ApiError from "../../errors/ApiError";
import { ICareerJob, IJobApplication } from "./career.interface";
import { CareerJob, JobApplication } from "./career.model";

export const CareerService = {
  createJob: async (payload: Partial<ICareerJob>): Promise<ICareerJob> => {
    return await CareerJob.create(payload);
  },

  getAllJobs: async (): Promise<ICareerJob[]> => {
    return await CareerJob.find({ status: "active" }).sort({ createdAt: -1 });
  },

  getAllJobsForAdmin: async (
    page: number = 1,
    limit: number = 10,
    searchTerm: string = ""
  ): Promise<{ data: ICareerJob[]; total: number; page: number; limit: number }> => {
    const query: any = {};
    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { department: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const data = await CareerJob.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await CareerJob.countDocuments(query);

    return {
      data,
      total,
      page,
      limit,
    };
  },

  applyForJob: async (payload: Partial<IJobApplication>): Promise<IJobApplication> => {
    return await JobApplication.create(payload);
  },

  getJobApplications: async (
    page: number = 1,
    limit: number = 10,
    jobId?: string
  ): Promise<{ data: IJobApplication[]; total: number; page: number; limit: number }> => {
    const query: any = {};
    if (jobId) {
      query.jobId = jobId;
    }

    const skip = (page - 1) * limit;

    const data = await JobApplication.find(query)
      .populate("jobId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await JobApplication.countDocuments(query);

    return {
      data,
      total,
      page,
      limit,
    };
  },
};
