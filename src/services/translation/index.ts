import NotFoundError from "@/errors/NotFoundError";
import Translation from "@/models/translation";
import {
    ITranslation,
    TranslationModel,
    TranslationPayload,
} from "@/models/translation/types";

export class TranslationService {
    constructor(private translationModel: TranslationModel) {}

    public async fetch(): Promise<ITranslation> {
        const translationDoc = await this.translationModel.findOne({});

        if (!translationDoc) {
            return await this.translationModel.create({});
        }

        return translationDoc;
    }

    public async compareVersion(version: Date): Promise<boolean> {
        const translationDoc = await this.fetch();
        if (translationDoc.version.getTime() !== version.getTime()) {
            return false;
        }

        return true;
    }

    public async update(
        key: string,
        values: TranslationPayload
    ): Promise<true> {
        const translationDoc = await this.fetch();

        translationDoc.translations.set(key.toUpperCase(), values);

        await translationDoc.save();

        return true;
    }

    public async delete(key: string): Promise<true> {
        const translationDoc = await this.fetch();

        const deleteSuccess = translationDoc.translations.delete(
            key.toUpperCase()
        );

        if (!deleteSuccess) {
            throw new NotFoundError({ message: "Translation not found" });
        }
        await translationDoc.save();
        return true;
    }
}

const translationService = new TranslationService(Translation);

export default translationService;
