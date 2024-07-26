import { TID } from "@/global";
import { Document, Model } from "mongoose";
import { ITechStack } from "../tech-stack/types";

export interface IProject extends Document {
  _id: TID;
  name: string;
  stack: TID[];
  description: string;
  github: string;
  preview: string;
  image: string;
  group: string;
  priority: number;
}

export interface IProjectPopulated extends Omit<IProject, "stack"> {
  stack: ITechStack[];
}

export interface ProjectModel extends Model<IProject> {}
