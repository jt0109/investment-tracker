// investments.js
const express = require('express');
const router = express.Router();

const Investment = require('../models/Investment');


// 定義取得所有 investments 的 API 端點
router.get('/', async (req, res) => {
  try {
    const investments = await Investment.find(); // 使用 Mongoose 的 find 方法取得所有投資紀錄
    res.status(200).json(investments);
  } catch (error) {
    console.error('Error fetching investments:', error);
    res.status(500).send('Internal Server Error');
  }
});


// 定義新增投資紀錄的 API 端點
router.post('/', async (req, res) => {
  try {
    const { date, amount, stock } = req.body;
    const newInvestment = new Investment({ date, amount, stock });
    await newInvestment.save();
    res.status(201).json(newInvestment);
  } catch (error) {
    console.error('Error creating investment:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
