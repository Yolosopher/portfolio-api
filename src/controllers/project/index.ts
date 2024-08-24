import BadRequestError from "@/errors/BadRequestError";
import NotFoundError from "@/errors/NotFoundError";
import { IProject, IProjectPopulated } from "@/models/project/types";
import projectService from "@/services/project";
import { Request, Response } from "express";

class ProjectController {
    constructor() {}
    public async create(req: Request, res: Response) {
        const { name } = req.body;

        const payload: any = {
            name,
        };
        if (req.body.group) {
            payload.group = req.body.group;
        }
        if (req.body.image) {
            payload.image = req.body.image;
        }
        if (req.body.stack) {
            payload.stack = req.body.stack;
        }
        if (req.body.description) {
            payload.description = req.body.description;
        }
        if (req.body.preview) {
            payload.preview = req.body.preview;
        }
        if (req.body.github) {
            payload.github = req.body.github;
        }
        if (req.body.priority) {
            payload.priority = req.body.priority;
        }
        if (req.body.hidden) {
            payload.hidden = req.body.hidden;
        }

        const result = await projectService.create(payload);

        res.status(201).json({
            message: "Project created successfully",
            data: result,
        });
    }
    public async delete(req: Request, res: Response) {
        const idOrName = req.params.idOrName;

        await projectService.delete(idOrName);

        res.status(200).json({
            message: "Project deleted successfully",
        });
    }
    public async fetchAll(req: Request, res: Response) {
        const group = req.query?.group;
        const hidden = req.query?.hidden;

        const query: any = group ? { group } : {};
        if (hidden === "true") {
            query.hidden = true;
        } else if (hidden === "false") {
            query.hidden = false;
        }

        const result = await projectService.getAll(query);

        res.status(200).json({
            message: "Projects fetched successfully",
            data: result,
        });
    }
    public async toggleHidden(req: Request, res: Response) {
        const idOrName = req.params.idOrName;

        const result = await projectService.toggleHidden(idOrName);

        res.status(200).json({
            message: "Project hidden status toggled successfully",
            data: result,
        });
    }
    public async fetchOne(req: Request, res: Response) {
        const idOrName = req.params.idOrName;

        let result: null | IProjectPopulated | IProject =
            await projectService.getOne(idOrName);

        if (!result) {
            throw new NotFoundError({
                message: "Project not found",
            });
        }

        if (result) {
            result = (await result.populate<IProjectPopulated>("stack"))!;
        }

        res.status(200).json({
            message: "Project fetched successfully",
            data: result,
        });
    }
    public async update(req: Request, res: Response) {
        const idOrName = req.params.idOrName;
        const payload: any = {};

        if (
            !req.body.name &&
            !req.body.image &&
            !req.body.stack &&
            !req.body.description &&
            !req.body.preview &&
            !req.body.github &&
            !req.body.group &&
            !req.body.priority
        ) {
            throw new BadRequestError({
                message: "Nothing to update",
            });
        }

        if (req.body.name) {
            payload.name = req.body.name;
        }
        if (req.body.image) {
            payload.image = req.body.image;
        }
        if (req.body.stack) {
            payload.stack = req.body.stack;
        }
        if (req.body.description) {
            payload.description = req.body.description;
        }
        if (req.body.preview) {
            payload.preview = req.body.preview;
        }
        if (req.body.github) {
            payload.github = req.body.github;
        }
        if (req.body.group) {
            payload.group = req.body.group;
        }
        if (req.body.priority) {
            payload.priority = req.body.priority;
        }
        const result = await projectService.update(idOrName, payload);

        res.status(200).json({
            message: "Project updated successfully",
            data: result,
        });
    }
}

const projectController = new ProjectController();

export default projectController;
