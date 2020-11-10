import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";

router.route("/").post(protect, addOrderItems);

router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").post(protect, updateOrderToPaid);

export default router;
