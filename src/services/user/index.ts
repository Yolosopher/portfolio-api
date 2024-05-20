import User from "@/models/user";
import BadRequestError from "@/errors/BadRequestError";
import CONFIG from "@/config";
import { isValidObjectId } from "mongoose";
import UnauthorizedError from "@/errors/UnauthorizedError";
import { comparePassword } from "@/utils/password";
import authService from "./auth.service";
import { IUser, UserModel } from "@/models/user/types";
import { Role } from "@/global";

export class UserService {
  constructor(protected userModel: UserModel) {}

  public async getOne(idOrEmail: string): Promise<IUser | null> {
    if (isValidObjectId(idOrEmail)) {
      return await this.userModel.findById(idOrEmail);
    }
    return await this.userModel.findOne({ email: idOrEmail });
  }

  public async delete({ _id }: { _id: string }) {
    const user = await this.userModel.findById(_id);
    if (!user) {
      throw new BadRequestError({
        message: "User not found",
      });
    }
    if (user.deleted) {
      throw new BadRequestError({
        message: "User already deleted",
      });
    }
    user.deleted = true;
    await user.save();
    return user;
  }

  public async initializeAdmin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const admin = await this.userModel.create({
      full_name: "Just Admin",
      email,
      password,
      role: Role.ADMIN,
    });

    return {
      code: 201,
      message: "Admin user created",
      admin_user: {
        _id: admin._id,
        email: admin.email,
        full_name: admin.full_name,
        role: admin.role,
      },
    };
  }

  public async initializeSuperAdmin() {
    const foundAdmin = await this.userModel.findOne({ role: Role.SUPER_ADMIN });
    if (foundAdmin) {
      return {
        code: 409,
        message: "Super Admin user already exists",
        admin_user: {
          _id: foundAdmin._id,
          email: foundAdmin.email,
          full_name: foundAdmin.full_name,
          role: foundAdmin.role,
        },
      };
    }

    const superAdmin = await this.userModel.create({
      full_name: "Nika Nishnianidze",
      email: CONFIG.default_super_admin.email,
      password: CONFIG.default_super_admin.password,
      role: Role.SUPER_ADMIN,
    });

    return {
      code: 201,
      message: "Super Admin user created",
      admin_user: {
        _id: superAdmin._id,
        email: superAdmin.email,
        full_name: superAdmin.full_name,
        role: superAdmin.role,
      },
    };
  }

  public async changeFullName({
    user_id,
    full_name,
  }: {
    user_id: string;
    full_name: string;
  }) {
    const user = await this.getOne(user_id);
    if (!user) {
      throw new BadRequestError({
        message: "User not found",
      });
    }

    user.full_name = full_name;
    await user.save();
    return user;
  }

  public async changePassword({
    user_id,
    new_password,
    password,
  }: {
    user_id: string;
    password: string;
    new_password: string;
  }) {
    const user = await this.getOne(user_id);
    if (!user) {
      throw new BadRequestError({
        message: "User not found",
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError({
        message: "Invalid email or password",
      });
    }

    user.password = new_password;
    await user.save();

    const { auth_token } = await authService.login({
      email: user.email,
      password: new_password,
    });

    return auth_token;
  }

  // admin routes
  public async grantAdminRole(target_id: string) {
    const user = await this.getOne(target_id);
    if (!user) {
      throw new BadRequestError({
        message: "User not found",
      });
    }

    if (user.role === Role.ADMIN) {
      throw new BadRequestError({
        message: "User is already an admin",
      });
    }
    if (user.role === Role.SUPER_ADMIN) {
      throw new BadRequestError({
        message: "User is already a super admin",
      });
    }

    await this.userModel.findByIdAndUpdate(
      user._id.toString(),
      { $set: { role: Role.ADMIN } },
      { new: true }
    );
  }

  public async getAllUsers(includeAdmins: boolean = false) {
    if (includeAdmins) {
      return await this.userModel
        .find({})
        .populate("owned_products", "paychecks");
    }
    return await this.userModel
      .find({ role: Role.USER })
      .populate("owned_products", "paychecks");
  }
}

const userService = new UserService(User);

export default userService;
