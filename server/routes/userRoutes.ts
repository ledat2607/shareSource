import express from "express"
import {register,activationUser, loginUser, LogoutUser, updateAccessToken} from "../controllers/useController"
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", register)
userRouter.post("/active-user", activationUser);
userRouter.post("/login", loginUser);
userRouter.get(
  "/sign-out",
  isAuthenticated,
  authorizeRoles("admin"),
  LogoutUser
);
userRouter.get("/refreshtoken", updateAccessToken);

export default userRouter;