import { Router } from "express";
import { demoAuth, roleGuard } from "../auth.middleware.js";
import { catchAsync } from "../utils.js";
import { getMyOrders, createOrder } from "../controllers/buyer.controller.js";

const router = Router();

// BUYER ROUTER LOGIC:
const isCustomer = [demoAuth, roleGuard("customer")];

/// 5.4 ORDERS

// get my orders
router.get("/orders/my-orders", isCustomer, catchAsync(getMyOrders));

// place an order
router.post("/orders", isCustomer, catchAsync(createOrder));

// cancel order
router.patch("/orders/:id/cancel", isCustomer, (req, res) => {
  const orderId = req.params.id;
  res.status(501).json({ error: "Not Implemented" });
});

// trigger remaining balance payment
router.patch("/orders/:id/payment-remaining", isCustomer, (req, res) => {
  const orderId = req.params.id;
  res.status(501).json({ error: "Not Implemented" });
});


/// 5.7 PAYMENT (placeholders)

// deposit payment
router.post("/payments/deposit", isCustomer, (req, res) => {
  res.status(501).json({ error: "Not Implemented" });
});

// remaining payment
router.post("/payments/remaining", isCustomer, (req, res) => {
  res.status(501).json({ error: "Not Implemented" });
});

export default router;