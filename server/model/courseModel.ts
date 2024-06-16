import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { IUser } from "./userModel";

interface IComment extends Document {
  user: IUser;
  question: string;
  questionReplies: IComment[];
}

interface IReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
  comentReplies: IComment[];
}
interface ILink extends Document {
  title: string;
  url: string;
}

interface ICourseData extends Document {
  title: string;
  descriptions: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  link: ILink[];
  suggestion: string;
  question: IComment[];
}

interface ICourse extends Document {
  _id: Types.ObjectId; // Define the type of _id
  name: string;
  descriptions: string;
  price: number;
  estimatePrice?: number;
  thumbnail: object;
  tags?: string;
  level: string;
  demoUrl: string;
  benefit: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  courseData: ICourseData[];
  rating?: number;
  purchased?: number;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
  comentReplies: [Object],
});
const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});
const commentSchema = new Schema<IComment>({
  user: Object,
  question: String,
  questionReplies: [Object],
});
const courseDataSchema = new Schema<ICourseData>({
  videoUrl: String,
  title: String,
  descriptions: String,
  videoSection: String,
  videoLength: Number,
  videoPlayer: String,
  link: [linkSchema],
  suggestion: String,
  question: [commentSchema],
});

const courseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  estimatePrice: {
    type: Number,
  },
  thumbnail: {
    public_url: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  tags: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  demoUrl: {
    type: String,
    required: true,
  },
  benefit: [{ title: String }],
  prerequisites: [{ title: String }],
  reviews: [reviewSchema],
  courseData: [courseDataSchema],
  rating: {
    type: Number,
    default: 0,
  },
  purchased: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);

export default CourseModel;
