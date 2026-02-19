const mongoose = require('mongoose');
require('dotenv').config();

// Standard approach: provide a full connection string in MONGODB_URI.
// Optional legacy support: if MONGODB_URI is not provided, DB_PASSWORD can be
// used to build a connection string for the configured user. Prefer setting
// MONGODB_URI in production and in your local `.env` file.

let connected = false;

function buildFallbackUri() {
  const password = process.env.DB_PASSWORD;
  if (!password) return null;
  return `mongodb+srv://venkatesh2004v_db_user:${encodeURIComponent(password)}@venkieecluster.kzkoecf.mongodb.net/?appName=VenkieeCluster`;
}

const uri = process.env.MONGODB_URI || buildFallbackUri();

async function connect() {
  if (connected) return mongoose;
  if (!uri) {
    const msg = 'Missing MongoDB configuration: set MONGODB_URI in your environment (preferred) or DB_PASSWORD as fallback.';
    console.error(msg);
    throw new Error(msg);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    connected = true;
    console.log('Connected to MongoDB');
    return mongoose;
  } catch (err) {
    // Enhance common auth error guidance
    if (err && err.message && /authentication failed|bad auth/i.test(err.message)) {
      console.error('MongoDB authentication failed. Check Atlas user, password, and IP whitelist.');
    }
    console.error('MongoDB connection error:', err.message || err);
    throw err;
  }
}

module.exports = { connect, mongoose };
