import Experience from "@/models/experience";
import BadRequestError from "@/errors/BadRequestError";
import { isValidObjectId } from "mongoose";
import {
  IExperience,
  ExperienceModel,
  WorkHours,
} from "@/models/experience/types";

export class ExperienceService {
  constructor(protected experienceModel: ExperienceModel) {}

  public async getOne(idOrPosition: string): Promise<IExperience | null> {
    if (isValidObjectId(idOrPosition)) {
      return await this.experienceModel.findById(idOrPosition);
    }
    return await this.experienceModel.findOne({ position: idOrPosition });
  }

  public async create({
    position,
    company,
    location,
    start_date,
    work_hours,
    description,
    end_date,
  }: {
    position: string;
    company: string;
    location: string;
    start_date: Date | string;
    work_hours?: WorkHours;
    description?: string;
    end_date?: Date | string;
  }) {
    const payload: Partial<IExperience> = {
      position,
      company,
      location,
      start_date,
    };

    if (work_hours) {
      payload.work_hours = work_hours;
    }
    if (end_date) {
      payload.end_date = end_date;
    }

    if (description) {
      payload.description = description;
    }

    return await this.experienceModel.create(payload);
  }

  public async delete(idOrPosition: string) {
    const experience = await this.getOne(idOrPosition);
    if (!experience) {
      throw new BadRequestError({ message: "Experience not found" });
    }

    return await this.experienceModel.findByIdAndDelete(
      experience._id.toString(),
      {
        new: true,
      }
    );
  }

  public async update(idOrPosition: string, payload: Partial<IExperience>) {
    const experience = await this.getOne(idOrPosition);
    if (!experience) {
      throw new BadRequestError({ message: "Experience not found" });
    }

    return await this.experienceModel.findByIdAndUpdate(
      experience._id.toString(),
      payload,
      {
        new: true,
      }
    );
  }

  public async getAll() {
    return await this.experienceModel.find({});
  }

  public async makeCurrent(idOrPosition: string) {
    const experience = await this.getOne(idOrPosition);
    if (!experience) {
      throw new BadRequestError({ message: "Experience not found" });
    }

    if (!experience.end_date) {
      throw new BadRequestError({
        message: "Experience is already current",
      });
    }

    return await this.experienceModel.findByIdAndUpdate(
      experience._id.toString(),
      { $set: { end_date: null } },
      {
        new: true,
      }
    );
  }
}

const experienceService = new ExperienceService(Experience);

export default experienceService;
