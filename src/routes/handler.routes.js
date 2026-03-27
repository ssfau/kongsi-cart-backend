import { Router } from "express";
import { demoAuth, roleGuard } from "../middleware/auth.js";
import { catchAsync } from "../utils/index.js";
import * as ctrl from "../controllers/buyer.controller.js";

const router = Router();

router.use([demoAuth, roleGuard("handler")]);

// HANDLER ROUTER LOGIC:

/// 5.2 LISTINGS
router.route("/listings")
  //// post new listing
  .post("/", (req, res) => {

  });

router.route("/listings/:id")
  //// patch specific listing
  .patch("/", (req, res) => {
    const listingId = req.params.id;
  })

  //// delete specific listing
  .delete("/", (req, res) => {
    const listingId = req.params.id;
  });


/// 5.3 COLLECTION POINTS
router.route("/collection-points")
  //// create new collection point
  .post("/", (req, res) => {

  });


/// 5.5 SHIPMENT
router.route("/shipments")
  //// list all shipments
  .get("/", (req, res) => {

  })

  //// confirm shipment
  .post("/", (req, res) => {

  });

router.route("/shipments/:id")
  //// single shipment order
  .get("/", (req, res) => {
    const listingId = req.params.id;
  });

router.route("/shipments/:id/cancel-shipment")
  //// cancel shipment
  .patch("/", (req, res) => {
    const listingId = req.params.id;
  });


/// 5.6 DASHBOARD
router.route("/listings/:id/demand")
  //// demand for a listing id
  .get("/", (req, res) => {

  });

router.route("/listings/:id/demand/warning")
  //// warning when demand is too low
  .get("/", (req, res) => {
    const listingId = req.params.id;
  });

export default router;