import express from "express"
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getCourseAnalytics, getOrderAnalytics, getUserAnalytics } from "../controllers/analyticsController";
import { updateAccessToken } from "../controllers/useController";
const analytic = express.Router();

//user nanalytics
analytic.get(
  "/get-user-analytics",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getUserAnalytics
);

//get course analytics
analytic.get(
  "/get-course-analytics",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getCourseAnalytics
);

//get order analytics
analytic.get(
  "/get-order-analytics",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getOrderAnalytics
);

export default analytic;