const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  source: String,
  destination: String,
  date: String,
  price: Number
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
