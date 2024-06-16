import { NextFunction, Response } from "express";
import userModel from "../model/userModel"
import { redis } from "../utils/redis";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandle from "../utils/ErrorHandle";

export const getUserById = async(id:string,res:Response)=>{
    const userJson = await redis.get(id);
    if(userJson){
      const user = JSON.parse(userJson);
      res.status(200).json({
        success: true,
        user,
      });
    }
}

//get all user
export const getAllUserService = async(res:Response)=>{
  const user = await userModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    user,
  });
}

//update user role
export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
  res.status(200).json({
    success: true,
    user,
  });
};