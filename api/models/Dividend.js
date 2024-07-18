// models/Dividend.js
const mongoose = require('mongoose');

const DividendSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  stock: { type: String, required: true },
});

const Dividend = mongoose.model('Dividend', DividendSchema);

module.exports = Dividend;
