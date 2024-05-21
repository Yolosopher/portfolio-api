import Education from "@/models/education";
import BadRequestError from "@/errors/BadRequestError";
import { isValidObjectId } from "mongoose";
import { IEducation, EducationModel } from "@/models/education/types";

export class EducationService {
  constructor(protected educationModel: EducationModel) {}

  public async getOne(idOrField: string): Promise<IEducation | null> {
    if (isValidObjectId(idOrField)) {
      return await this.educationModel.findById(idOrField);
    }
    return await this.educationModel.findOne({ field: idOrField });
  }

  public async create({
    field,
    university,
    start_date,
    description,
    end_date,
  }: {
    field: string;
    university: string;
    start_date: Date | string;
    description?: string;
    end_date?: Date | string;
  }) {
    const payload: Partial<IEducation> = {
      field,
      university,
      start_date,
    };

    if (end_date) {
      payload.end_date = end_date;
    }

    if (description) {
      payload.description = description;
    }

    return await this.educationModel.create(payload);
  }

  public async delete(idOrField: string) {
    const education = await this.getOne(idOrField);
    if (!education) {
      throw new BadRequestError({ message: "Education not found" });
    }

    return await this.educationModel.findByIdAndDelete(
      education._id.toString(),
      {
        new: true,
      }
    );
  }

  public async update(idOrField: string, payload: Partial<IEducation>) {
    const education = await this.getOne(idOrField);
    if (!education) {
      throw new BadRequestError({ message: "Education not found" });
    }

    return await this.educationModel.findByIdAndUpdate(
      education._id.toString(),
      payload,
      {
        new: true,
      }
    );
  }

  public async getAll() {
    return await this.educationModel.find({});
  }

  public async makeCurrent(idOrField: string) {
    const education = await this.getOne(idOrField);
    if (!education) {
      throw new BadRequestError({ message: "Education not found" });
    }

    if (!education.end_date) {
      throw new BadRequestError({
        message: "Education is already current",
      });
    }

    return await this.educationModel.findByIdAndUpdate(
      education._id.toString(),
      { $set: { end_date: null } },
      {
        new: true,
      }
    );
  }
}

const educationService = new EducationService(Education);

export default educationService;
