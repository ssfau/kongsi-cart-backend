import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']); // Fix for ISP DNS blocking MongoDB SRV lookups

import 'dotenv/config';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import connectDB from '../src/config/db.js';
import { User, Listing } from '../src/models.js';
import {
  LISTING_NAME_CATEGORY_PAIRS,
  MALAYSIA_STATE_DISTRICTS,
} from '../src/constants/listing-options.js';

const POPULATE_PASSWORD = process.env.POPULATE_PASSWORD;

const POPULATOR_HANDLER = {
  name: 'Pak Abu Fresh Farm',
  email: 'handler@gmail.com',
  role: 'handler',
};

function randInt(minInclusive, maxInclusive) {
  return Math.floor(Math.random() * (maxInclusive - minInclusive + 1)) + minInclusive;
}

/**
 * Robust pickOne:
 * - Skips undefined / null / empty slots
 * - Always returns a valid row if array has valid elements
 */
function pickOne(arr, fallback = null) {
  if (!Array.isArray(arr) || arr.length === 0) return fallback;

  const validRows = arr.filter((r) => r && r.itemName && (r.category || r.name));
  if (validRows.length === 0) return fallback;

  return validRows[randInt(0, validRows.length - 1)];
}

/**
 * Picks one row { itemName, category, group? }
 * - Guarantees itemName and category are present
 */
function pickNameCategoryPair(district) {
  const row = pickOne(LISTING_NAME_CATEGORY_PAIRS);

  if (!row) {
    console.warn(`⚠️ No valid row found for district "${district}". Using fallback.`);
    return { itemName: `Sample Item (${district})`, category: 'Other' };
  }

  const itemName = String(row.itemName).trim();
  const category = String(row.category ?? row.name).trim();

  if (!itemName || !category) {
    console.warn('⚠️ BAD ROW DETECTED:', row);
    return { itemName: `Sample Item (${district})`, category: 'Other' };
  }

  const base = { itemName, category };

  if (row.group && String(row.group).trim() !== '') {
    base.group = String(row.group).trim();
  }

  return base;
}

async function ensureUser({ name, email, role, passwordHash }) {
  const existing = await User.findOne({ email });
  if (existing) return existing;
  return User.create({ name, email, passwordHash, role });
}

function buildRandomListing({ supplierId, companyName, state, district }) {
  const { itemName, category, group } = pickNameCategoryPair(district);
  const unit = Math.random() < 0.7 ? 'kg' : 'unit';

  const estimatedQty = randInt(10, 200);
  const depositPerUnit = randInt(1, 10);
  const estimatedPriceMin = randInt(5, 20);
  const estimatedPriceMax = estimatedPriceMin + randInt(2, 30);
  const deadline = new Date(Date.now() + randInt(3, 21) * 24 * 60 * 60 * 1000);

  return {
    supplierId,
    category,
    itemName,
    ...(group ? { group } : {}),
    companyName,
    unit,
    estimatedQty,
    depositPerUnit,
    estimatedPriceMin,
    estimatedPriceMax,
    deadline,
    status: 'active',
    state,
    district,
  };
}

async function main() {
  if (!process.env.MONGO_URI) {
    console.error('Missing MONGO_URI. Set it in .env or the environment.');
    process.exit(1);
  }

  await connectDB();

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(POPULATE_PASSWORD, salt);
  const handler = await ensureUser({ ...POPULATOR_HANDLER, passwordHash });

  const companyName = handler.name;

  const toInsert = [];
  for (const [state, districts] of Object.entries(MALAYSIA_STATE_DISTRICTS)) {
    for (const district of districts) {
      const n = randInt(0, 2); // 0–2 listings per district
      for (let i = 0; i < n; i += 1) {
        toInsert.push(
          buildRandomListing({
            supplierId: handler._id,
            companyName,
            state,
            district,
          }),
        );
      }
    }
  }

  if (toInsert.length === 0) {
    console.log('Nothing to insert (randomly generated 0 for all districts). Run again.');
  } else {
    const created = await Listing.insertMany(toInsert);
    console.log(`Inserted ${created.length} listings under handler ${handler.email}.`);
  }

  console.log('Handler login (for demo):', handler.email, '/', POPULATE_PASSWORD);
  console.log('Name+category pairs configured:', LISTING_NAME_CATEGORY_PAIRS.length);

  await mongoose.connection.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});