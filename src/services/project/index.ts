import Project from "@/models/project";
import BadRequestError from "@/errors/BadRequestError";
import { isValidObjectId } from "mongoose";
import {
    IProject,
    IProjectPopulated,
    ProjectModel,
} from "@/models/project/types";
import DuplicateError from "@/errors/DuplicateError";
import techStackService from "../tech-stach";

export class ProjectService {
    constructor(protected projectModel: ProjectModel) {}

    public async getOne(idOrName: string): Promise<IProject | null> {
        if (isValidObjectId(idOrName)) {
            return await this.projectModel.findById(idOrName);
        }
        return await this.projectModel.findOne({ name: idOrName });
    }

    public async create({
        name,
        image,
        github,
        preview,
        description,
        stack,
        group,
        priority,
        hidden,
    }: {
        name: string;
        image?: string;
        github?: string;
        preview?: string;
        description?: string;
        stack?: string[];
        group?: string;
        priority?: number;
        hidden?: boolean;
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

        if (group) {
            payload.group = group;
        }

        if (description) {
            payload.description = description;
        }

        if (priority) {
            payload.priority = priority;
        }
        if (typeof hidden === "boolean") {
            payload.hidden = hidden;
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
            throw new BadRequestError({ message: "Project not found" });
        }

        return await this.projectModel.findByIdAndDelete(
            project._id.toString(),
            {
                new: true,
            }
        );
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

        return await this.projectModel.findByIdAndUpdate(
            project._id.toString(),
            payload,
            {
                new: true,
            }
        );
    }

    public async getAll(query: any) {
        return await this.projectModel
            .find(query)
            .sort({ priority: 1 })
            .populate<IProjectPopulated>("stack");
    }

    public async toggleHidden(idOrName: string) {
        const project = await this.getOne(idOrName);
        if (!project) {
            throw new BadRequestError({ message: "Project not found" });
        }

        return await this.projectModel.findByIdAndUpdate(
            project._id.toString(),
            {
                hidden: !project.hidden,
            },
            {
                new: true,
            }
        );
    }
}

const projectService = new ProjectService(Project);

export default projectService;
