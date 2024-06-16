import { NextFunction,Request,Response } from "express";
import ErrorHandle from "../utils/ErrorHandle";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { generaLast12MonthData } from "../utils/analytics.generator";
import userModel from "../model/userModel";
import CourseModel from "../model/courseModel";
import OrderModel from "../model/orderModel";


//get user analytics -- only admin
export const getUserAnalytics = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const user = await generaLast12MonthData(userModel)
        res.status(200).json({
          success: true,
          user,
        });        
    } catch (error:any) {
        return next(new ErrorHandle(error.message, 404));
    }
})



//get course analytics
export const getCourseAnalytics = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
      const course = await generaLast12MonthData(CourseModel);
      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
})


//get order analytics
export const getOrderAnalytics = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
      const order = await generaLast12MonthData(OrderModel);
      res.status(200).json({
        success: true,
        order,
      });
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
})