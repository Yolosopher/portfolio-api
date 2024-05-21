import { TID } from "@/global";
import { Document, Model } from "mongoose";

export interface IEducation extends Document {
  _id: TID;
  field: string;
  university: string;
  start_date: Date | string;
  end_date: Date | string | null;
  description: string;
}

export interface EducationModel extends Model<IEducation> {}
