import z from "zod";

export const createEducationSchema = z.object({
  field: z
    .string({
      message: "Field is required",
    })
    .min(1, {
      message: "At least 1 character",
    })
    .max(255, {
      message: "Too long",
    }),
  university: z
    .string({
      message: "University name is required",
    })
    .min(1, {
      message: "At least 1 character",
    })
    .max(255, {
      message: "Too long",
    }),
  start_date: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : undefined),
    z.date({
      message: "Start date is required",
    })
  ),
  description: z
    .string({
      message: "Description must be a string",
    })
    .optional(),
  end_date: z
    .preprocess(
      (arg) => (typeof arg === "string" ? new Date(arg) : undefined),
      z.date({
        message: "End date is required",
      })
    )
    .optional(),
});

export const updateEducationSchema = createEducationSchema.partial({
  field: true,
  university: true,
  start_date: true,
});
