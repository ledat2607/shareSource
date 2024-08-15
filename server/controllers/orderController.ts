import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandle from "../utils/ErrorHandle";
import OrderModel, { IOrder } from "../model/orderModel";
import userModel from "../model/userModel";
import CourseModel from "../model/courseModel";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../model/notificationModel";
import { allOrderService, newOrder } from "../services/orderService";
import { redis } from "../utils/redis";
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



// Create order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;

      const userId = (req as any).user._id;
      if (payment_info) {
        if ("id" in payment_info) {
          const paymentId = payment_info.id;
          const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
          if (paymentIntent.status !== "succeeded") {
            return next(new ErrorHandle("Payment not authorized", 404));
          }
        }
      }
      const user = await userModel.findById(userId);

      if (!user) {
        return next(new ErrorHandle("User not found", 404));
      }

      const courseExistsInUser = user.courses.some(
        (course: any) => course.courseId === courseId
      );
      if (courseExistsInUser) {
        return next(new ErrorHandle("You already purchased this course", 404));
      }

      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandle("Course not found", 404));
      }

      const data: any = {
        courseId: course._id,
        userId: user._id,
        payment_info,
      };

      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("vi-VN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mail/order-confirmmail.ejs"),
        { order: mailData }
      );

      if (user) {
        await sendMail({
          email: user.email,
          subject: "Order confirmation",
          template: "order-confirmmail.ejs",
          data: mailData,
        });
      }

      user.courses.push({
        courseId: course._id.toString(),
        status: "Progressing",
      });
      await redis.set((req as any).user?._id, JSON.stringify(user));
      await user?.save();

      await NotificationModel.create({
        user: user._id,
        title: "New Order",
        message: `You have a new order for ${course.name}`,
      });

      course.purchased = (course.purchased || 0) + 1;

      await course.save();

      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
  }
);

//get all courser ---admin
export const getAllOrderAdmin  = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    allOrderService(res);
  } catch (error:any) {
    return next(new ErrorHandle(error.message, 404));
  }
})


///send publish key stripe
export const sendStripePublisKey = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  res.status(200).json({
    stripePublishKey:process.env.STRIPE_PUBLISHABLE_KEY
  })
})

export const newPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "USD",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
  }
);
