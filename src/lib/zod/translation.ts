import z from "zod";

export const updateTranslationSchema = z.object({
    key: z.string({
        message: "Key is required",
    }),
    values: z.object({
        en: z
            .string({
                message: "English translation must be a string",
            })
            .optional(),
        ka: z
            .string({
                message: "Georgian translation must be a string",
            })
            .optional(),
    }),
});

export const deleteTranslationSchema = z.object({
    key: z.string({
        message: "Key is required and must be a string",
    }),
});
