const express = require('express');
const router = express.Router();
const userSchema = require('../models/user.model');


router.put('/user/:id/approve', async function (req, res, next) {
  let { id } = req.params
  let user = await userSchema.findByIdAndUpdate(id, { approved: true }, { new: true })
  
  res.send(user);
  res.status(200).send({ message: 'อนุมัติผู้ใช้สำเร็จ', user });
})

module.exports = router;