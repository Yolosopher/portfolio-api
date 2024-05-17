import z from "zod";
import validator from "validator";
import { emailSchema } from ".";

const settingSchema = z.object({
  about_me: z.string({
    message: "About me is required",
  }),
  intro_text: z.string({
    message: "Intro text is required",
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
    }),
  email: emailSchema,
  phone: z
    .string({
      message: "Phone is required",
    })
    .refine(validator.isMobilePhone),
  address: z.string({
    message: "Address is required",
  }),

  // soc media links
  github: z
    .string({
      message: "Github is required",
    })
    .url({
      message: "Invalid URL",
    }),

  linkedin: z
    .string({
      message: "Linkedin is required",
    })
    .url({
      message: "Invalid URL",
    }),
  twitter: z
    .string({
      required_error: "Twitter is required",
    })
    .url({
      message: "Invalid URL",
    }),
  facebook: z
    .string({
      required_error: "Facebook is required",
    })
    .url({
      message: "Invalid URL",
    }),
  instagram: z
    .string({
      required_error: "Instagram is required",
    })
    .url({
      message: "Invalid URL",
    }),
  youtube: z
    .string({
      required_error: "YouTube is required",
    })
    .url({
      message: "Invalid URL",
    }),
});

export const updateSettingSchema = settingSchema.partial();
