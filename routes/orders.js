const express = require('express');
const router = express.Router();
const orderSchema = require('../models/order.model');

router.get('/', async function (req, res, next) {
  let orders = await orderSchema.find({})
  res.status(200).send({ message: 'สำเร็จ', data: orders });
  // res.send(orders);
});

module.exports = router;
