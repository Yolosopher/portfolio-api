import { Schema, model } from "mongoose";
import { IExperience, ExperienceModel, WorkHours } from "./types";

const ExperienceSchema = new Schema<IExperience>(
  {
    position: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    work_hours: {
      type: String,
      required: true,
      enum: [WorkHours.FULL_TIME, WorkHours.PART_TIME, WorkHours.INTERNSHIP],
      default: WorkHours.FULL_TIME,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: false,
      default: undefined,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Experience = model<IExperience, ExperienceModel>(
  "Experience",
  ExperienceSchema
);

export default Experience;
