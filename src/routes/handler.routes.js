import { Router } from "express";
import { demoAuth, roleGuard } from "../auth.middleware.js";
import { catchAsync } from "../utils.js";
import { createListing, getMyListings, deleteListing, getDemandAnalytics } from "../controllers/handler.controller.js";

const router = Router();

const isHandler = [demoAuth, roleGuard("handler")];

// HANDLER ROUTER LOGIC:

/// 5.2 LISTINGS
router.get("/my-listings", isHandler, catchAsync(getMyListings));
router.get("/demand-analytics", isHandler, catchAsync(getDemandAnalytics));

router.route("/listings")
  //// post new listing
  .post(isHandler, catchAsync(createListing));

router.route("/listings/:id")
  //// patch specific listing
  .patch(isHandler, (req, res) => {
    const listingId = req.params.id;
    res.status(501).json({ error: "Not Implemented" });
  })

  //// delete specific listing
  .delete(isHandler, catchAsync(deleteListing));


/// 5.3 COLLECTION POINTS
router.route("/collection-points")
  //// create new collection point
  .post(isHandler, (req, res) => {
    res.status(501).json({ error: "Not Implemented" });
  });


/// 5.5 SHIPMENT
router.route("/shipments")
  //// list all shipments
  .get(isHandler, (req, res) => {
    res.status(501).json({ error: "Not Implemented" });
  })

  //// confirm shipment
  .post(isHandler, (req, res) => {
    res.status(501).json({ error: "Not Implemented" });
  });

router.route("/shipments/:id")
  //// single shipment order
  .get(isHandler, (req, res) => {
    const listingId = req.params.id;
    res.status(501).json({ error: "Not Implemented" });
  });

router.route("/shipments/:id/cancel-shipment")
  //// cancel shipment
  .patch(isHandler, (req, res) => {
    const listingId = req.params.id;
    res.status(501).json({ error: "Not Implemented" });
  });


/// 5.6 DASHBOARD
router.route("/listings/:id/demand")
  //// demand for a listing id
  .get(isHandler, (req, res) => {
    res.status(501).json({ error: "Not Implemented" });
  });

router.route("/listings/:id/demand/warning")
  //// warning when demand is too low
  .get(isHandler, (req, res) => {
    const listingId = req.params.id;
    res.status(501).json({ error: "Not Implemented" });
  });

export default router;