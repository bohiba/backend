/* To start run the project use [npm run dev] */

const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
const db = mongoose.createConnection(url, {
  serverSelectionTimeoutMS: 1000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).on('connected', () => 
  console.log('MongoDB connected'),
).on('open', ()=> 
  console.log("MongoDB opened"),
).on('disconnected', () =>
  console.log('disconnected'),
).on('reconnected', () => 
  console.log('reconnected'),
).on('disconnecting', () => 
  console.log('disconnecting'),
).on('error', ()=> 
  console.log("Server error")
);
module.exports = db;