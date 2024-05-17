import { TID } from "@/global";
import { Document, Model } from "mongoose";

export enum WorkHours {
  FULL_TIME = "Full Time",
  PART_TIME = "Part Time",
  INTERNSHIP = "Internship",
}

export interface IExperience extends Document {
  _id: TID;
  position: string;
  company: string;
  location: string;
  work_hours: WorkHours;
  start_date: Date | string;
  end_date: Date | string;
  description: string;
}

export interface ExperienceModel extends Model<IExperience> {}
