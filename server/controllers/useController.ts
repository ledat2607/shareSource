import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../model/userModel";
import ErrorHandle from "../utils/ErrorHandle";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs"
import path from "path";
import sendMail from "../utils/sendMail";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";
import { redis } from "../utils/redis";
require("dotenv").config();
//register new user
interface IRegistionBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}
export const register = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
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
        });
      } catch (error: any) {
        return next(new ErrorHandle(error.message, 404));
      }
    } catch (error) {
        return next(new ErrorHandle("Error!", 404));
    }
})

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
export const activationUser= CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
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
      const exists = await userModel.findOne({email})
      if(exists){
        return next(new ErrorHandle("User already exists !", 404));
      }
      const user = await userModel.create({
        name,
        email,
        password,
      });
      res.status(200).json({
        success: true,
        message: "New user created !!!",
        activation_token,
      });
  } catch (error: any) {
    return next(new ErrorHandle(error.message, 404));
  }
})

///login user
interface ILoginRequest {
  email:string,
  password:string,
}
export const loginUser = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const { email, password } = req.body as ILoginRequest;
    if(!email || !password){
      return next(new ErrorHandle("Please enter your email & password", 404));
    }
    const user = await userModel.findOne({ email }).select("+password");
    if(!user){
      return next(new ErrorHandle("No accounts found with this email !", 401));
    }
    const isPasswordCompare = await user.comparePassword(password);
    if(!isPasswordCompare){
      return next(new ErrorHandle("Invalid password !", 402));
    }
    sendToken(user, 200, res);
  } catch (error:any) {
    return next(new ErrorHandle(error.message,404))
  }
})

//logout user
export const LogoutUser = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  try {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });
    const userId = (req as any).user._id || "";
    redis.del(userId);
    res.status(200).json({
      success: true,
      message: "Logout successfull !",
    });
  } catch (error:any) {
    return next(new ErrorHandle(error.message, 404));
  }
})

//update access tokne
export const updateAccessToken = CatchAsyncError(async(req:Request, res:Response,next:NextFunction)=>{
  try {
    const refresh_token = req.cookies.refresh_token || "";
    const decoded = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN as string
    ) as JwtPayload;
    const message = "Couldn't refresh token !"
    if(!decoded){
      return next(new ErrorHandle(message, 404));
    }
    const session = await redis.get(decoded.id);
    if(!session){
      return next(new ErrorHandle(message, 404));
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
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(200).json({
      success: true,
    });
  } catch (error: any) {
    return next(new ErrorHandle(error.message, 404));
  }
})