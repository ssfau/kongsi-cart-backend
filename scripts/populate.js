/**
 * One-off dev/demo database populator.
 *
 * Runs ONLY when you execute: `npm run populate`
 * It does not run when the server starts.
 *
 * Requirements:
 * - MONGO_URI in .env (or environment)
 *
 * Notes:
 * - Uses a single handler account as the supplier for all seeded listings.
 * - Creates 0–5 random listings per district (Malaysia state/district map).
 * - Item name + category pairs come from `src/constants/listing-options.js` (empty by default).
 *   Fill LISTING_NAME_CATEGORY_PAIRS so each row keeps name + category in sync.
 */

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

function pickOne(arr, fallback) {
  if (Array.isArray(arr) && arr.length > 0) {
    return arr[randInt(0, arr.length - 1)];
  }
  return fallback;
}

/** Picks one { itemName, category } row; never mixes unrelated name/category. */
function pickNameCategoryPair(district) {
  const row = pickOne(LISTING_NAME_CATEGORY_PAIRS, null);
  if (row && row.itemName != null && row.category != null) {
    return { itemName: String(row.itemName), category: String(row.category) };
  }
  return { itemName: `Sample Item (${district})`, category: 'Other' };
}



async function ensureUser({ name, email, role, passwordHash }) {
  const existing = await User.findOne({ email });
  if (existing) return existing;
  return User.create({ name, email, passwordHash, role });
}

function buildRandomListing({ supplierId, companyName, state, district }) {
  const { itemName, category } = pickNameCategoryPair(district);
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

  // Generate 0–5 listings per district.
  // This is intentionally NOT idempotent — rerunning will add more listings.
  // If you want idempotency later, we can add a `seedTag` field or a cleanup mode.
  const toInsert = [];
  for (const [state, districts] of Object.entries(MALAYSIA_STATE_DISTRICTS)) {
    for (const district of districts) {
      const n = randInt(0, 5);
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

