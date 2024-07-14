import express from "express"
import { createOrder, getAllOrderAdmin } from "../controllers/orderController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/useController";
const orderRoute = express.Router();

orderRoute.post(
  "/add-course",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("user"),
  createOrder
);
orderRoute.get(
  "/all-order",
  isAuthenticated,
  updateAccessToken,
  authorizeRoles("admin"),
  getAllOrderAdmin
);
export default orderRoute;