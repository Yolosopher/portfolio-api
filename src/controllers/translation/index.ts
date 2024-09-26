import BadRequestError from "@/errors/BadRequestError";
import { TranslationPayload } from "@/models/translation/types";
import translationService from "@/services/translation";
import { Request, Response } from "express";

class TranslationController {
    constructor() {}

    public async fetch(req: Request, res: Response) {
        const result = await translationService.fetch();
        return res.status(200).json({
            message: "Translations fetched successfully",
            data: Object.fromEntries(result.translations),
            version: result.version,
        });
    }

    public async compareVersion(req: Request, res: Response) {
        let version = req.body.version;

        if (!version) {
            throw new BadRequestError({
                message: "Version is required",
            });
        }
        if (typeof version === "string") {
            version = new Date(version);
        }

        const result = await translationService.compareVersion(version);

        res.json({
            message: "Version compared successfully",
            versionsMatch: result,
        });
    }

    public async update(req: Request, res: Response) {
        const key = req.body.key! as string;
        const values = req.body.values as TranslationPayload;

        if (!values.en && !values.ka) {
            throw new BadRequestError({
                message: "At least one(en or ka) translation value is required",
            });
        }

        await translationService.update(key, values);

        return res.status(200).json({
            message: "Translation updated successfully",
        });
    }

    public async delete(req: Request, res: Response) {
        const key = req.query.key! as string;

        await translationService.delete(key);

        return res.status(200).json({
            message: "Translation deleted successfully",
        });
    }
}

const translationController = new TranslationController();

export default translationController;
