import express from "express"
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getCourseAnalytics, getOrderAnalytics, getUserAnalytics } from "../controllers/analyticsController";
const analytic = express.Router();

//user nanalytics
analytic.get(
  "/get-user-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getUserAnalytics
);

//get course analytics
analytic.get(
  "/get-course-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getCourseAnalytics
);

//get order analytics
analytic.get(
  "/get-order-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getOrderAnalytics
);

export default analytic;