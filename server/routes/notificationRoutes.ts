import express from "express"
import { deleteNotice, getNotification, updateNotice } from "../controllers/notificationController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const notiRouter = express.Router()

//get notification
notiRouter.get("/get-notice",isAuthenticated, authorizeRoles("admin"), getNotification);
notiRouter.put(
  "/update-notice/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotice
);
notiRouter.delete(
  "/delete-notice/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteNotice
);

export default notiRouter;