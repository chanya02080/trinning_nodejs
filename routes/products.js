var express = require('express');
var router = express.Router();
var productSchema = require('../models/product.model')
var orderSchema = require('../models/order.model')
const tokenMiddleware = require("../middleware/token.middleware")

//รายการทั้งหมด
router.get('/', async function (req, res, next) {
  let products = await productSchema.find({})
  res.status(200).send({ message: 'สำเร็จ', data: products });
});

//รายการเดียว
router.get('/:id', async function (req, res, next) {
  let { id } = req.params;
  let product = await productSchema.findById(id);
  // res.send(product);
  res.status(200).send({ message: 'สำเร็จ', data: product });
});

//เพิ่มสินค้า
router.post('/', async function (req, res, next) {
  let { nameProduct, price, stock } = req.body
  let product = new productSchema({
    nameProduct,
    price,
    stock
  })
  await product.save()
  return res.status(200).send({ message: 'สำเร็จ', data: product });
});

//แก้ไขสินค้า
router.put('/:id', async function (req, res, next) {
  let { nameProduct, price, stock } = req.body
  let { id } = req.params

  let product = await productSchema.findByIdAndUpdate(id, { nameProduct, price, stock }, { new: true })

  return res.status(200).send({ message: 'สำเร็จ', data: product });
});

router.delete('/:id', async function (req, res, next) {

  let { id } = req.params
  let product = await productSchema.findByIdAndDelete(id)

  return res.status(200).send({ message: 'สำเร็จ', data: product });
});

router.get('/:id/orders', async function (req, res, next) {
  let productId = req.params.id
  let order = await orderSchema.find({ productId })
  res.send(order);
  res.status(200).send({ message: 'สำเร็จ', data: order });
});

router.post('/:id/orders', async function (req, res, next) {
  let productId = req.params.id;
  let { quantity } = req.body;

  let product = await productSchema.findById(productId);

  if (quantity > product.stock) {
    return res.status(400).send({ message: 'ไม่สามารถเพิ่ม Order', data: product });
  }

  let order = new orderSchema({
    productId: product.id,
    quantity
  })
  await order.save();

  product.stock -= quantity;
  await product.save();

  return res.status(200).send({ message: 'สำเร็จ', data: order });

});

module.exports = router;