import { Schema, model } from "mongoose";
import { IEducation, EducationModel } from "./types";

const EducationSchema = new Schema<IEducation>(
  {
    field: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    university: {
      type: String,
      required: true,
      trim: true,
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

const Education = model<IEducation, EducationModel>(
  "Education",
  EducationSchema
);

export default Education;
