import mongoose from 'mongoose';
const { Schema } = mongoose;

// 3.1 users
const userSchema = new Schema({
  name:         { type: String, required: true, trim: true },
  email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role:         { type: String, enum: ['customer', 'handler'], required: true },
  phone:        { type: String },
}, { timestamps: true });

// 3.2 listings
const listingSchema = new Schema({
  supplierId:        { type: Schema.Types.ObjectId, ref: 'User', required: true },
  itemName:          { type: String, required: true, trim: true },
  category:          { type: String, required: true }, // finer label (e.g. product type)
  group:             { type: String, trim: true }, // broader bucket (e.g. "leafy greens") — optional for legacy rows
  companyName:       { type: String, required: true, default: 'Independent Seller' }, // NEW: Displayed to consumers
  description:       { type: String },
  unit:              { type: String, enum: ['kg', 'unit'], required: true },
  estimatedQty:      { type: Number, required: true },
  depositPerUnit:    { type: Number, required: true },
  estimatedPriceMin: { type: Number, required: true },
  estimatedPriceMax: { type: Number, required: true },
  deadline:          { type: Date, required: true },
  status:            { type: String, enum: ['active', 'closed', 'shipped', 'settled', 'cancelled'], default: 'active' },
  collectionPoints:  [{ type: Schema.Types.ObjectId, ref: 'CollectionPoint' }],  state:             { type: String }, // NEW: Added state
  district:          { type: String }, // NEW: Added district  imageUrl:          { type: String },
}, { timestamps: true });

// 3.3 collection points
const collectionPointSchema = new Schema({
  name:           { type: String, required: true, trim: true },
  address:        { type: String, required: true },
  handlerContact: { type: String },
  operatingHours: { type: String },
}, { timestamps: true });

// 3.4 orders
const orderSchema = new Schema({
  listingId:         { type: Schema.Types.ObjectId, ref: 'Listing', required: true },
  buyerId:           { type: Schema.Types.ObjectId, ref: 'User', required: true },
  collectionPointId: { type: Schema.Types.ObjectId, ref: 'CollectionPoint', required: true },
  quantity:          { type: Number, required: true },
  depositAmount:     { type: Number, required: true },
  depositStatus:     { type: String, enum: ['pending', 'paid'], default: 'pending' },
  finalPricePerUnit: { type: Number, default: null },
  remainingAmount:   { type: Number, default: null },
  remainingStatus:   { type: String, enum: ['pending', 'paid_online', 'paid_cod', 'waived'], default: 'pending' },
  paymentMethod:     { type: String, enum: ['online', 'cod'], default: null },
  collectedAt:       { type: Date, default: null },
  status:            { type: String, enum: ['active', 'confirmed', 'ready_to_collect', 'collected', 'cancelled'], default: 'active' },
}, { timestamps: true });

// 3.5 shipments
const shipmentSchema = new Schema({
  listingId:         { type: Schema.Types.ObjectId, ref: 'Listing', required: true },
  collectionPointId: { type: Schema.Types.ObjectId, ref: 'CollectionPoint', required: true },
  supplierId:        { type: Schema.Types.ObjectId, ref: 'User', required: true },
  totalQtyShipped:   { type: Number, required: true },
  finalPricePerUnit: { type: Number, required: true },
  shippedAt:         { type: Date, required: true },
  estimatedArrival:  { type: Date },
  notes:             { type: String },
}, { timestamps: true });

// 3.6 payment
const paymentSchema = new Schema({
  orderId:     { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  userId:      { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type:        { type: String, enum: ['deposit', 'remaining'], required: true },
  method:      { type: String, enum: ['online_placeholder', 'cod'], required: true },
  amount:      { type: Number, required: true },
  status:      { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
  processedAt: { type: Date, required: true },
  referenceId: { type: String },
}, { timestamps: true });


export const User            = mongoose.model('User', userSchema);
export const CollectionPoint = mongoose.model('CollectionPoint', collectionPointSchema);
export const Listing         = mongoose.model('Listing', listingSchema);
export const Order           = mongoose.model('Order', orderSchema);
export const Shipment        = mongoose.model('Shipment', shipmentSchema);
export const Payment         = mongoose.model('Payment', paymentSchema);
