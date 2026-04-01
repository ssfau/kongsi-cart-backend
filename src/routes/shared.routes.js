import { Router } from "express";
import { demoAuth, roleGuard } from "../auth.middleware.js";
import { catchAsync } from "../utils.js";
import { Listing } from "../models.js";

const router = Router();

// SHARED ROUTER LOGIC:

/// 5.2 LISTINGS

// get all listings
router.get("/listings", demoAuth, catchAsync(async (req, res) => {
  const listings = await Listing.find({ status: 'active' });
  res.status(200).json({ status: 'success', data: listings });
}));

// get specific listing
router.get("/listings/:id", demoAuth, (req, res) => {
  const listingId = req.params.id;
});


/// 5.3 COLLECTION POINTS

// get all collection points
router.get("/collection-points", demoAuth, (req, res) => {
  res.status(501).json({ error: "Not Implemented" });
});

// get single collection point
router.get("/collection-points/:id", demoAuth, (req, res) => {
  const pointId = req.params.id;
  res.status(501).json({ error: "Not Implemented" });
});


/// 5.4 ORDERS

// get all orders (role-based logic inside controller later)
router.get("/orders", demoAuth, (req, res) => {
  res.status(501).json({ error: "Not Implemented" });
});

// get specific order
router.get("/orders/:id", demoAuth, (req, res) => {
  const orderId = req.params.id;
  res.status(501).json({ error: "Not Implemented" });
});


/// 5.7 PAYMENT

// get payment history
router.get("/payments", demoAuth, (req, res) => {
  res.status(501).json({ error: "Not Implemented" });
});

export default router;