import express from "express"
import {register,activationUser, loginUser, LogoutUser, updateAccessToken, getUserInfo, socialAuth, updateUserInfo, updatePassword, updateAvatar, getAllUser, updateuserRole, deleteOneUser} from "../controllers/useController"
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", register)
userRouter.post("/active-user", activationUser);
userRouter.post("/login", loginUser);
userRouter.get("/sign-out", isAuthenticated, LogoutUser);
userRouter.get("/refreshtoken", updateAccessToken);
userRouter.get("/get-user", isAuthenticated, getUserInfo);
userRouter.get("/social-auth", socialAuth);
userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);
userRouter.put("/update-user-pass", isAuthenticated, updatePassword);
userRouter.put("/update-user-avatar", isAuthenticated, updateAvatar);
userRouter.get(
  "/get-all-user",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUser
);
userRouter.put(
  "/update-role",
  isAuthenticated,
  authorizeRoles("admin"),
  updateuserRole
);

userRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteOneUser
);
export default userRouter;