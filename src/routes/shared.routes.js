import { Router } from "express";
import { demoAuth, roleGuard } from "../auth.middleware.js";
import { catchAsync } from "../utils.js";
import { Listing, Order } from "../models.js";

const router = Router();

// SHARED ROUTER LOGIC:

/// 5.2 LISTINGS

// get all listings
router.get("/listings", catchAsync(async (req, res) => {
  const listings = await Listing.find({ status: 'active' }).populate('supplierId', 'name');
  
  // aggregate all orders to get pooled progress
  const pooledQuantities = await Order.aggregate([
    { $match: { status: { $ne: 'cancelled' } } },
    { $group: { _id: '$listingId', totalQuantity: { $sum: '$quantity' } } }
  ]);
  
  const quantityMap = {};
  pooledQuantities.forEach(pq => {
    quantityMap[pq._id.toString()] = pq.totalQuantity;
  });

  // Format the output to strictly enforce the seller's literal name from the populated user object
  const formattedListings = listings.map(l => {
    const listingObj = l.toObject();
    
    // Attach the dynamic current demand/pool progress
    listingObj.currentDemand = quantityMap[listingObj._id.toString()] || 0;
    
    // Overwrite the companyName directly with the user's name if the supplier is valid
    if (listingObj.supplierId && listingObj.supplierId.name) {
      listingObj.companyName = listingObj.supplierId.name;
    }
    return listingObj;
  });

  res.status(200).json({ status: 'success', data: formattedListings });
}));

// get specific listing
router.get("/listings/:id", catchAsync(async (req, res) => {
  const listingId = req.params.id;
  const listing = await Listing.findById(listingId).populate('supplierId', 'name');
  
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  
  const pooledQuantity = await Order.aggregate([
    { $match: { listingId: listing._id, status: { $ne: 'cancelled' } } },
    { $group: { _id: null, totalQuantity: { $sum: '$quantity' } } }
  ]);
  
  const listingObj = listing.toObject();
  listingObj.currentDemand = pooledQuantity.length > 0 ? pooledQuantity[0].totalQuantity : 0;
  if (listingObj.supplierId && listingObj.supplierId.name) {
    listingObj.companyName = listingObj.supplierId.name;
  }
  
  res.status(200).json({ status: 'success', data: listingObj });
}));


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