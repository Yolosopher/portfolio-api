import BadRequestError from "@/errors/BadRequestError";
import settingService from "@/services/setting";
import { Request, Response } from "express";

class SettingController {
  constructor() {}

  public async downloadCV(req: Request, res: Response) {
    const cvPath = settingService.downloadCVPath();
    res.download(cvPath);
  }

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

  public async uploadCV(req: Request, res: Response) {
    const file = req.file;
    if (!file) {
      throw new BadRequestError({
        message: "No file uploaded",
      });
    }

    res.status(200).json({
      message: "CV uploaded successfully",
      data: {
        link: `${req.protocol}://${req.get("host")}/cv`,
      },
    });
  }
}

const projectController = new SettingController();

export default projectController;
