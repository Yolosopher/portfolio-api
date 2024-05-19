import z from "zod";

export const createTechStackSchema = z.object({
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
  icon: z
    .string({
      message: "Icon name is required",
    })
    .min(1, {
      message: "At least 1 character",
    })
    .max(255, {
      message: "Too long",
    }),
  level: z
    .number({
      message: "Level must be a level between 1 and 10",
    })
    .int({
      message: "Level must be an integer",
    })
    .min(1, {
      message: "At least 1",
    })
    .max(10, {
      message: "At most 10",
    })
    .optional(),
  priority: z
    .number({
      message: "Priority must be a level between 1 and 5",
    })
    .int({
      message: "Priority must be an integer",
    })
    .min(1, {
      message: "At least 1",
    })
    .max(5, {
      message: "At most 5",
    })
    .optional(),
  description: z
    .string({
      message: "Description must be a string",
    })
    .optional(),
});

export const updateTechStackSchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .min(1, {
      message: "At least 1 character",
    })
    .max(255, {
      message: "Too long",
    })
    .optional(),
  icon: z
    .string({
      message: "Icon name is required",
    })
    .min(1, {
      message: "At least 1 character",
    })
    .max(255, {
      message: "Too long",
    })
    .optional(),
  level: z
    .number({
      message: "Level must be a level between 1 and 10",
    })
    .int({
      message: "Level must be an integer",
    })
    .min(1, {
      message: "At least 1",
    })
    .max(10, {
      message: "At most 10",
    })
    .optional(),
  priority: z
    .number({
      message: "Priority must be a level between 1 and 5",
    })
    .int({
      message: "Priority must be an integer",
    })
    .min(1, {
      message: "At least 1",
    })
    .max(5, {
      message: "At most 5",
    })
    .optional(),
  description: z
    .string({
      message: "Description must be a string",
    })
    .optional(),
});
