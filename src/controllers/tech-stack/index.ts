import BadRequestError from "@/errors/BadRequestError";
import NotFoundError from "@/errors/NotFoundError";
import techStackService from "@/services/tech-stach";
import { Request, Response } from "express";

class TechStackController {
  constructor() {}
  public async create(req: Request, res: Response) {
    const { name, icon } = req.body;

    const payload: any = {
      name,
      icon,
    };
    if (
      req.body.level &&
      typeof req.body.level === "number" &&
      Number.isInteger(req.body.level) &&
      req.body.level >= 1 &&
      req.body.level <= 10
    ) {
      payload.level = req.body.level;
    }
    if (
      req.body.priority &&
      typeof req.body.priority === "number" &&
      Number.isInteger(req.body.priority) &&
      req.body.priority >= 1 &&
      req.body.priority <= 5
    ) {
      payload.priority = req.body.priority;
    }

    if (req.body.description) {
      payload.description = req.body.description;
    }

    const result = await techStackService.create(payload);

    res.status(201).json({
      message: "TechStack created successfully",
      data: result,
    });
  }
  public async delete(req: Request, res: Response) {
    const idOrName = req.params.idOrName;

    await techStackService.delete(idOrName);

    res.status(200).json({
      message: "TechStack deleted successfully",
    });
  }
  public async fetchAll(req: Request, res: Response) {
    const result = await techStackService.getAll();

    res.status(200).json({
      message: "TechStacks fetched successfully",
      data: result,
    });
  }
  public async fetchOne(req: Request, res: Response) {
    const idOrName = req.params.idOrName;

    const result = await techStackService.getOne(idOrName);

    if (!result) {
      throw new NotFoundError({
        message: "TechStack not found",
      });
    }

    res.status(200).json({
      message: "TechStack fetched successfully",
      data: result,
    });
  }
  public async update(req: Request, res: Response) {
    const idOrName = req.params.idOrName;

    if (
      !req.body.name &&
      !req.body.icon &&
      !req.body.level &&
      !req.body.description &&
      !req.body.priority
    ) {
      throw new BadRequestError({
        message: "Nothing to update",
      });
    }

    const payload: any = {};
    if (req.body.name) {
      payload.name = req.body.name;
    }
    if (req.body.icon) {
      payload.icon = req.body.icon;
    }
    if (
      req.body.level &&
      typeof req.body.level === "number" &&
      Number.isInteger(req.body.level) &&
      req.body.level >= 1 &&
      req.body.level <= 10
    ) {
      payload.level = req.body.level;
    }
    if (
      req.body.priority &&
      typeof req.body.priority === "number" &&
      Number.isInteger(req.body.priority) &&
      req.body.priority >= 1 &&
      req.body.priority <= 5
    ) {
      payload.priority = req.body.priority;
    }

    if (req.body.description) {
      payload.description = req.body.description;
    }

    const result = await techStackService.update(idOrName, payload);

    res.status(200).json({
      message: "TechStack updated successfully",
      data: result,
    });
  }
}

const techStackController = new TechStackController();

export default techStackController;
