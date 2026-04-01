import { Listing, User } from "../models.js";
import mongoose from "mongoose";

export const createListing = async (req, res) => {
  let userId = req.user.id;
  const { category, itemName, companyName, unit, estimatedQty, depositPerUnit, estimatedPriceMin, estimatedPriceMax, deadline } = req.body;
  
  // Handle demo string ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    let dummyUser = await User.findOne({ role: 'handler' });
    if (!dummyUser) {
      dummyUser = await User.create({
        name: 'Demo Handler',
        email: 'demohandler@example.com',
        passwordHash: 'dummy123',
        role: 'handler'
      });
    }
    userId = dummyUser._id;
  }

  const listing = await Listing.create({
    supplierId: userId,
    category,
    itemName,
    companyName: companyName || 'Independent Seller',
    unit,
    estimatedQty: Number(estimatedQty),
    depositPerUnit: Number(depositPerUnit),
    estimatedPriceMin: Number(estimatedPriceMin),
    estimatedPriceMax: Number(estimatedPriceMax),
    deadline: new Date(deadline),
    status: 'active'
    // omitting optional imageUrl and collectionPoints for now to keep it minimal
  });

  res.status(201).json({ status: 'success', data: listing });
};

export const getMyListings = async (req, res) => {
  let userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    let dummyUser = await User.findOne({ role: 'handler' });
    if (!dummyUser) {
      dummyUser = await User.create({
        name: 'Demo Handler',
        email: 'demohandler@example.com',
        passwordHash: 'dummy123',
        role: 'handler'
      });
    }
    userId = dummyUser._id;
  }

  const listings = await Listing.find({ supplierId: userId, status: { $ne: 'cancelled' } }).lean();
  res.status(200).json({ status: 'success', data: listings });
};

export const deleteListing = async (req, res) => {
  const listingId = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(listingId)) {
    return res.status(400).json({ error: "Invalid listing ID" });
  }

  // Soft delete by updating status
  const listing = await Listing.findByIdAndUpdate(
    listingId, 
    { status: 'cancelled' },
    { new: true }
  );

  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }

  res.status(200).json({ status: 'success', message: 'Listing cancelled successfully' });
};
