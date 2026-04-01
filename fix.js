import fs from 'fs';
const content = `import { Listing, User } from "../models.js";
import mongoose from "mongoose";

export const createListing = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { category, itemName, unit, estimatedQty, depositPerUnit, estimatedPriceMin, estimatedPriceMax, deadline } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ status: 'error', error: 'Unauthorized: Invalid user ID format. Please log in again.' });
    }

    const sellerUser = await User.findById(userId);
    if (!sellerUser) {
      return res.status(401).json({ status: 'error', error: 'Unauthorized: Seller account not found.' });
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
    const userId = req.user?.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ status: 'error', error: 'Unauthorized: Invalid user ID format.' });
    }

    const sellerUser = await User.findById(userId);
    if (!sellerUser) {
      return res.status(401).json({ status: 'error', error: 'Unauthorized: Seller account not found.' });
    }

    const listings = await Listing.find({ supplierId: userId, status: { $ne: 'cancelled' } })
      .populate('supplierId', 'name')
      .lean();

    const formattedListings = listings.map(l => {
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
};
`;
fs.writeFileSync('D:/Hackathon/Putrahack/kongsi-cart-backend/src/controllers/handler.controller.js', content, 'utf8');