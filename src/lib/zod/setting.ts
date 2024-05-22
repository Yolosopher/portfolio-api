import z from "zod";
import validator from "validator";
import { emailSchema } from ".";

const defaultSchema = z.object({
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
    .optional(),
  email: emailSchema,
  phone: z
    .string({
      message: "Phone is required",
    })
    .refine((param) =>
      validator.isMobilePhone(param.trim().replaceAll(" ", ""))
    ),
  address: z.string({
    message: "Address is required",
  }),

  // soc media links
  github: z
    .string({
      message: "Github is required",
    })
    .optional(),
  linkedin: z
    .string({
      message: "Linkedin is required",
    })
    .optional(),
  twitter: z
    .string({
      message: "Twitter is required",
    })
    .optional(),
  facebook: z
    .string({
      message: "Facebook is required",
    })
    .optional(),
  instagram: z
    .string({
      message: "Instagram is required",
    })
    .optional(),
  youtube: z
    .string({
      message: "YouTube is required",
    })
    .optional(),
});

const settingSchema = defaultSchema.partial({
  // make social media links optional
  github: true,
  linkedin: true,
  twitter: true,
  facebook: true,
  instagram: true,
  youtube: true,
});

export const updateSettingSchema = settingSchema.partial();
