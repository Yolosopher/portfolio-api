import Project from "@/models/project";
import BadRequestError from "@/errors/BadRequestError";
import { isValidObjectId } from "mongoose";
import {
  IProject,
  IProjectPopulated,
  ProjectModel,
} from "@/models/project/types";
import DuplicateError from "@/errors/DuplicateError";
import imageStoreService from "../image-store";
import techStackService from "../tech-stach";

export class ProjectService {
  constructor(protected projectModel: ProjectModel) {}

  public async getOne(idOrName: string): Promise<IProject | null> {
    if (isValidObjectId(idOrName)) {
      return await this.projectModel.findById(idOrName);
    }
    return await this.projectModel.findOne({ idOrName: idOrName });
  }

  public async create({
    name,
    image,
    github,
    preview,
    description,
    stack,
  }: {
    name: string;
    image?: string;
    github?: string;
    preview?: string;
    description?: string;
    stack?: string[];
  }) {
    // check if project already exists
    const projectExists = await this.getOne(name);
    if (projectExists) {
      throw new DuplicateError({
        message: "Project with this name already exists",
      });
    }

    const payload: Partial<IProject> = {
      name,
    };

    if (image) {
      payload.image = image;
    }

    if (github) {
      payload.github = github;
    }

    if (preview) {
      payload.preview = preview;
    }

    if (description) {
      payload.description = description;
    }

    if (stack && Array.isArray(stack) && stack.length > 0) {
      payload.stack = [];
      for (const each of stack) {
        if (isValidObjectId(each)) {
          const foundStack = await techStackService.getOne(each);
          if (foundStack) {
            payload.stack.push(foundStack._id.toString());
          }
        }
      }
    }

    return await this.projectModel.create(payload);
  }

  public async delete(idOrName: string) {
    const project = await this.getOne(idOrName);
    if (!project) {
      throw new BadRequestError({ message: "Project project not found" });
    }

    if (project.image) {
      // delete image file
      await imageStoreService.delete(project.image);
    }

    return await this.projectModel.findByIdAndDelete(project._id.toString(), {
      new: true,
    });
  }

  public async update(idOrName: string, payload: Partial<IProject>) {
    const project = await this.getOne(idOrName);
    if (!project) {
      throw new BadRequestError({ message: "Project not found" });
    }

    // check duplicate name
    if (payload.name) {
      const projectExists = await this.getOne(payload.name);
      if (
        projectExists &&
        projectExists._id.toString() !== project._id.toString()
      ) {
        throw new DuplicateError({
          message: "Project with this name already exists",
        });
      }
    }

    if (payload.image && project.image) {
      // delete old image file
      await imageStoreService.delete(project.image);
    }

    return await this.projectModel.findByIdAndUpdate(
      project._id.toString(),
      payload,
      {
        new: true,
      }
    );
  }

  public async getAll() {
    return await this.projectModel
      .find({})
      .populate<IProjectPopulated>("stack");
  }
}

const projectService = new ProjectService(Project);

export default projectService;
