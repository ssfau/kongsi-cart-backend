import dotenv from 'dotenv'; dotenv.config();
import { Listing, Order, User } from './src/models.js';
import connectDB from './src/config/db.js';

(async () => {
    await connectDB();
    const fallbackSeller = await User.findOne({ role: 'handler' });
    const listings = await Listing.find({ supplierId: fallbackSeller._id, status: { $ne: 'cancelled' } }).lean();
    
    const demandPointsMap = {};
    const listingIds = listings.map(l => l._id);
    const orders = await Order.find({ listingId: { $in: listingIds }, status: { $ne: 'cancelled' } }).lean();
    
    for (const listing of listings) {
      const locationName = listing.collectionPoint || listing.district || listing.state || "Main Hub";
      const maxCapacity = Number(listing.estimatedQty) || 100;
      const currentPrice = Number(listing.estimatedPriceMax) || 5;
      const nextDropPrice = Number(listing.depositPerUnit) || 3;
      const nextDropVolume = (Number(listing.estimatedQty) || 100) * 0.8;
      
      if (!demandPointsMap[locationName]) {
        demandPointsMap[locationName] = {
          locationName,
          totalVolume: 0,
          maxCapacity: 0,
          buyerCount: 0,
          currentPrice,
          nextDropVolume: 0,
          nextDropPrice,
          trend: [0, 0, 0, 0, 0, 0, 0]
        };
      }
      demandPointsMap[locationName].maxCapacity += maxCapacity;
      demandPointsMap[locationName].nextDropVolume += nextDropVolume;
    }
    
    for (const order of orders) {
      const listing = listings.find(l => l._id.toString() === order.listingId.toString());
      if (listing) {
        const locationName = listing.collectionPoint || listing.district || listing.state || "Main Hub";
        if (demandPointsMap[locationName]) {
          demandPointsMap[locationName].totalVolume += order.quantity;
          demandPointsMap[locationName].buyerCount += 1;
        }
      }
    }
    
    let finalPoints = Object.values(demandPointsMap).map(point => {
        const step = point.totalVolume / 6;
        point.trend = [
          Math.floor(point.totalVolume - (step*6)),
          Math.floor(point.totalVolume - (step*5)),
          Math.floor(point.totalVolume - (step*4)),
          Math.floor(point.totalVolume - (step*3)),
          Math.floor(point.totalVolume - (step*2)),
          Math.floor(point.totalVolume - (step*1)),
          point.totalVolume
        ].map(v => Math.max(0, v));
        return point;
    });

    console.log(JSON.stringify(finalPoints, null, 2));
    process.exit(0);
})();