import { NextFunction, Response } from "express";
import OrderModel from "../model/orderModel";
import { CatchAsyncError } from "../middleware/catchAsyncError";

export const newOrder = CatchAsyncError(
  async (data: any, res: Response, next: NextFunction) => {
    const order = await OrderModel.create(data);
    res.status(200).json({
      success: true,
      order,
    });
  }
);

export const allOrderService = async (res: Response) => {
  const allOrder = await OrderModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    allOrder,
  });
};