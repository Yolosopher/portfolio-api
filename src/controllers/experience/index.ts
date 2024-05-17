import BadRequestError from "@/errors/BadRequestError";
import NotFoundError from "@/errors/NotFoundError";
import { IExperience } from "@/models/experience/types";
import experienceService from "@/services/experience";
import { Request, Response } from "express";

class ExperienceController {
  constructor() {}
  public async create(req: Request, res: Response) {
    const { position, company, location, start_date } = req.body;

    const payload: any = {
      position,
      company,
      location,
      start_date,
    };

    if (req.body.work_hours) {
      payload.work_hours = req.body.work_hours;
    }
    if (req.body.end_date) {
      payload.end_date = req.body.end_date;
    }
    if (req.body.description) {
      payload.description = req.body.description;
    }

    const result = await experienceService.create(payload);

    res.status(201).json({
      message: "Experience created successfully",
      data: result,
    });
  }
  public async delete(req: Request, res: Response) {
    const idOrPosition = req.params.idOrPosition;

    await experienceService.delete(idOrPosition);

    res.status(200).json({
      message: "Experience deleted successfully",
    });
  }
  public async fetchAll(req: Request, res: Response) {
    const result = await experienceService.getAll();

    res.status(200).json({
      message: "Experiences fetched successfully",
      data: result,
    });
  }
  public async fetchOne(req: Request, res: Response) {
    const idOrPosition = req.params.idOrPosition;

    const result: null | IExperience = await experienceService.getOne(
      idOrPosition
    );

    if (!result) {
      throw new NotFoundError({
        message: "Experience not found",
      });
    }

    res.status(200).json({
      message: "Experience fetched successfully",
      data: result,
    });
  }
  public async update(req: Request, res: Response) {
    const idOrPosition = req.params.idOrPosition;
    const payload: any = {};

    if (
      !req.body.position &&
      !req.body.company &&
      !req.body.location &&
      !req.body.start_date &&
      !req.body.description &&
      !req.body.work_hours &&
      !req.body.end_date
    ) {
      throw new BadRequestError({
        message: "Nothing to update",
      });
    }
    if (req.body.position) {
      payload.position = req.body.position;
    }
    if (req.body.company) {
      payload.company = req.body.company;
    }
    if (req.body.location) {
      payload.location = req.body.location;
    }
    if (req.body.start_date) {
      payload.start_date = req.body.start_date;
    }

    if (req.body.work_hours) {
      payload.work_hours = req.body.work_hours;
    }
    if (req.body.end_date) {
      payload.end_date = req.body.end_date;
    }
    if (req.body.description) {
      payload.description = req.body.description;
    }
    const result = await experienceService.update(idOrPosition, payload);

    res.status(200).json({
      message: "Experience updated successfully",
      data: result,
    });
  }
  public async makeCurrent(req: Request, res: Response) {
    const idOrPosition = req.params.idOrPosition;

    const result = await experienceService.makeCurrent(idOrPosition);

    res.status(200).json({
      message: "Experience updated successfully",
      data: result,
    });
  }
}

const experienceController = new ExperienceController();

export default experienceController;
