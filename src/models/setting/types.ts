import { TID } from "@/global";
import { Document, Model } from "mongoose";

export interface ISetting extends Document {
  _id: TID;
  about_me: string;
  intro_text: string;

  // personal info
  image: string;
  email: string;
  phone: string;
  address: string;

  // social media links
  github: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

export interface SettingModel extends Model<ISetting> {}
