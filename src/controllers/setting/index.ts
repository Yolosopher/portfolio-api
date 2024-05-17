import settingService from "@/services/setting";
import { Request, Response } from "express";

class ProjectController {
  constructor() {}

  public async fetch(req: Request, res: Response) {
    const settings = await settingService.fetch();

    res.status(200).json({
      message: "Settings fetched successfully",
      data: settings,
    });
  }
  public async update(req: Request, res: Response) {
    const setting = await settingService.update(req.body);

    res.status(200).json({
      message: "Settings updated successfully",
      data: setting,
    });
  }
}

const projectController = new ProjectController();

export default projectController;
