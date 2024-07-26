import z from "zod";

export const createProjectSchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .min(1, {
      message: "At least 1 character",
    })
    .max(255, {
      message: "Too long",
    }),
  image: z
    .string({
      message: "Image name is required",
    })
    .min(1, {
      message: "At least 1 character",
    })
    .max(255, {
      message: "Too long",
    })
    .optional(),
  stack: z
    .string({
      message: "Stack ID must be present and must be a string",
    })
    .array()
    .optional(),
  description: z
    .string({
      message: "Description must be a string",
    })
    .optional(),
  preview: z
    .string({
      message: "Preview link must be a string",
    })
    .optional(),
  github: z
    .string({
      message: "Github link must be a string",
    })
    .optional(),
  group: z
    .string({
      message: "Group name is required",
    })
    .min(1, {
      message: "At least 1 character",
    })
    .max(255, {
      message: "Too long",
    })
    .optional(),
  priority: z.number().int().optional(),
});

export const updateProjectSchema = createProjectSchema.partial({
  name: true,
});
