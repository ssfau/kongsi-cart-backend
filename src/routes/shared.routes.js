const router = require("express").Router();
const { demoAuth, roleGuard } = require("../middleware/auth");
const { catchAsync } = require("../utils");
const ctrl = require("../controllers/buyer.controller");

router.use(demoAuth);

// SHARED ROUTER LOGIC:

/// 5.2 LISTINGS

// get all listings
router.get("/listings", (req, res) => {

});

// get specific listing
router.get("/listings/:id", (req, res) => {
  const listingId = req.params.id;
});


/// 5.3 COLLECTION POINTS

// get all collection points
router.get("/collection-points", (req, res) => {

});

// get single collection point
router.get("/collection-points/:id", (req, res) => {
  const pointId = req.params.id;
});


/// 5.4 ORDERS

// get all orders (role-based logic inside controller later)
router.get("/orders", (req, res) => {

});

// get specific order
router.get("/orders/:id", (req, res) => {
  const orderId = req.params.id;
});


/// 5.7 PAYMENT

// get payment history
router.get("/payments", (req, res) => {

});

module.exports = router;