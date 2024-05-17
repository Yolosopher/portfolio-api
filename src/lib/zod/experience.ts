import { WorkHours } from "@/models/experience/types";
import z from "zod";

export const createExperienceSchema = z.object({
  position: z
    .string({
      message: "Position is required",
    })
    .min(1, {
      message: "At least 1 character",
    })
    .max(255, {
      message: "Too long",
    }),
  company: z
    .string({
      message: "Company name is required",
    })
    .min(1, {
      message: "At least 1 character",
    })
    .max(255, {
      message: "Too long",
    }),
  location: z
    .string({
      message: "Location is required",
    })
    .min(1, {
      message: "At least 1 character",
    })
    .max(255, {
      message: "Too long",
    }),
  start_date: z.date({
    message: "Start date is required",
  }),
  work_hours: z.nativeEnum(WorkHours).optional(),
  description: z
    .string({
      message: "Description must be a string",
    })
    .optional(),
  end_date: z.date().optional(),
});

export const updateExperienceSchema = createExperienceSchema.partial({
  position: true,
  company: true,
  location: true,
  start_date: true,
});
