import express from "express";
import { addAnswer, addQuestion, addReviewData, addReviewReply, deleteCourse, getAllCourse, getAllCourseAdmin, getCourseByUser, getSignleCourse, updateCourse, uploadCourse } from "../controllers/courseController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const courseRoute = express.Router();


courseRoute.post(
  "/upload-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);

courseRoute.put(
  "/update-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateCourse
);
courseRoute.delete(
  "/delete-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCourse
);
courseRoute.get("/get-course/:id", getSignleCourse);
courseRoute.get("/get-all-course", getAllCourse);
courseRoute.get("/get-all-course", getAllCourse);
courseRoute.put(
  "/add-question",
  isAuthenticated,
  authorizeRoles("user"),
  addQuestion
);
courseRoute.put("/add-answer", isAuthenticated, addAnswer);
courseRoute.put("/add-review/:id", isAuthenticated, addReviewData);
courseRoute.put("/add-review-reply", isAuthenticated, addReviewReply);

courseRoute.get(
  "/all-course",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCourseAdmin
);




export default courseRoute;