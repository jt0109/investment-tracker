// dividends.js
const express = require('express');
const router = express.Router();

const Dividend = require('../models/Dividend');


// 定義取得所有 dividends 的 API 端點
router.get('/', async (req, res) => {
  try {
    const dividends = await Dividend.find(); // 使用 Mongoose 的 find 方法取得所有投資紀錄
    res.status(200).json(dividends);
  } catch (error) {
    console.error('Error fetching dividends:', error);
    res.status(500).send('Internal Server Error');
  }
});


// 定義新增投資紀錄的 API 端點
router.post('/', async (req, res) => {
  try {
    const { date, amount, stock } = req.body;
    const newDividend = new Dividend({ date, amount, stock });
    await newDividend.save();
    res.status(201).json(newDividend);
  } catch (error) {
    console.error('Error creating dividend:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
