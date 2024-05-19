import { TID } from "@/global";
import { Document, Model } from "mongoose";

export type LEVEL = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type PRIORITY = 1 | 2 | 3 | 4 | 5;

export interface ITechStack extends Document {
  _id: TID;
  name: string;
  icon: string;
  level: LEVEL;
  priority: PRIORITY;
  description: string;
}

export interface TechStackModel extends Model<ITechStack> {}
