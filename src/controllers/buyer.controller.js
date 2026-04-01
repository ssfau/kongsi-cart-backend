// d:\Hackathon\Putrahack\kongsi-cart-backend\src\controllers\buyer.controller.js
import { Order, Payment, Listing, CollectionPoint, User } from "../models.js";
import mongoose from "mongoose";

export const getMyOrders = async (req, res) => {
  console.log("MY_ORDERS: Start");
  let userId = req.user.id;

  // Handle demo string ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    let dummyUser = await User.findOne({ role: 'customer' });
    if (!dummyUser) {
      dummyUser = await User.create({
        name: 'Demo Buyer',
        email: 'demobuyer@example.com',
        passwordHash: 'dummy123',
        role: 'customer'
      });
    }
    userId = dummyUser._id;
  }

  // Find orders where buyerId = req.user.id
  const orders = await Order.find({ buyerId: userId })
    .populate('listingId', 'itemName imageUrl')
    .populate('collectionPointId', 'name address')
    .populate('buyerId', 'phone')
    .lean();

  // Fetch related payments and transform response
  const transformedOrders = await Promise.all(
    orders.map(async (order) => {
      // Fetch payments using orderId
      const payments = await Payment.find({ orderId: order._id }).lean();

      // Typically you'd find a specific payment or just get the latest method/status
      const paymentMethod = payments.length > 0 ? payments[0].method : "-";
      const paymentStatus = payments.length > 0 ? payments[0].status : "-";

      const totalPriceNum = order.quantity * (order.finalPricePerUnit || 0);
      const amountLeftNum = order.remainingAmount || 0;

      // Extract details assuming schema has state/district in address or just placeholder
      const state = "Selangor"; // placeholder if not in schema
      const district = "Serdang"; // placeholder if not in schema

      return {
        id: order._id.toString(),
        itemName: order.listingId?.itemName || "Unknown Item",
        image: order.listingId?.imageUrl || "📦",
        status: order.status || paymentStatus,
        quantity: order.quantity,
        totalPrice: totalPriceNum ? `RM ${totalPriceNum.toFixed(2)}` : "-",
        amountLeft: amountLeftNum ? `RM ${amountLeftNum.toFixed(2)}` : "-",
        state: state,
        district: district,
        collectionPoint: order.collectionPointId?.name || "Unknown Point",
        phoneNumber: order.buyerId?.phone || "-",
        paymentMethod: order.paymentMethod || paymentMethod,
      };
    })
  );

  res.status(200).json({
    status: 'success',
    data: transformedOrders,
  });
};

export const createOrder = async (req, res) => {
  let userId = req.user.id;
  const { listingId, itemName, image, quantity, totalPrice, depositAmount, collectionPoint } = req.body;

  // Handle demo string ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    let dummyUser = await User.findOne({ role: 'customer' });
    if (!dummyUser) {
      dummyUser = await User.create({
        name: 'Demo Buyer',
        email: 'demobuyer@example.com',
        passwordHash: 'dummy123',
        role: 'customer'
      });
    }
    userId = dummyUser._id;
  }

  let realListingId = listingId;
  let realCollectionPointId = null;

  // Handle dummy listingIds from frontend (e.g. "1")
  if (!mongoose.Types.ObjectId.isValid(listingId)) {
    let listing = await Listing.findOne({ itemName });
    if (!listing) {
      listing = await Listing.create({
        supplierId: userId, // fallback supplier
        category: "Other", // fallback category
        companyName: "Dummy Company", // fallback company
        itemName: itemName || "Dummy Item",
        imageUrl: image || "📦",
        unit: "kg",
        estimatedQty: 999,
        depositPerUnit: depositAmount || 5,
        estimatedPriceMin: 0,
        estimatedPriceMax: 100,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
        status: "active"
      });
    }
    realListingId = listing._id;
  } else {
    realListingId = new mongoose.Types.ObjectId(listingId);
  }

  // Handle String collection point name mapping to ObjectId
  let cp = await CollectionPoint.findOne({ name: collectionPoint || "Default Hub" });
  if (!cp) {
    cp = await CollectionPoint.create({
      name: collectionPoint || "Default Hub",
      address: "No Address Provided"
    });
  }
  realCollectionPointId = cp._id;

  const finalPricePerUnit = (Number(totalPrice) || 0) / Number(quantity);

  const newOrder = await Order.create({
    listingId: realListingId,
    buyerId: userId,
    collectionPointId: realCollectionPointId,
    quantity: Number(quantity),
    depositAmount: Number(depositAmount) * Number(quantity) || 0,
    finalPricePerUnit: finalPricePerUnit,
    remainingAmount: Number(totalPrice) - (Number(depositAmount) * Number(quantity) || 0),
    status: 'active',
  });

  // Create a payment record to match
  await Payment.create({
    orderId: newOrder._id,
    userId: userId,
    type: 'deposit',
    method: 'online_placeholder',
    amount: newOrder.depositAmount,
    status: 'success',
    processedAt: new Date()
  });

  res.status(201).json({
    status: 'success',
    data: newOrder
  });
};
