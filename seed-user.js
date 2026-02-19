require('dotenv').config();
const { connect, mongoose } = require('./db');
const makeUserModel = require('./auth/schema');

const username = process.env.SEED_USERNAME || 'test@example.com';
const password = process.env.SEED_PASSWORD || 'Password123!';

async function run() {
  try {
    await connect();
    const User = makeUserModel(mongoose);

    const existing = await User.findOne({ username }).exec();
    if (existing) {
      console.log('User already exists:', username);
      await mongoose.disconnect();
      process.exit(0);
    }

    const user = new User({ username, passwordHash: password });
    await user.save();
    console.log('Created user:', username);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    try { await mongoose.disconnect(); } catch (e) {}
    process.exit(1);
  }
}

run();
