import { TID } from "@/global";
import { Document, Model } from "mongoose";

export type TranslationPayload = {
    en: string;
    ka: string;
};

export interface TranslationObject extends Document {
    en: string;
    ka: string;
}

export interface ITranslation extends Document {
    // need to put here a type for mongoose map of key value pairs
    _id: TID;
    translations: Map<string, TranslationPayload>;
    version: Date;
}

export interface TranslationModel extends Model<ITranslation> {}
