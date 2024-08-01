import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandle from "../utils/ErrorHandle";
import cloudinary from "cloudinary";
import { createCourse, getAllCourseService } from "../services/courseService";
import CourseModel from "../model/courseModel";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import { title } from "process";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../model/notificationModel";
import axios from "axios";


//upload course
export const uploadCourse = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const { data } = req.body;
        const thumbnail = data.thumbnail;
        if(thumbnail){
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
              folder: "courses",
            });
            data.thumbnail = {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            };
        }
        createCourse(data, res, next);
    } catch (error:any) {
        return next(new ErrorHandle(error.message, 404));
    }
})


//update course
export const updateCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const { thumbnail } = data;

    console.log("Received Data:", data);

    if (thumbnail) {
      // Check if thumbnail is an object with public_id or a URL string
      if (typeof thumbnail === "string") {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      } else if (thumbnail.public_id) {
        await cloudinary.v2.uploader.destroy(thumbnail.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail.url, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }

    const courseId = req.params.id;

    const course = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        $set: data.data,
      },
      { new: true, runValidators: true }
    );

    if (!course) {
      return next(new ErrorHandle('Course not found', 404));
    }

    res.status(200).json({
      success: true,
      message: "Update successful!",
      course,
    });
  } catch (error: any) {
    console.error("Error during update:", error);
    return next(new ErrorHandle(error.message, 500));
  }
});

//delete course
export const deleteCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseId = req.params.id;

    const course = await CourseModel.findByIdAndDelete(courseId);

    if (!course) {
      return next(new ErrorHandle("Course not found", 404));
    }

    const isExists = await redis.get("allCourses");
    if (isExists) {
      const courses = JSON.parse(isExists);

      const updatedCourses = courses.filter((c: any) => c._id !== courseId);

      if (updatedCourses.length === 0) {
        await redis.del("allCourses");
      } else {
        await redis.set("allCourses", JSON.stringify(updatedCourses));
      }
    }

    res.status(200).json({
      success: true,
      message: "Delete successful!",
    });
  } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
  }
});


//get signle course ---
export const getSignleCourse = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const courseId = req.params.id;
    const isExists = await redis.get(courseId)
    if(isExists){
      const course = JSON.parse(isExists)
      res.status(200).json({
        success: true,
        course,
      });
    }
    else{
      const course = await CourseModel.findById(req.params.id).select(
        "-courseData.videoUrl -courseData.suggestion -courseData.question -courseData.link"
      );
      await redis.set(courseId, JSON.stringify(course));
      res.status(200).json({
        success: true,
        course,
      });
    }
   
  } catch (error:any) {
    return next(new ErrorHandle(error.message,404))
  }
})

//get all course
export const getAllCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isExists = await redis.get("allCourses");
      if (isExists) {
        const course = JSON.parse(isExists);
        return res.status(200).json({
          success: true,
          course,
        });
      } else {
        const courses = await CourseModel.find().select(
          "-courseData.videoUrl -courseData.suggestion -courseData.question -courseData.link"
        );

        // Kiểm tra xem có dữ liệu nào được tìm thấy không
        if (courses.length === 0) {
          // Nếu không có khóa học nào, trả về thông báo phù hợp
          return res.status(200).json({
            success: true,
            message: "No courses found",
            courses,
          });
        }

        // Lưu trữ dữ liệu vào Redis
        await redis.set("allCourses", JSON.stringify(courses));
        return res.status(200).json({
          success: true,
          courses,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
  }
);

//get course content
export const getCourseByUser = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const userCourseList = (req as any).user?.courses;
    const courseId = req.params.id;
    const courseExists = userCourseList?.find(
      (course: any) => course._id.toString() === courseId
    );
    if (!courseExists) {
      return next(new ErrorHandle("You are not eligible", 404));
    }
    const course = await CourseModel.findById(courseId);
    const content = course?.courseData;
    res.status(200).json({
      success: true,
      content,
    });
  } catch (error:any) {
    return next(new ErrorHandle(error.message, 400));
  }
})

//add question in course
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const { question, courseId, contentId }: IAddQuestionData = req.body;
    const course = await CourseModel.findById(courseId);
    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandle("Invalid content ID", 404));
    }
    const courseContent = course?.courseData?.find((item: any) =>
      item._id.equals(contentId)
    );
    if (!courseContent) {
      return next(new ErrorHandle("Invalid content", 404));
    }
    const newQuestion: any = {
      user: (req as any).user,
      question,
      questionReplies: [],
    };
    courseContent.question.push(newQuestion);

    await NotificationModel.create({
      user: (req as any).user?._id,
      title: "New Question",
      message: `You have a new question for ${course?.name}`,
    });

    await course?.save();

    res.status(200).json({
      success: true,
      courseContent,
    });
  } catch (error:any) {
    return next(new ErrorHandle(error.message, 404));
  }
})

