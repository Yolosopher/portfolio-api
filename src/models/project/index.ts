import { Schema, model } from "mongoose";
import { IProject, ProjectModel } from "./types";

const ProjectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      default: "No description yet",
    },
    image: {
      type: String,
      required: true,
      default: "",
    },
    github: {
      type: String,
      required: true,
      default: "",
    },
    preview: {
      type: String,
      required: true,
      default: "",
    },
    stack: {
      type: [{ type: Schema.Types.ObjectId, ref: "TechStack" }],
      required: true,
      default: [],
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Project = model<IProject, ProjectModel>("Project", ProjectSchema);

export default Project;
