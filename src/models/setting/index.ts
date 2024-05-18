import { Schema, model } from "mongoose";
import { ISetting, SettingModel } from "./types";

const SettingSchema = new Schema<ISetting>(
  {
    about_me: {
      type: String,
      default: "No about me yet",
    },
    intro_text: {
      type: String,
      default: "No intro text yet",
    },
    image: {
      type: String,
      default: "No image link yet",
    },
    email: {
      type: String,
      default: "No email yet",
    },
    phone: {
      type: String,
      default: "No phone yet",
    },
    address: {
      type: String,
      default: "No address yet",
    },
    github: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    youtube: {
      type: String,
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
