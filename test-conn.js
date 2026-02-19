require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI ||
  (process.env.DB_PASSWORD ? `mongodb+srv://venkatesh2004v_db_user:${encodeURIComponent(process.env.DB_PASSWORD)}@venkieecluster.kzkoecf.mongodb.net/?appName=VenkieeCluster` : null);

if (!uri) {
  console.error('No MONGODB_URI or DB_PASSWORD found in environment. Create a .env with MONGODB_URI.');
  process.exit(1);
}

console.log('Using URI (password masked):', uri.replace(/:(.*)@/, ':*****@'));

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection test: OK');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error('Connection test failed:');
    console.error(err);
    process.exit(1);
  });
