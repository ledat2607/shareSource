import express from "express"
import { createOrder, getAllOrderAdmin } from "../controllers/orderController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const orderRoute = express.Router();

orderRoute.post(
  "/add-course",
  isAuthenticated,
  authorizeRoles("user"),
  createOrder
);
orderRoute.get(
  "/all-order",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrderAdmin
);
export default orderRoute;