import { Router } from "express";
import { demoAuth, roleGuard } from "../auth.middleware.js";
import { catchAsync } from "../utils/index.js";

const router = Router();

router.use([demoAuth, roleGuard("customer")]);

// BUYER ROUTER LOGIC:

/// 5.4 ORDERS

// place an order
router.post("/orders", (req, res) => {

});

// cancel order
router.patch("/orders/:id/cancel", (req, res) => {
  const orderId = req.params.id;
});

// trigger remaining balance payment
router.patch("/orders/:id/payment-remaining", (req, res) => {
  const orderId = req.params.id;
});


/// 5.7 PAYMENT (placeholders)

// deposit payment
router.post("/payments/deposit", (req, res) => {

});

// remaining payment
router.post("/payments/remaining", (req, res) => {

});

export default router;