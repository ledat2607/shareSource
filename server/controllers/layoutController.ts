import { NextFunction,Request,Response } from "express";
import ErrorHandle from "../utils/ErrorHandle";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import layoutModel from "../model/layoutModel";
import cloudinary from "cloudinary";

//create layout
export const CreateLayout = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const { type } = req.body;
        const isExists = await layoutModel.findOne({ type });
        if(isExists){
            return next(new ErrorHandle(`${type} already exists`, 404));
        }
        if(type === "banner"){
            const { image, title, subTitle } = req.body;
            const myCloud = await cloudinary.v2.uploader.upload(image, {
              folder: "banner",
            });
            const banner = {
              type:"Banner",
              image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
              },
              title,
              subTitle,
            };
            await layoutModel.create(banner);
        }
        if(type === "FAQ"){
            const { faq } = req.body;
            const faqItem = await Promise.all(
                faq.map(async(item:any)=>{
                    return {
                      question: item.question,
                      answer: item.answer,
                    };
                })
            )
            await layoutModel.create({ type: "FAQ", faq: faqItem });
        }
        if(type === "Category"){
            const { category } = req.body;

            const catItem = await Promise.all(
              category.map(async (item: any) => {
                return {
                  title: item.title,
                };
              })
            );
            await layoutModel.create({ type: "Category", category: catItem });
        }

        res.status(200).json({
          success: true,
          message: "Layout create successfull !",
        });
    } catch (error:any) {
        return next(new ErrorHandle(error.message,404))
    }
})


///update layout
export const updateLayout = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const { type } = req.body;

    if (type === "banner") {
      const bannerData:any = await layoutModel.findOne({ type: "Banner" });
      const { image, title, subTitle } = req.body;
      
      if(bannerData){
        await cloudinary.v2.uploader.destroy(bannerData.image.public_id);
      }

      const myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: "banner",
      });
      const banner = {
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        title,
        subTitle,
      };
      await layoutModel.findByIdAndUpdate(bannerData.id, { banner });
    }
    if (type === "FAQ") {
      const { faq } = req.body;
      const FaqItem = await layoutModel.findOne({ type: "FAQ" });

      const faqItem = await Promise.all(
        faq.map(async (item: any) => {
          return {
            question: item.question,
            answer: item.answer,
          };
        })
      );
      await layoutModel.findByIdAndUpdate(FaqItem?._id, {
        type: "FAQ",
        faq: faqItem,
      });
    }
    if (type === "Category") {
      const { category } = req.body;
      const cattegoriesData = await layoutModel.findOne({ type: "Category" });

      const catItem = await Promise.all(
        category.map(async (item: any) => {
          return {
            title: item.title,
          };
        })
      );
      await layoutModel.findByIdAndUpdate(
        cattegoriesData?._id,
        {
          type: "Category",
          category: catItem,
        },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Layout updated successfull !",
    });
  } catch (error:any) {
    return next(new ErrorHandle(error.message, 404));
  }
})


//get layout by type --admin
export const getLayoutByType = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const { type } = req.body;
    const layoutData = await layoutModel.findOne({ type });
    if(!layoutData){
      return next(new ErrorHandle(`${type} type invalid`, 404));
    }
    res.status(200).json({
      success: true,
      layoutData,
    });
  } catch (error:any) {
    return next(new ErrorHandle(error.message, 404));
  }
})