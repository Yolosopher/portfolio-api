import Stack from "@/models/tech-stach";
import BadRequestError from "@/errors/BadRequestError";
import { isValidObjectId } from "mongoose";
import { ITechStack, LEVEL, TechStackModel } from "@/models/tech-stach/types";
import DuplicateError from "@/errors/DuplicateError";

export class TechStackService {
  constructor(protected techStackModel: TechStackModel) {}

  public async getOne(idOrName: string): Promise<ITechStack | null> {
    if (isValidObjectId(idOrName)) {
      return await this.techStackModel.findById(idOrName);
    }
    return await this.techStackModel.findOne({ name: idOrName });
  }

  public async create({
    name,
    icon,
    level,
    description,
  }: {
    name: string;
    icon: string;
    level?: LEVEL;
    description?: string;
  }) {
    // check if stack already exists
    const stackExists = await this.getOne(name);
    if (stackExists) {
      throw new DuplicateError({
        message: "Stack with this name already exists",
      });
    }

    const payload: Partial<ITechStack> = {
      name,
      icon,
    };

    if (level) {
      payload.level = level;
    }

    if (description) {
      payload.description = description;
    }

    return await this.techStackModel.create(payload);
  }

  public async delete(idOrName: string) {
    const stack = await this.getOne(idOrName);
    if (!stack) {
      throw new BadRequestError({ message: "Tech stack not found" });
    }

    return await this.techStackModel.findByIdAndDelete(stack._id.toString(), {
      new: true,
    });
  }

  public async update(idOrName: string, payload: Partial<ITechStack>) {
    const stack = await this.getOne(idOrName);
    if (!stack) {
      throw new BadRequestError({ message: "Tech stack not found" });
    }

    // check duplicate name
    if (payload.name) {
      const stackExists = await this.getOne(payload.name);
      if (stackExists && stackExists._id.toString() !== stack._id.toString()) {
        throw new DuplicateError({
          message: "Stack with this name already exists",
        });
      }
    }

    return await this.techStackModel.findByIdAndUpdate(
      stack._id.toString(),
      payload,
      {
        new: true,
      }
    );
  }

  public async getAll() {
    return await this.techStackModel.find({});
  }
}

const techStackService = new TechStackService(Stack);

export default techStackService;
