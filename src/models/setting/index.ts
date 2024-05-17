import { Schema, model } from "mongoose";
import { ISetting, SettingModel } from "./types";

const SettingSchema = new Schema<ISetting>(
  {
    about_me: {
      type: String,
      required: true,
      default: "No about me yet",
    },
    intro_text: {
      type: String,
      required: true,
      default: "No intro text yet",
    },
    image: {
      type: String,
      required: true,
      default: "No image link yet",
    },
    email: {
      type: String,
      required: true,
      default: "No email yet",
    },
    phone: {
      type: String,
      required: true,
      default: "No phone yet",
    },
    address: {
      type: String,
      required: true,
      default: "No address yet",
    },
    github: {
      type: String,
      required: true,
      default: "",
    },
    linkedin: {
      type: String,
      required: true,
      default: "",
    },
    twitter: {
      type: String,
      required: true,
      default: "",
    },
    facebook: {
      type: String,
      required: true,
      default: "",
    },
    instagram: {
      type: String,
      required: true,
      default: "",
    },
    youtube: {
      type: String,
      required: true,
      default: "",
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Setting = model<ISetting, SettingModel>("Setting", SettingSchema);

export default Setting;
