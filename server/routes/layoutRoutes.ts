import express from "express"
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { CreateLayout, getLayoutByType, updateLayout } from "../controllers/layoutController";
const layoutRoute = express.Router();

//create layout
layoutRoute.post(
  "/create-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  CreateLayout
);

layoutRoute.put(
  "/update-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  updateLayout
);

layoutRoute.get(
  "/get-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  getLayoutByType
);
export default layoutRoute;