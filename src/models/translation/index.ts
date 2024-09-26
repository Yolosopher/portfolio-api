import { model, Schema } from "mongoose";
import { ITranslation, TranslationModel, TranslationObject } from "./types";

const TranslationObjectSchema = new Schema<TranslationObject>(
    {
        en: {
            type: String,
            default: "",
        },
        ka: {
            type: String,
            default: "",
        },
    },
    {
        _id: false,
        strict: false,
        versionKey: false,
        timestamps: false,
    }
);

const TranslationSchema = new Schema<ITranslation>(
    {
        translations: {
            type: Map,
            of: TranslationObjectSchema,
            default: new Map(),
        },
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: false,
            updatedAt: "version",
        },
    }
);

const Translation = model<ITranslation, TranslationModel>(
    "Translation",
    TranslationSchema
);

export default Translation;