//add answer 
interface IAddAnserData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

export const addAnswer = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const { answer, courseId, contentId, questionId }: IAddAnserData = req.body;
    const course = await CourseModel.findById(courseId);


    if(!mongoose.Types.ObjectId.isValid(contentId)){
      return next(new ErrorHandle("Invalid content ID", 404));
    }
    const courseContent = course?.courseData?.find((item: any) =>
      item._id.equals(contentId)
    );
    if(!courseContent){
      return next(new ErrorHandle("Invalid content", 404));
    }
    const question = courseContent?.question?.find(
      (item: any) => item._id.equals(questionId)
    );
    if(!question){
      return next(new ErrorHandle("Invalid question id",404))
    }
    const newAnswer:any = {
      user: (req as any).user,
      answer,
    };
    question.questionReplies.push(newAnswer);

    await course?.save();

    if (
      (req as any).user._id !== question?.user._id &&
      (req as any).user.role !== "admin"
    ) {
      await NotificationModel.create({
        user: (req as any).user._id,
        title: "New question reply received",
        message: `You have a new reply for ${courseContent.title}`,
      });
    } else {
      const data = {
        name: (req as any).user.name,
        title: courseContent.title,
      };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mail/question-reply.ejs"),
        data
      );
      try {
        await sendMail({
          email: (req as any).user.email,
          subject: "Question reply !",
          template: "question-reply.ejs",
          data,
        });
      } catch (error: any) {
        return next(new ErrorHandle(error.message, 404));
      }
    }
      res.status(200).json({
        success: true,
        courseContent,
      });
  } catch (error:any) {
    return next(new ErrorHandle(error.message,404))
  }
})

//add review data
interface IReviewData {
  review: string;
  courseId: string;
  rating: number;
  userId: string;
}

export const addReviewData = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  try {
  const userCourseList = (req as any).user?.courses;
  const courseId = req.params.id;
  const courseExists = userCourseList?.some(
    (course: any) => course._id.toString() === courseId.toString()
  );
  if(!courseExists){
    return next(
      new ErrorHandle("You are not eligible to access this course", 404)
    );
  }
  const course = await CourseModel.findById(courseId);

  const { review, rating } = req.body as IReviewData;

  const reviewData: any = {
    user: (req as any).user,
    comment: review,
    rating: rating,
  };
  course?.reviews.push(reviewData);
  let avg = 0;
  course?.reviews.forEach((rev:any)=>{
    avg += rev.rating;
  })
  if(course){
    course.rating = avg / course.reviews.length;
  }
  await course?.save();

  const notification = {
    title: "New review Receive",
    message: `${(req as any).user?.name} has given a review in ${course?.name}`,
  };


  //create notification
  res.status(200).json({
    success: true,
    course,
  });

  } catch (error:any) {
    return next(new ErrorHandle(error.message,404))
  }
})


//add replies in review
interface IReviewReplyData {
  comment: string;
  courseId: string;
  reviewId: string;
}
export const addReviewReply = CatchAsyncError(async(req:Request,res:Response, next:NextFunction)=>{
  try {
    const { comment, courseId, reviewId } = req.body as IReviewReplyData;
    const course = await CourseModel.findById(courseId)
    if(!course){
      return next(new ErrorHandle("Course not found", 404));
    }
    const review = course?.reviews.find(
      (rev: any) => rev._id.toString() === reviewId
    );
    if(!review){
      return next(new ErrorHandle("Review not found", 404));
    }
    const replyData: any = {
      user: (req as any).user,
      comment,
    };
    if(!review.comentReplies){
      review.comentReplies = [];
    }
    review.comentReplies.push(replyData);
    await course?.save();

    res.status(200).json({
      success: true,
      course,
    });


  } catch (error:any) {
    return next(new ErrorHandle(error.message,404))
  }
})



//get all course --- only admin
export const getAllCourseAdmin = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCourseService(res);
    } catch (error: any) {
      return next(new ErrorHandle(error.message, 404));
    }
  }
);



///generator video url
export const generateVideoUrl = CatchAsyncError(async(req:Request,res:Response, next:NextFunction)=>{
  try {
      const { videoId } = req.body;
      const response = await axios.post(
        `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
        { ttl: 300 },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
          },
        }
      );
      res.json(response.data);
  } catch (error:any) {
  return next(new ErrorHandle(error.message, 404));    
  }
})