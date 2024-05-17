import BadRequestError from "@/errors/BadRequestError";
import NotFoundError from "@/errors/NotFoundError";
import { IEducation } from "@/models/education/types";
import educationService from "@/services/education";
import { Request, Response } from "express";

class EducationController {
  constructor() {}
  public async create(req: Request, res: Response) {
    const { field, university, start_date } = req.body;

    const payload: any = {
      field,
      university,
      start_date,
    };

    if (req.body.end_date) {
      payload.end_date = req.body.end_date;
    }
    if (req.body.description) {
      payload.description = req.body.description;
    }

    const result = await educationService.create(payload);

    res.status(201).json({
      message: "Education created successfully",
      data: result,
    });
  }
  public async delete(req: Request, res: Response) {
    const idOrField = req.params.idOrField;

    await educationService.delete(idOrField);

    res.status(200).json({
      message: "Education deleted successfully",
    });
  }
  public async fetchAll(req: Request, res: Response) {
    const result = await educationService.getAll();

    res.status(200).json({
      message: "Educations fetched successfully",
      data: result,
    });
  }
  public async fetchOne(req: Request, res: Response) {
    const idOrField = req.params.idOrField;

    const result: null | IEducation = await educationService.getOne(idOrField);

    if (!result) {
      throw new NotFoundError({
        message: "Education not found",
      });
    }

    res.status(200).json({
      message: "Education fetched successfully",
      data: result,
    });
  }
  public async update(req: Request, res: Response) {
    const idOrField = req.params.idOrField;
    const payload: any = {};

    if (
      !req.body.field &&
      !req.body.university &&
      !req.body.start_date &&
      !req.body.description &&
      !req.body.end_date
    ) {
      throw new BadRequestError({
        message: "Nothing to update",
      });
    }
    if (req.body.field) {
      payload.field = req.body.field;
    }
    if (req.body.university) {
      payload.university = req.body.university;
    }
    if (req.body.start_date) {
      payload.start_date = req.body.start_date;
    }

    if (req.body.end_date) {
      payload.end_date = req.body.end_date;
    }
    if (req.body.description) {
      payload.description = req.body.description;
    }
    const result = await educationService.update(idOrField, payload);

    res.status(200).json({
      message: "Education updated successfully",
      data: result,
    });
  }
  public async makeCurrent(req: Request, res: Response) {
    const idOrField = req.params.idOrField;

    const result = await educationService.makeCurrent(idOrField);

    res.status(200).json({
      message: "Education updated successfully",
      data: result,
    });
  }
}

const educationController = new EducationController();

export default educationController;
