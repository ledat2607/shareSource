import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../model/userModel";
import ErrorHandle from "../utils/ErrorHandle";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import { redis } from "../utils/redis";
import {
  getAllUserService,
  getUserById,
  updateUserRoleService,
} from "../services/userService";
import cloudinary from "cloudinary";

require("dotenv").config();
//register new user
interface IRegistionBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}
export const register = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    try {
      const isUser = await userModel.findOne({ email });
      if (isUser) {
        return next(
          new ErrorHandle("Email is exists. Please another email !", 400)
        );
      }
      const user: IRegistionBody = {
        name,
        email,
        password,
      };
      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;
      const data = {
        user: {
          name: user.name,
        },
        activationCode,
      };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mail/activation-mail.ejs"),
        data
      );
      try {
        await sendMail({
          email: user.email,
          subject: "Active your account",
          template: "activation-mail.ejs",
          data,
        });
        res.status(200).json({
          success: true,
          message: `Please check ${user.email} to active your email !`,
          activationToken: activationToken.token,
          activationCode,
        });
      } catch (error: any) {
        return next(new ErrorHandle(error.message, 404));
      }
    } catch (error) {
      return next(new ErrorHandle("Error!", 404));
    }
  }
);

//create activationToken
interface IActivationToken {
  token: string;
  activationCode: string;
}
export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.JWT_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );
  return { token, activationCode };
};

//activatie user
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}
export const activationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_code, activation_token } =
        req.body as IActivationRequest;
      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.JWT_SECRET as string
      ) as { user: IUser; activationCode: string };
      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandle("Invalid code", 404));
      }
      const { name, email, password } = newUser.user;
      const exists = await userModel.findOne({ email });
      if (exists) {
        return next(new ErrorHandle("User already exists !", 404));
      }
      const user = await userModel.create({
        name,
        email,
        password,
        avatar: {
          public_id:
            "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg",
          url: "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg",
        },
      });
      res.status(200).json({
        success: true,
        message: "New user created !!!",
        activation_token,
      });
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
  }
);

///login user
interface ILoginRequest {
  email: string;
  password: string;
}
export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;
      if (!email || !password) {
        return next(new ErrorHandle("Please enter your email & password", 404));
      }
      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return next(
          new ErrorHandle("No accounts found with this email !", 401)
        );
      }
      const isPasswordCompare = await user.comparePassword(password);
      if (!isPasswordCompare) {
        return next(new ErrorHandle("Invalid password !", 402));
      }
      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
  }
);

//logout user
export const LogoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });
      const userId = (req as any).user._id || "";
      redis.del(userId);
      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
  }
);

//update access tokne
export const updateAccessToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token || "";
      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;
      const message = "Couldn't refresh token !";
      if (!decoded) {
        return next(new ErrorHandle(message, 404));
      }
      const session = await redis.get(decoded.id);
      if (!session) {
        return next(
          new ErrorHandle("Please login to access this resource !", 404)
        );
      }
      const user = JSON.parse(session);

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        { expiresIn: "5m" }
      );
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        { expiresIn: "3d" }
      );

      (req as any).user = user;
      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);

      await redis.set(user._id, JSON.stringify(user), "EX", 604800);

      next();
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
  }
);

//get user info
export const getUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?._id;
      getUserById(userId, res);
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
  }
);

interface ISocialAuth {
  emai: string;
  name: string;
  avatar: string;
}
//auth social
export const socialAuth = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        const newUser = await userModel.create({
          email,
          name,
          avatar: { public_id: avatar, url: avatar },
        });
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
  }
);

///update user info
interface IUpdateUserInfo {
  name: string;
  email: string;
  birthDay?: Date;
}
export const updateUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, birthDay } = req.body as IUpdateUserInfo;
      const userId = (req as any).user?._id;
      const user = await userModel.findById(userId);

      if (name && user) {
        user.name = name;
      }
      if (birthDay && user) {
        user.birthDay = birthDay;
      }
      await user?.save();

      await redis.set(userId, JSON.stringify(user));
      res.status(200).json({
        success: true,
        message: "Update user information successfull !",
      });
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
  }
);

//update password
interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export const updatePassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdatePassword;
      const user = await userModel
        .findById((req as any).user?._id)
        .select("+password");
      if (user?.password === undefined) {
        return next(new ErrorHandle("Invalid user", 404));
      }

      const isCompare = await user?.comparePassword(oldPassword);

      if (!isCompare) {
        return next(new ErrorHandle("Old password doesn't match !", 401));
      }
      user.password = newPassword;

      await redis.set((req as any).user?._id, JSON.stringify(user));

      await user?.save();

      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
  }
);

interface IUpdateAvatar {
  public_id: string;
  url: string;
}

// update profile picture
export const updateAvatar = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body;
      const userId = (req as any).user?._id;
      const user = await userModel.findById(userId);
      if (avatar && user) {
        if (user?.avatar?.public_id) {
          await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
        }

        const myUpload = await cloudinary.v2.uploader.upload(avatar.avatar, {
          folder: "avatars",
          width: 150,
        });

        user.avatar = {
          public_id: myUpload.public_id,
          url: myUpload.secure_url,
        };

        await user?.save();
      } else {
        throw new Error("Missing required parameter - avatar or user");
      }
      await redis.set(userId, JSON.stringify(user));
      res.status(200).json({
        success: true,
        message: "Update user avatar successful!",
      });
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
  }
);

//get all user -- only admin
export const getAllUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUserService(res);
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
  }
);

//update user role -- only admin
export const updateuserRole = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, role } = req.body;
      updateUserRoleService(res, id, role);
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
  }
);

//delete user ---only admin
export const deleteOneUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);
      if (!user) {
        return next(new ErrorHandle("User not exists", 404));
      }
      await user.deleteOne({ id });

      await redis.del(id);

      const alluser = await userModel.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        message: "Delete user successfull !",
        alluser,
      });
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
  }
);

//update course status
export const updateStatusCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, courseId } = req.body;

      // Kiểm tra tất cả các thông số yêu cầu
      if (!userId || !courseId) {
        return next(new ErrorHandle("Missing required fields", 400));
      }

      // Tìm người dùng theo ID và cập nhật trạng thái của course
      const user = await userModel.findOneAndUpdate(
        { _id: userId, "courses.courseId": courseId },
        { $set: { "courses.$.status": "Complete" } },
        { new: true } // Trả về tài liệu đã cập nhật
      );

      if (!user) {
        return next(new ErrorHandle("User or course not found", 404));
      }
      await redis.set(userId, JSON.stringify(user));
      // Trả về người dùng đã được cập nhật
      res.status(200).json({
        success: true,
        message: "Course status updated successfully",
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 500));
    }
  }
);
