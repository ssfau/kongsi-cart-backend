import { Listing, User, Order } from "../models.js";
import mongoose from "mongoose";

export const createListing = async (req, res) => {
    try {
    let userId = req.user?.id;
    const { category, itemName, unit, estimatedQty, depositPerUnit, estimatedPriceMin, estimatedPriceMax, deadline } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      // Auto-fallback for demo purposes
      console.log("Invalid ID provided, falling back to default handler.");
      const defaultHandler = await User.findOne({ role: 'handler' });
      if (defaultHandler) {
        userId = defaultHandler._id;
      } else {
        return res.status(401).json({ status: 'error', error: 'Unauthorized: Invalid user ID format. Please log in again.' });
      }
    }
      
    let sellerUser = await User.findById(userId);
    if (!sellerUser) {
      // Auto-fallback for demo purposes if account is missing
      console.log("Seller not found by ID, falling back to default handler.");
      const fallbackSeller = await User.findOne({ role: 'handler' });
      if (fallbackSeller) {
        sellerUser = fallbackSeller;
        userId = fallbackSeller._id;
      } else {
        return res.status(401).json({ status: 'error', error: 'Unauthorized: Seller account not found (Create): ' + userId });
      }
    }

    const generatedCompanyName = sellerUser.name;

    const listing = await Listing.create({
      supplierId: userId,
      category,
      itemName,
      companyName: generatedCompanyName,
      unit,
      estimatedQty: Number(estimatedQty),
      depositPerUnit: Number(depositPerUnit),
      estimatedPriceMin: Number(estimatedPriceMin),
      estimatedPriceMax: Number(estimatedPriceMax),
      deadline: new Date(deadline),
      state: req.body.state,
      district: req.body.district,
      status: 'active'
    });

    res.status(201).json({ status: 'success', data: listing });
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

export const getMyListings = async (req, res) => {
  try {
    let userId = req.user?.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid ID provided in getMyListings, falling back.");
      const defaultHandler = await User.findOne({ role: 'handler' });
      if (defaultHandler) {
        userId = defaultHandler._id;
      } else {
        return res.status(401).json({ status: 'error', error: 'Unauthorized: Invalid user ID format.' });
      }
    }

    let sellerUser = await User.findById(userId);
    if (!sellerUser) {
      console.log("Seller not found in getMyListings, falling back.");
      const fallbackSeller = await User.findOne({ role: 'handler' });
      if (fallbackSeller) {
        sellerUser = fallbackSeller;
        userId = fallbackSeller._id;
      } else {
        return res.status(401).json({ status: 'error', error: 'Unauthorized: Seller account not found (Get): ' + userId });
      }
    }

    const listings = await Listing.find({ supplierId: userId, status: { $ne: 'cancelled' } })
      .populate('supplierId', 'name')
      .lean();

    const pooledQuantities = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: '$listingId', totalQuantity: { $sum: '$quantity' } } }
    ]);
    
    const quantityMap = {};
    pooledQuantities.forEach(pq => {
      quantityMap[pq._id.toString()] = pq.totalQuantity;
    });

    const formattedListings = listings.map(l => {
      l.currentDemand = quantityMap[l._id.toString()] || 0;
      if (l.supplierId && l.supplierId.name) {
        l.companyName = l.supplierId.name;
      }
      return l;
    });

    res.status(200).json({ status: 'success', data: formattedListings });
  } catch (error) {
    console.error('Error getting listings:', error);
    res.status(500).json({ status: 'error', error: error.message });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const listingId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(listingId)) {
      return res.status(400).json({ error: "Invalid listing ID" });
    }

    const listing = await Listing.findByIdAndUpdate(
      listingId,
      { status: 'cancelled' },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    res.status(200).json({ status: 'success', message: 'Listing cancelled successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ status: 'error', error: error.message });
  }
}