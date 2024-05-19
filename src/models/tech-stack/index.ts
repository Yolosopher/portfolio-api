import { Schema, model } from "mongoose";
import { ITechStack, TechStackModel } from "./types";
import arrayGenerate from "@/utils/array-generate";

const TechStackSchema = new Schema<ITechStack>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    icon: {
      type: String,
      default: "",
    },
    level: {
      type: Number,
      enum: arrayGenerate(10),
      default: 5,
    },
    description: {
      type: String,
      default: "",
    },
    priority: {
      type: Number,
      enum: arrayGenerate(5),
      default: 3,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const TechStack = model<ITechStack, TechStackModel>(
  "TechStack",
  TechStackSchema
);

export default TechStack;
