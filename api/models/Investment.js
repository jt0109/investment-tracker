// models/Investment.js
const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  stock: { type: String, required: true },
});

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment;
