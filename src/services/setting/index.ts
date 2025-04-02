import BadRequestError from "@/errors/BadRequestError";
import Setting from "@/models/setting";
import { SettingModel } from "@/models/setting/types";
import { existsSync } from "fs";
import path from "path";

export class SettingService {
  constructor(protected settingModel: SettingModel) {}

  public async fetch() {
    const exists = await this.settingModel.findOne({});
    if (exists) {
      return exists;
    } else {
      return (await this.settingModel.create({}))!;
    }
  }
  public async update({
    about_me,
    intro_text,
    image,
    email,
    phone,
    address,
    github,
    linkedin,
    twitter,
    facebook,
    instagram,
    youtube,
  }: {
    about_me?: string;
    intro_text?: string;
    image?: string;
    email?: string;
    phone?: string;
    address?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  }) {
    const setting = await this.fetch();
    // update setting
    if (
      !about_me &&
      !intro_text &&
      !image &&
      !email &&
      !phone &&
      !address &&
      !github &&
      !linkedin &&
      !twitter &&
      !facebook &&
      !instagram &&
      !youtube
    ) {
      throw new BadRequestError({
        message: "Nothing to update",
      });
    }
    const payload: any = {};

    if (about_me) {
      payload.about_me = about_me;
    }
    if (intro_text) {
      payload.intro_text = intro_text;
    }
    if (image) {
      payload.image = image;
    }
    if (email) {
      payload.email = email;
    }
    if (phone) {
      payload.phone = phone;
    }
    if (address) {
      payload.address = address;
    }
    if (github) {
      payload.github = github;
    }
    if (linkedin) {
      payload.linkedin = linkedin;
    }
    if (twitter) {
      payload.twitter = twitter;
    }
    if (facebook) {
      payload.facebook = facebook;
    }
    if (instagram) {
      payload.instagram = instagram;
    }
    if (youtube) {
      payload.youtube = youtube;
    }

    return (await this.settingModel.findByIdAndUpdate(
      setting._id.toString(),
      payload,
      {
        new: true,
      }
    ))!;
  }

  public downloadCVPath() {
    const cvPath = path.resolve("cv-file/Nika_Nishnianidze.pdf");
    const cvExists = existsSync(cvPath);
    if (!cvExists) {
      throw new BadRequestError({
        message: "CV not found",
      });
    }
    return cvPath;
  }
}

const settingService = new SettingService(Setting);

export default settingService;
