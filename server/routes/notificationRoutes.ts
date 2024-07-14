import express from "express"
import { deleteNotice, getNotification, updateNotice } from "../controllers/notificationController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/useController";
const notiRouter = express.Router()

//get notification
notiRouter.get("/get-notice",isAuthenticated, authorizeRoles("admin"), getNotification);
notiRouter.put(
  "/update-notice/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotice
);
notiRouter.delete(
  "/delete-notice/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  deleteNotice
);

export default notiRouter;