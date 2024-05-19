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
      default: "No description yet",
    },
    image: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    preview: {
      type: String,
      default: "",
    },
    stack: {
      type: [{ type: Schema.Types.ObjectId, ref: "TechStack" }],
      default: [],
    },
    group: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Project = model<IProject, ProjectModel>("Project", ProjectSchema);

export default Project;
