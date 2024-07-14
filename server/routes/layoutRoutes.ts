import express from "express"
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { CreateLayout, getLayoutByType, updateLayout } from "../controllers/layoutController";
import { updateAccessToken } from "../controllers/useController";
const layoutRoute = express.Router();

//create layout
layoutRoute.post(
  "/create-layout",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  CreateLayout
);

layoutRoute.put(
  "/update-layout",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateLayout
);

layoutRoute.get("/get-layout", getLayoutByType);
export default layoutRoute;