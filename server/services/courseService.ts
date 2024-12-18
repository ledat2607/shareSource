import { Response } from "express";
import CourseModel from "../model/courseModel";
import { redis } from "../utils/redis";
import { CatchAsyncError } from "../middleware/catchAsyncError";

export const createCourse = CatchAsyncError(async(data:any,res:Response)=>{
    const course = await CourseModel.create(data)
    res.status(200).json({
      success: true,
      course,
    });
})

export const getAllCourseService = async(res:Response)=>{
  const allCourse = await CourseModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    allCourse,
  });
}