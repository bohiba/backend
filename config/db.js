/* To start run the project use [npm run dev] */

const mongoose = require('mongoose');
const url = `${process.env.MONGO_URL}`;
const db = mongoose.createConnection(url, {
  serverSelectionTimeoutMS: 1000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).on('connected', () => 
  console.log("\n===========\n| MongoDB connected |\n===========\n"),
).on('open', ()=> 
  console.log("\n===========\n| MongoDB opened |\n===========\n"),
).on('disconnected', () =>
  console.log("\n===========\n| Disconnected |\n===========\n"),
).on('reconnected', () => 
  console.log("\n===========\n| Reconnected |\n===========\n"),
).on('disconnecting', () => 
  console.log("\n===========\n| Disconnecting |\n===========\n"),
).on('error', ()=> 
  console.log("\n===========\n| Server error |\n===========\n")
);
module.exports = db;