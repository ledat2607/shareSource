import express from "express"
import {register,activationUser, loginUser, LogoutUser, updateAccessToken, getUserInfo, socialAuth, updateUserInfo, updatePassword, updateAvatar, getAllUser, updateuserRole, deleteOneUser, updateStatusCourse} from "../controllers/useController"
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", register)
userRouter.post("/active-user", activationUser);
userRouter.post("/login", loginUser);
userRouter.get("/sign-out", isAuthenticated, LogoutUser);
userRouter.get("/refreshtoken", updateAccessToken);
userRouter.get("/get-user", updateAccessToken, isAuthenticated, getUserInfo);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-user-info",updateAccessToken, isAuthenticated, updateUserInfo);
userRouter.put("/update-user-pass",updateAccessToken, isAuthenticated, updatePassword);
userRouter.put(
  "/update-user-avatar",
  updateAccessToken,
  isAuthenticated,
  updateAvatar
);
userRouter.get(
  "/get-all-user",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUser
);
userRouter.put(
  "/update-role",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateuserRole
);

userRouter.delete(
  "/delete-user/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  deleteOneUser
);
userRouter.put(
  "/update-course",
  updateAccessToken,
  updateStatusCourse,
  isAuthenticated
);
export default userRouter;