import { NextFunction, Request, Response } from "express";
import NotificationModel from "../model/notificationModel";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandle from "../utils/ErrorHandle";
import cron from "node-cron";


//get notification
export const getNotification = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const notification = await NotificationModel.find().sort({
          createdAt: -1,
        });
        res.status(200).json({
          success: true,
          notification,
        });
    } catch (error:any) {
        return next(new ErrorHandle(error.message,404))
    }
})

//update notification
export const updateNotice = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const notice = await NotificationModel.findById(req.params.id);
        if(!notice){
            return next(
              new ErrorHandle("Notification have been removed !!", 404)
            );
        }else{

            notice.status ? notice.status = "read" : notice?.status;
        }
        await notice?.save()
        const notification = await NotificationModel.find().sort({
          createdAt: -1,
        });
        res.status(200).json({
          sucess: true,
          notification,
        });
    } catch (error:any) {
        return next(new ErrorHandle(error.message, 404));
    }
})

//delete notice
export const deleteNotice = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const notice = await NotificationModel.findByIdAndDelete(req.params.id);
        if(!notice){
            return next(new ErrorHandle("Notice have been removed !!!",404))
        }
        const notification = await NotificationModel.find().sort({createdAt:-1})
        res.status(200).json({
          success: true,
          notification,
        });
    } catch (error:any) {
        return next(new ErrorHandle(error.message, 404));
    }
})

//delete notification --- only admin
cron.schedule("0 0 0 * * *", async () => {
  const thirdTyDayAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await NotificationModel.deleteMany({
    status: "read",
    createdAt: { $lt: thirdTyDayAgo },
    });
  console.log("Delete read notification !!!");
});

